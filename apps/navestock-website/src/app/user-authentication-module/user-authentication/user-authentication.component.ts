import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import firebase from 'firebase/compat/app';

/**
 * Navestock Imports
 */
import {UserAuthenticationService} from "../user-authentication-service/user-authentication.service";

@Component({
  selector: 'ncc-app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.scss']
})
export class UserAuthenticationComponent implements OnInit {
  public userAuth: Observable<firebase.User> | undefined;
  
  constructor(private UAS: UserAuthenticationService, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {

    /** Register person icon  */
    iconRegistry.addSvgIcon(
      'person',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-person-24px.svg'));

  }

  ngOnInit() {
    this.userAuth = this.UAS.getUserAuth();
  }

  public login() {
    this.UAS.login();
  }

  public logout() {
    this.UAS.logout()
  }
}
