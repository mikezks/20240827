import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { initialFlight } from '../../logic-flight';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnChanges {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  @Input() flight = initialFlight;

  protected editForm = inject(FormBuilder).nonNullable.group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });

  name = new FormControl('Mary', { nonNullable: true});

  constructor() {
    this.store.select(routerFeature.selectRouteParams).subscribe(
      params => console.log(params)
    );

    this.editForm.getRawValue(); // Full type, not Partial only.
    this.editForm.patchValue({
      from: 'City name'
      // from: 123                  String is allowed, but no other type.
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'].previousValue !== changes['flight'].currentValue) {
      this.editForm.patchValue(this.flight);
    }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
