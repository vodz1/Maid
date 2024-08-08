import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { loadUser } from '../../Actions/user.actions';
import { selectSelectedUser } from '../../Selectors/user.selectors';
import { User } from '../../User/user.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule , MatCardModule , MatButtonModule ,NgxSpinnerModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private spinner: NgxSpinnerService
  ) {
    this.user$ = this.store.pipe(select(selectSelectedUser)) as Observable<User>;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.spinner.show();
      this.store.dispatch(loadUser({ id: +id }));
      this.user$.subscribe(() => this.spinner.hide());
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

