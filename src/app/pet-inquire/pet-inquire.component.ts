import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Animal, Photo } from '../animal.model';
import { FirebaseService } from '../firebase.service';
import { ShareDataService } from '../share-data.service';
import { User } from '../user.model';

@Component({
  selector: 'app-pet-inquire',
  templateUrl: './pet-inquire.component.html',
  styleUrls: ['./pet-inquire.component.css']
})
export class PetInquireComponent implements OnInit {

  @Input() pet: Animal;

  user: any;
  phone: any;
  message: string;
  isSubmitted = false;
  isVisitor = false;

  constructor(
    private firebaseService: FirebaseService,
    private shareDataServce: ShareDataService
) { }

  ngOnInit(): void {
    this.user = this.shareDataServce.getCurrentUser();
    console.log('ngOnInit');
    console.log(this.user);
    if (this.user === null) {
      this.user = new User();
      this.user.id = 'TP' + Date.now() + ( (Math.random() * 100000).toFixed());
      this.user.role = 'Visitor';
      this.isVisitor = true;
    } else {
      this.getUserWithKeyFromFirebase(this.user.email);
    }
  }

  onSubmit(form): void{
    console.log(this.user);
    console.log(this.message);
    if (this.user.message === undefined || this.user.message === null) {
      this.user.message = [];
    }
    this.user.message.push('Pet ID: ' + this.pet.id + '  Phone: ' + this.phone + '  Message: ' + this.message);
    console.log(this.user);
    if (this.isVisitor) {
      this.firebaseService.createUser(this.user);
    } else {
      this.firebaseService.updateUser(this.user.key, this.user);
    }
    this.isSubmitted = true;
    this.message = '';
  }

  getUserWithKeyFromFirebase(email): void{
    this.firebaseService.getAllUsers().snapshotChanges().pipe(
      map (changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
        data.forEach(element => {
          if (element.email === email){
            this.user = element;
          }
        });
      });
  }
}
