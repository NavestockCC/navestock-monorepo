import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


/**** Navestock Imports *****/
import { HonoursBoardPerYear, HonoursBoard } from './honours-board.object';


@Injectable({
  providedIn: 'root'
})
export class HonoursBoardService {

  constructor(private afs: AngularFirestore) { }

  public getHonoursBoardData(): Observable<HonoursBoard[]> {
    const HBObject: HonoursBoard = new HonoursBoard();
    const hbData = this.afs.collection<any>('HonoursBoard', ref =>
      ref.orderBy('match_date', 'desc'))
      .valueChanges();

    return new Observable(subcriber => {
      hbData.subscribe(
        hbdResp => {
          subcriber.next(HBObject.setHonoursBoardArray(hbdResp));
          subcriber.complete();
        });
    }); // Observable end
  }

  public createHonoursBoard_perYear(honoursboardArray: Observable<HonoursBoard[]>): Observable<HonoursBoardPerYear[]> {
    const hBoardPYArray: HonoursBoardPerYear[] = [];

    return new Observable(subscriber => {
      let honoursBPYear: HonoursBoardPerYear = new HonoursBoardPerYear();

      honoursboardArray.forEach(
        hbArrayResp => {
          hbArrayResp.forEach(
            honoursBoardItem => {
              if (honoursBPYear.year === undefined || honoursBoardItem.match_date.toDate().getFullYear() !== honoursBPYear.year) {

                // Push honoursBPYear to hBoardPYArray;
                if (honoursBPYear.year !== undefined) {
                  hBoardPYArray.push(honoursBPYear);
                }

                // Create new honoursBPYear
                honoursBPYear = new HonoursBoardPerYear();
                honoursBPYear.year = honoursBoardItem.match_date.toDate().getFullYear();
              }
              honoursBPYear.honoursBoard.push(honoursBoardItem);
            } // End honoursBoardItem
          );
          // Push honoursBPYear to hBoardPYArray;
          if (honoursBPYear.year !== undefined) {
            hBoardPYArray.push(honoursBPYear);
          }
        } // End hbArrayResp
      ); // End honoursboardArray.forEach
      subscriber.next(hBoardPYArray);
      subscriber.complete();
    }); // Observable end
  }
}
