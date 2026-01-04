import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { Place } from '../places.model';
import { PlacesContainer } from '../places-container/places-container';
import { Places } from '../places';

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
  
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<IData>(`${BASE_URL}/places`)
      .pipe(
        map((resData) => resData.places )
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        complete: () => {
          this.isFetching.set(false);
        }
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
