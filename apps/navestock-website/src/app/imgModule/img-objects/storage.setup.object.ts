export class imgStorageObject{
    public fireStorageRef!: string; // File referance on Google Fire Storage
    public fireClourFireRef!: string; // File referance on Google FireStore Database
    public photoIdentifier!: string


    public setimgStorageObject(photoType:string, identifier:string){
        switch (photoType) {
            case 'fixture': {
              this.fireStorageRef = 'fixtureImg/' + identifier;
              this.fireClourFireRef = 'Fixtures/' + identifier + '/photo';
              this.photoIdentifier = 'identifier';
              break;
            }
            case 'Nav250GalaDinner': {
                this.fireStorageRef = 'Navestock250/GalaDinner';
                this.fireClourFireRef = 'Navestock250/Dinner/photos';
                this.photoIdentifier = 'identifier';
                break;
              }
             case 'veterans7aside':{
                this.fireStorageRef = 'Navestock250/veterans7aside';
                this.fireClourFireRef = 'Navestock250/veterans7aside/photos';
                this.photoIdentifier = 'identifier';
                break;   
             }
             case 'colinbridgevillagerscup':{
                this.fireStorageRef = 'Navestock250/colinbridgevillagerscup';
                this.fireClourFireRef = 'Navestock250/colinbridgevillagerscup/photos';
                this.photoIdentifier = 'identifier';
                break;   
             }              
          }
    }

}