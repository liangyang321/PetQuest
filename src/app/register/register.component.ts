import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ShareDataService } from '../share-data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(
    private firebaseService: FirebaseService,
    private shareDataService: ShareDataService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.user = new User();
    this.user.id = uuidv4();
  }

  onSubmit(form): void{
    this.shareDataService.saveCurrentUser(this.user);
    const val = JSON.parse(JSON.stringify(this.user));
    this.firebaseService.createUser(val).then(res => {
      console.log('created a user');
    });

    this.reloadComponent();
  }

  reloadComponent(): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home-page']).then(() => {
      window.location.reload();
    });
  }
}
