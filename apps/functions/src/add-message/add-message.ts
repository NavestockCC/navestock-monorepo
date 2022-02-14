import { Observable } from 'rxjs';

export class AddMessage {

    private timeOut(msg:string):Observable<string>{
        return new Observable(observer => {
            setTimeout(() => {
              observer.next(msg);
            }, 1000)
          })
    }


public getPlayCricketData(matchID:string){
  this.timeOut('1. getPlayCricketData: ' + matchID ).subscribe( res => {
    console.log(res);
  });
  this.getImportData({'pc': 'Wow'});
}

private getImportData(importData:any){
  this.timeOut('2. getImportData: ' + importData).subscribe( res => {
    console.log(JSON.stringify(res));
  });;
  this.getMatchDetails(importData);
}

private getMatchDetails(importDataObject:any){
  this.timeOut('3. getMatchDetails: ' + importDataObject).subscribe( res => {
    console.log(JSON.stringify(res));
  });;
}

    
}

