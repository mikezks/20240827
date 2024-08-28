import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withDebugTracing, withPreloading } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { APP_ROUTES } from './app.routes';
import { provideRouterFeature } from './shared/logic-router-state';
import { provideConfigState } from './shared/util-config';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      // withDebugTracing(),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(
      withFetch()
    ),
    provideStore(),
    provideEffects(),
    provideRouterFeature(),
    provideConfigState('./config.state.json'),
    provideClientHydration(
      withEventReplay()
    )
  ]
};
