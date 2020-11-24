import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Injectable} from '@angular/core';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private auth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.user = auth.authState;
  }

  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(function(resule) {
        sessionStorage.setItem('loggedIn', '1');
      });
  }

  logout() {
    this.auth.signOut()
      .then(function(result) {
        sessionStorage.removeItem('loggedIn');
      });
  }

  isLoggedIn(): boolean {
    var loggedIn = sessionStorage.getItem('loggedIn');
    return (loggedIn != null);
  }
}
