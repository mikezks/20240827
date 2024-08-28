import { NgFor, NgIf } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PassengerStore, Passenger } from '../../logic-passenger';


@Component({
  selector: 'app-passenger-search',
  standalone: true,
  imports: [
    NgFor, NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './passenger-search.component.html'
})
export class PassengerSearchComponent {
  private store = inject(PassengerStore);

  firstname = signal('');
  lastname = signal('Smith');
  passengers = this.store.passengerEntities;
  selectedPassenger?: Passenger;
  username = computed(
    () => this.firstname().toLowerCase() + '.' + this.lastname().toLowerCase()
  );

  constructor() {
    effect(() => console.log(this.username()));

    console.log(this.username())
    this.firstname.set('Peter');
    console.log(this.username())
    this.firstname.set('Mary');
    console.log(this.username())
    this.firstname.set('Anne');
    console.log(this.username())
    this.firstname.set('Andy');
    console.log(this.username())
    this.firstname.set('Sue');
    console.log(this.username());

    // Glitch free
    const counter = signal(0);
    const isEven = computed(
      () => counter() % 2 === 0 ? true : false
    );
    // counter.set(1)
    // counter: 1
    // isEven: true   -> not emitted by the computed signal
    // isEven: false

  }

  search(): void {
    if (!(this.firstname || this.lastname)) return;

    this.store.loadPassengers({
      firstName: this.firstname(),
      name: this.lastname()
    });
  }

  select(passenger: Passenger): void {
    this.selectedPassenger = this.selectedPassenger === passenger ? undefined : passenger;
  }
}
