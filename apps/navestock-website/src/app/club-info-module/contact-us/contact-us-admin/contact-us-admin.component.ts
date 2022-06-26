import { Component} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import firebase from 'firebase/compat/app';

/**
 * Navestock Modules, Component & Services
 */
import {CommitteeMember} from '../contact-us-object/committee-member';
import {ContactUsService} from '../contact-us-service/contact-us-service.service';
import {UserAuthenticationService} from '../../../user-authentication-module/user-authentication-service/user-authentication.service';


@Component({
  selector: 'ncc-app-contact-us-admin',
  templateUrl: './contact-us-admin.component.html',
  styleUrls: ['./contact-us-admin.component.scss']
})
export class ContactUsAdminComponent {
 public committeeForm!: UntypedFormGroup;
  public userAuth: Observable<firebase.User>;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private fb: UntypedFormBuilder,
              private contactUsService: ContactUsService,
              private UAS: UserAuthenticationService) {
    this.createForm();
    this.contactUsService.getCommitteeMembers().subscribe(
      res => {
        this.createForm();
        res.forEach(element => {
        this.addMember(element);
      });
    }
    );
    iconRegistry.addSvgIcon(
      'save',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-save-24px.svg'));
      iconRegistry.addSvgIcon(
        'delete',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-delete-24px.svg'));

        /**
         * Initialise the user authentication service
         * This will be used to check if the user is authenticated before allowing admin functions
        */
        this.userAuth = this.UAS.getUserAuth();
  }


   createForm() {
    this.committeeForm = this.fb.group({
      'membersArray': this.fb.array([])
    });
   }

  get membersArray(): UntypedFormArray {
    return this.committeeForm.get('membersArray') as UntypedFormArray;
  }

  initMember(m: CommitteeMember): UntypedFormGroup {
      return this.fb.group({
        'Key': new UntypedFormControl(m.Key),
        'Title': new UntypedFormControl(m.Title, Validators.required),
        'Name': new UntypedFormControl(m.Name, Validators.required),
        'Tel': new UntypedFormControl(m.Tel),
        'email': new UntypedFormControl(m.email),
        'Publish': new UntypedFormControl(m.Publish, Validators.required),
        'SortPosition': new UntypedFormControl(m.SortPosition, Validators.required),
        'MemberType': new UntypedFormControl(m.MemberType, Validators.required)
      });
    }


  addMember(m?: CommitteeMember) {
    if (m) {
      this.membersArray.push(this.initMember(m));
    } else {
      const tm: CommitteeMember = new CommitteeMember();
      this.membersArray.push(this.initMember(tm));
    }
  }

  removeMember(indx: number) {
    this.contactUsService.deleteCommitteeMembers(this.membersArray.at(indx).value);
    this.membersArray.removeAt(indx);
  }

  saveMember(indx: number) {
    this.contactUsService.saveCommitteeMembers(this.membersArray.at(indx).value);
  }
}

