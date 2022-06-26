import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ListOfMatches_Month, PlayCricketMatchList } from '../match-services-interfaces/match.interface';
import { MarchListService } from '../match-services-interfaces/match-list.service';
import { MatchDateService } from "../match-services-interfaces/match-date.service";

@Component({
  selector: 'ncc-app-navestock-monorepo-match-list-month',
  templateUrl: './match-list-month.component.html',
  styleUrls: ['./match-list-month.component.scss']
})
export class MatchListMonthComponent implements OnInit, OnChanges {
  @Input() teamIdNavestock: number|undefined = undefined;
  @Input() teamIdOpposition: number|undefined = undefined;
  @Input() season: string| undefined = this.mds.getCurrentYear();

  public matchList_month: Observable<ListOfMatches_Month[]> = new Observable<ListOfMatches_Month[]>();
  private matchlistdata: Observable<PlayCricketMatchList|undefined> = new Observable<PlayCricketMatchList>();

  constructor(private mls: MarchListService, private mds: MatchDateService) {
    this.matchlistdata = this.mls.getPlayCricketMatchList(this.season);
  }

  ngOnInit() {
    this.setmatchList_month();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.matchList_month = this.mls.getMatchList_Month(
      changes['teamIdNavestock'].currentValue,
      undefined,
      this.matchlistdata
    );
  }

  public setmatchList_month() {
    this.matchList_month = this.mls.getMatchList_Month(
      this.teamIdNavestock,
      this.teamIdOpposition,
      this.matchlistdata
    );
  }
}
