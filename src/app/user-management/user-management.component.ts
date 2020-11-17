import { UserService } from './../user.service';


import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  constructor(private service: UserService) { }

  private sub = new Subscription();
  ngOnInit(): void {
    this.sub = this.service.getList().subscribe(users => this.users = users);
  }

}
