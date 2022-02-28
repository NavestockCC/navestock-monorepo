import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ImgListObject} from '../img-objects/img-list.object';



import {AngularFirestore} from '@angular/fire/compat/firestore'; // Firestore
import {AngularFireStorage} from '@angular/fire/compat/storage' // Firebase Storage


@Injectable()
export class ImgViewerService {

  constructor( 
    private afs:AngularFirestore,
    private storage: AngularFireStorage
    ) { }

    /**
     * Function to return a observable array of photos as ImgListObject { url:string; caption:string;}
     * @param mtchId - matchid for which photo's will be returned
     */
  // public getMatchImageList(mtchId:string):Observable<ImgListObject[]>{
  //    return this.getPhotoList(this.afs.collection('Fixtures/' + mtchId + '/photo'));
  // }


   /**
    * Generic private method to collect all photo lists and returns observable of array ImageListObjects
    * @param imgCollRef - collection reference where photos are stored
    */
   public getPhotoList(imgCollRef:string):Observable<ImgListObject[]>{
    const imgObs: Observable<ImgListObject[]> = this.afs.collection<ImgListObject>(imgCollRef).valueChanges();
    imgObs.subscribe( imgObjects => {
      imgObjects.forEach(imgObject => {
        if(imgObject.url_thumb == null && imgObject.fileName_thumb != null && imgObject.FireStoreDocRef != null){
          const DLUrl = this.storage.ref(imgObject.fileName_thumb).getDownloadURL();
          DLUrl.subscribe(dlurl =>{
            this.afs.doc(imgObject.FireStoreDocRef).update({'url_thumb': dlurl});
          })
        }
      });
    })
    return imgObs
   }

   /**
 * When loading images check if the url_thumb is null and the fileName_thumb is nut null  
 */
   private updatePhotoDowlLoadURL(imgCollObs:Observable<ImgListObject[]>): void{
      const imgObs =  imgCollObs;
      
   }
}
