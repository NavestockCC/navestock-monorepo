import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';


/** Navestock Object Imports */
import {CommitteeMember} from '../contact-us-object/committee-member';

/** Navestock Service Imports */
import {ContactUsService} from '../contact-us-service/contact-us-service.service';

@Component({
  selector: 'ncc-app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['../contact-us.scss']
})
export class  ContactUsComponent implements OnInit {
  committee!: Observable<CommitteeMember[]>;
  captains!: Observable<CommitteeMember[]>;

  constructor(private contactUsService: ContactUsService) { }

  ngOnInit(): void {
    this.committee = this.contactUsService.getCommitteeMembers();
    this.captains = this.contactUsService.getCaptains();
  }


}
