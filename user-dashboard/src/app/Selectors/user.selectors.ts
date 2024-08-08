import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../Reducers/user.reducer';

export const selectUserState = createFeatureSelector<State>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state: State) => state.users
);

export const selectFilteredUsers = createSelector(
    selectUserState,
    (state: State) => {
      console.log('Selecting filtered users:', state.filteredUsers);
      return state.filteredUsers;
    }
  );

export const selectSelectedUser = createSelector(
  selectUserState,
  (state: State) => state.selectedUser
);

export const selectUserError = createSelector(
  selectUserState,
  (state: State) => state.error
);
