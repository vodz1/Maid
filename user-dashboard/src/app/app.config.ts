import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { userReducer } from './Reducers/user.reducer'; // Adjust the path as necessary
import { UserEffects } from './Effects/user.effects'; // Adjust the path as necessary
import { MatInputModule } from '@angular/material/input'; // Add this line

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(), provideStore({ users: userReducer }), provideEffects([UserEffects]), MatInputModule , provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync()]
  
};
