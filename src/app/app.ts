import { Component, inject } from '@angular/core';

import { AvailablePlaces } from './places/available-places/available-places';
import { UserPlaces } from './places/user-places/user-places';
import { ErrorService } from './shared/error.service';
import { ErrorModal } from "./shared/modal/error-modal/error-modal";

@Component({
  selector: 'app-root',
  imports: [AvailablePlaces, UserPlaces, ErrorModal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private errorService = inject(ErrorService);

  error = this.errorService.error;
}
