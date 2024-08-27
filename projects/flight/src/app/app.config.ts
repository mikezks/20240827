import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { routerFeature } from "./shared/logic-router-state";
import { SharedModule } from "./shared/shared.module";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./app.routes";


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreModule.forFeature(routerFeature),
      SharedModule
    ),
    provideRouter(APP_ROUTES),
    provideHttpClient(
      withInterceptorsFromDi()
    )
  ]
};
