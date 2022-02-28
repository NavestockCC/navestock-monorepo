import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  public userAuth: Observable<any>;

  constructor(public afAuth: AngularFireAuth) {
    /** Set the user authentication status */
    this.userAuth = this.afAuth.user;
  }

  public login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public logout() {
    this.afAuth.signOut();
  }

  public getUserAuth(): Observable<firebase.User>{
    return this.userAuth;
  }
}