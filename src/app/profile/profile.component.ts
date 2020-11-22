import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../share-data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  isNotSelectedFromAdmin = true;

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    if (this.shareDataService.selectedUser !== null) {
      this.isNotSelectedFromAdmin = false;
      this.user = this.shareDataService.selectedUser;
      this.shareDataService.selectedUser = null;
    } else {
      this.user = this.shareDataService.getCurrentUser();
    }
  }

  onUpdate(): void {
    this.shareDataService.isEditUser = true;
  }

}
