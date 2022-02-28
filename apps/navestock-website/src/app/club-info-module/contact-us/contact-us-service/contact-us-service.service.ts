import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

/** Navestock Object Imports */
import { CommitteeMember } from '../contact-us-object/committee-member';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {



  constructor(private afs: AngularFirestore) { }


  getCommitteeMembers(): Observable<CommitteeMember[]> {
    const comitteMembers = this.afs.collection<CommitteeMember>('NavestockCommitee', ref => ref.where('Publish', '==', true).where('MemberType', '==', 'Committee').orderBy('SortPosition', 'asc'));
    return comitteMembers.valueChanges();
  }

  getCaptains(): Observable<CommitteeMember[]> {
    const captains = this.afs.collection<CommitteeMember>('NavestockCommitee', ref => ref.where('Publish', '==', true).where('MemberType', '==', 'Captains').orderBy('SortPosition', 'asc'));
    return captains.valueChanges();
  }

  saveCommitteeMembers(CM: CommitteeMember): void {
    if (CM.Key) {
      this.afs.doc<CommitteeMember>('NavestockCommitee/' + CM.Key).update(CM);
    } else {
      this.afs.collection('NavestockCommitee').add(CM).then(ref => {
        this.afs.doc<CommitteeMember>(ref.path).update({ 'Key': ref.id });
      });
    }
  }

  deleteCommitteeMembers(CM: CommitteeMember): void {
    if (CM.Key) {
      this.afs.doc<CommitteeMember>('NavestockCommitee/' + CM.Key).delete();
    }
  }


}


