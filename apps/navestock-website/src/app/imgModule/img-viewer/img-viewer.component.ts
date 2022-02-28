import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';

/**
 * Import image-view 
 */
import {ImgListObject} from '../img-objects/img-list.object';
import {ImgViewerService} from './img-viewer.service';
import {imgStorageObject} from '../img-objects/storage.setup.object';




@Component({
  selector: 'ncc-app-img-viewer',
  templateUrl: './img-viewer.component.html',
})
export class ImgViewerComponent implements OnInit {
  @Input() photosToDisplay!: string;
  @Input() identifier!: string;
  @Output() photoCounter: EventEmitter<number> = new EventEmitter();
  
  public photoList!: Observable<ImgListObject[]>;
  public photoSelected!:ImgListObject | null;



  constructor(private ivs: ImgViewerService) { }

  ngOnInit() {
    const imgstorageobject:imgStorageObject = new imgStorageObject();
    imgstorageobject.setimgStorageObject(this.photosToDisplay, this.identifier);
    this.photoList = this.ivs.getPhotoList(imgstorageobject.fireClourFireRef);
    this.photoList.subscribe(res => {this.firePhotoCounter(res.length)})
  }

  private firePhotoCounter(nPhotos:number){
      this.photoCounter.next(nPhotos);
  }


  setSelectedPhoto(slectedPhoto:ImgListObject){
    this.photoSelected = slectedPhoto;
  }

  closeSelectedPhoto(){
    this.photoSelected = null;
  }

}
