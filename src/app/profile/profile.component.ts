import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {FirebaseService} from '../firebase.service';
import {ShareDataService} from '../share-data.service';
import {User} from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  isNotSelectedFromAdmin = true;

  constructor(
    private shareDataService: ShareDataService,
    private firebaseService: FirebaseService,
  ) {
  }

  ngOnInit(): void {
    if (this.shareDataService.selectedUser !== null) {
      this.isNotSelectedFromAdmin = false;
      this.user = this.shareDataService.selectedUser;
      this.shareDataService.selectedUser = null;
    } else {
      // this.user = this.shareDataService.getCurrentUser();
      this.getCurrentUserFromFirebase(this.shareDataService.getCurrentUser().email);

    }
  }

  getCurrentUserFromFirebase(email): void {
    this.firebaseService.getAllUsers().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
      data.forEach(element => {
        if (element.email === email) {
          this.user = element;
        }
      });
    });
  }

  onUpdate(): void {
    this.shareDataService.isEditUser = true;
  }

}
