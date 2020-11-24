import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ShareDataService} from '../share-data.service';
import {User} from '../user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  clickEventsubscription: Subscription;

  user: User;
  showUser = false;
  showPet = false;
  showLogout = false;

  constructor(private shareDataService: ShareDataService) {
    this.clickEventsubscription = this.shareDataService.getClickEvent().subscribe(() => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.user = this.shareDataService.getCurrentUser();
    this.checkUser();
  }

  checkUser(): void {
    if (this.user != null) {
      if (this.user.role === 'admin') {
        this.showPet = true;
        this.showUser = true;

      }

      if (this.user.role === 'shelter') {
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
