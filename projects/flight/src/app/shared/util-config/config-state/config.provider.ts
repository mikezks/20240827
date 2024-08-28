import { APP_INITIALIZER, computed, EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, signal, Signal, WritableSignal } from "@angular/core";
import { ConfigState, initialConfigState } from "./config.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";


export const CONFIG_STATE_SIGNAL = new InjectionToken<WritableSignal<ConfigState>>('CONFIG_STATE_SIGNAL', {
  providedIn: 'root',
  factory: () => signal(initialConfigState)
});

export function provideConfigState(url: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (
        configStateSignal = inject(CONFIG_STATE_SIGNAL),
        http = inject(HttpClient)
      ) => () => http.get<ConfigState>(url).pipe(
        tap(configState => configStateSignal.set(configState))
      )
    }
  ]);
}

export function injectApiUrl(): Signal<string> {
  const configState = inject(CONFIG_STATE_SIGNAL);
  return computed(() => configState().apiUrl);
}
