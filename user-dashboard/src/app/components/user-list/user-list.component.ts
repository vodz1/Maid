import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filterUsers, loadUsers } from '../../Actions/user.actions';
import { selectUsers } from '../../Selectors/user.selectors';
import { selectFilteredUsers } from '../../Selectors/user.selectors'; // Import the filtered users selector

import { User } from '../../User/user.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input'; // Add MatInputModule



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule , MatCardModule , MatButtonModule , NgxSpinnerModule , MatFormFieldModule , MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  totalUsers = 12; 

  constructor(private store: Store, private spinner: NgxSpinnerService, private router: Router) {
    this.users$ = this.store.pipe(select(selectFilteredUsers));
    this.users$.subscribe(users => console.log('Filtered users:', users));

  }

  ngOnInit(): void {
    this.spinner.show();
    this.store.dispatch(loadUsers({ page: 1 }));
    this.users$.subscribe(() => this.spinner.hide());
  }

  onPageChange(event: any): void {
    this.spinner.show();
    this.store.dispatch(loadUsers({ page: event.pageIndex + 1 }));
    this.users$.subscribe(() => this.spinner.hide());
  }

  onSelectUser(id: number): void {
    this.router.navigate(['/users', id]);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement; // Cast event target to HTMLInputElement
    const searchTerm = input.value;   // Get the input value
    console.log('Search term:', searchTerm);
    // Dispatch the filterUsers action with the search term
    this.store.dispatch(filterUsers({ searchTerm }));
  }
}


