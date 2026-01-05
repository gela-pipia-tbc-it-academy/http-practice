import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';

import { Place } from '../places.model';
import { PlacesContainer } from '../shared/places-container/places-container';
import { Places } from '../shared/places/places';

const BASE_URL = 'http://localhost:3000';

interface IData {
  places: Place[];
}

@Component({
  selector: 'app-available-places',
  imports: [PlacesContainer, Places],
  templateUrl: './available-places.html',
  styleUrl: './available-places.scss',
})
export class AvailablePlaces implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  isFetching = signal(false);
  error = signal<string>('');

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<IData>(`${BASE_URL}/places`)
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => {
            return new Error('Something went wrong fetching available places.');
          });
        })
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (err: Error) => {
          this.error.set(err.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(place: Place) {
    console.log(place);
  }
}
