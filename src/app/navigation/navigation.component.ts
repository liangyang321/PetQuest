import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../share-data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  user: User;
  showUser = false;
  showPet = false;
  showLogout = false;

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.user = this.shareDataService.getCurrentUser();
    this.checkUser();

    console.log('this is NavigationComponent');
    console.log(this.user);
  }

  checkUser(): void {
    console.log('this is checkUser');
    if (this.user != null){
      // this.signup = 'Log out';
      if (this.user.role === 'admin'){
        this.showPet = true;
        this.showUser = true;

      }

      if (this.user.role === 'shelter'){
        this.showPet = true;
      }

      this.showLogout = true;

    } else {
      this.showUser = false;
      this.showPet = false;
      this.showLogout = false;
    }
  }

  logout(): void {
    this.shareDataService.saveCurrentUser(null);
  }


}
