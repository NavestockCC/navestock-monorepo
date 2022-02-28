import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs';

/** Import Navestock Services */
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Firestore

/** Navestock Objects */
import {navestockTeam} from './navestock-teams.objects';

@Component({
  selector: 'ncc-app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input()menuStyle!: string;

  public menuTeams: Observable<navestockTeam[]> = new Observable;
  public showHorizontalMenu = false;
  public showPopupMenu = false;

 constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private afs: AngularFirestore) {
    iconRegistry.addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/round-menu-24px.svg'));
    }


  ngOnInit(): void {
    this.menuTeams = this.afs.collection<navestockTeam>('NavestockTeams', ref => (ref.where('visible_Menu', '==', true))).valueChanges();

    /*  Select the type of menu to display */
    switch (this.menuStyle) {
      case 'popup': {
        this.showPopupMenu = true;
        break;
      }
      case 'horizontal': {
        this.showHorizontalMenu = true;
        break;
      }
      case 'dynamic': {
        this.showPopupMenu = true;
        this.showHorizontalMenu = true;
        break;
      }
      default: {
        this.showPopupMenu = true;
        this.showHorizontalMenu = true;
        break;
      }
    }
  }

}
