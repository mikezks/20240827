import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app/app-routing.module";
import { routerFeature } from "./app/shared/logic-router-state";
import { SharedModule } from "./app/shared/shared.module";


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreModule.forFeature(routerFeature),
      SharedModule
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    )
  ]
};
