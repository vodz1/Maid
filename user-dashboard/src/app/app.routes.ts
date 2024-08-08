import { Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
