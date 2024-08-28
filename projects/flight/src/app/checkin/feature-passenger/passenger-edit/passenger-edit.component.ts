
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Component, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util-validation';
import { initialPassenger } from '../../logic-passenger';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-passenger-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  passengerService = inject(PassengerService);

  id = input.required<number, string>({ transform: numberAttribute });
  passenger = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.passengerService.findById(id))
    ), { initialValue: initialPassenger }
  );

  constructor() {
    effect(() => console.log(this.id()));
    effect(() => this.editForm.patchValue(this.passenger()));
  }

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  protected save(): void {
    console.log(this.editForm.value);
  }
}
