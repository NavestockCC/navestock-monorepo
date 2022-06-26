import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ListOfMatches_Week, PlayCricketMatchList } from '../match-services-interfaces/match.interface'
import { MarchListService } from '../match-services-interfaces/match-list.service';


@Component({
  selector: 'ncc-app-navestock-monorepo-match-list-week',
  templateUrl: './match-list-week.component.html',
  styleUrls: ['./match-list-week.component.scss']
})
export class MatchListWeekComponent implements OnInit , OnChanges {
  @Input() teamIdNavestock: number|undefined = undefined;
  @Input() teamIdOpposition: number|undefined = undefined;
  @Input() nWeeksToDisplay: number|undefined = undefined;
  @Input() season: string| undefined = undefined;

  public matchList_week: Observable<ListOfMatches_Week[]> = new Observable<ListOfMatches_Week[]>();
  private matchlistdata: Observable<PlayCricketMatchList|undefined> = new Observable<PlayCricketMatchList>();

  constructor(private mls: MarchListService) {
    if(this.season === undefined){
      const today =  new Date(Date.now());
      this.season = today.getFullYear().toString();
    }
    this.matchlistdata = this.mls.getPlayCricketMatchList(this.season);
  }

  ngOnInit() {
    this.matchList_week = this.mls.getMatchList_Week(
      this.teamIdNavestock,
      this.teamIdOpposition,
      this.nWeeksToDisplay,
      this.matchlistdata
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.matchList_week = this.mls.getMatchList_Week(
      changes['teamIdNavestock'].currentValue,
      undefined,
      undefined,
      this.matchlistdata
    );
  }

  public setmatchList_week() {
    this.matchList_week = this.mls.getMatchList_Week(
      this.teamIdNavestock,
      this.teamIdOpposition,
      this.nWeeksToDisplay,
      this.matchlistdata
    );
  }
}

