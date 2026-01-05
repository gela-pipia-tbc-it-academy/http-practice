import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './places.model';

const BASE_URL = 'http://localhost:3000';

interface IResData {
  places: Place[];
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  httpClient = inject(HttpClient);

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient.put<Place[]>(`${BASE_URL}/user-places`, { placeId: place.id })
    .pipe(
        catchError((err) => {
            console.log(err);
            return throwError(() => new Error("Something went wrong adding place to user places. try again later."));
        }),
        tap({
            next: () => {
                if(!this.userPlaces().some(userPlace => userPlace.id === place.id)) {
                    this.userPlaces.update(prev => [...prev, place]);
                }
            }
        })
    )
  }

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'places',
      'Something went wrong fetching available places, Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'user-places',
      'Something went wrong fetching user places, Please try again later.'
    ).pipe(
      tap({
        next: (places) => {
          this.userPlaces.set(places);
        },
      })
    );
  }

  private fetchPlaces(endpoint: string, errorMessage: string) {
    return this.httpClient.get<IResData>(`${BASE_URL}/${endpoint}`).pipe(
      map((resData) => resData.places),
      catchError((err) => {
        console.log(err);
        return throwError(() => {
          return new Error(errorMessage);
        });
      })
    );
  }
}
