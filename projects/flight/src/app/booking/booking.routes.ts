import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from "./feature-flight";
import { TicketEffects } from "./logic-flight/+state/effects";
import { ticketFeature } from "./logic-flight/+state/reducer";
import { FlightResolver } from "./logic-flight/data-access/flight.resolver";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    component: FlightBookingComponent,
    providers: [
      provideState(ticketFeature),
      provideEffects([TicketEffects]),
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
            data: {
              flights: []
            }
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            resolve: {
              flights: FlightResolver
            }
          }
        ]
      }
    ]
  }
];

export default BOOKING_ROUTES;
