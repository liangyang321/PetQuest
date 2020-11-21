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

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.user = this.shareDataService.getCurrentUser();
  }

  onUpdate(): void {
    this.shareDataService.isEditUser = true;
  }

}
