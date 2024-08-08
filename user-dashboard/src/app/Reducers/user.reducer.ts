import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../Actions/user.actions';
import { User } from '../User/user.model';

export interface State {
  users: User[];
  selectedUser: User | null;
  error: string | null;
  filteredUsers: User[]; // State for filtered users

}

export const initialState: State = {
  users: [],
  selectedUser: null,
  error: null,
  filteredUsers: [], // State for filtered users

};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, filteredUsers: users, // Set filtered users to all users initially
  })),
  on(UserActions.filterUsers, (state, { searchTerm }) => {
    const filteredUsers = state.users.filter(user => user.id.toString().includes(searchTerm));
    console.log('Filtering users with term:', searchTerm, 'Filtered Users:', filteredUsers);
    return {
      ...state,
      filteredUsers
    };
  }),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({ ...state, selectedUser: user })),
  on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error }))
);
