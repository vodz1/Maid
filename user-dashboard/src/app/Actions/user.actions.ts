import { createAction, props } from '@ngrx/store';
import { User } from '../User/user.model';

export const loadUsers = createAction(
  '[User List] Load Users',
  props<{ page: number }>()
);

export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User List] Load Users Failure',
  props<{ error: any }>()
);

export const loadUser = createAction(
  '[User Details] Load User',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[User Details] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User Details] Load User Failure',
  props<{ error: any }>()
);

export const filterUsers = createAction(
  '[User] Filter Users',
  props<{ searchTerm: string }>() // Add a property for the search term
);
