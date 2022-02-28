import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { finalize } from 'rxjs/operators';
import { Observable, from } from 'rxjs';


import { imgStorageObject } from '../img-objects/storage.setup.object';
import { ImgListObject } from '../img-objects/img-list.object';


@Component({
  selector: 'ncc-app-img-upload',
  templateUrl: './img-upload.component.html'
})
export class ImgUploadComponent implements OnInit {
  public selectedFile!: File;
  @Input() photosToDisplay!: string; // sting to identify how the photos should be treated. See storage.object.ts for configuration
  @Input() identifier!: string; // string to identify the specific item. See storage.object.ts for configuration


  private filePath!: string;
  public uploadPercent!: Observable<number | undefined>;
  private downloadURL!: Observable<string>;
  private downloadURL_thumb!: Observable<string>;
  public showUploadProgress = false;
  private imgstorageobject: imgStorageObject = new imgStorageObject();
  public userAuth!: Observable<any>;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    //todo: romve const photoRef!: string;
    this.imgstorageobject.setimgStorageObject(this.photosToDisplay, this.identifier);
    this.filePath = this.imgstorageobject.fireStorageRef;
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    this.showUploadProgress = true;
    const file = this.selectedFile;
    const fileRef = this.storage.ref(this.filePath + '/' + file.name);
    const task = this.storage.upload(this.filePath + '/' + file.name, file);
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        const tmpImgObject: ImgListObject = new ImgListObject();
        let fireStoreImgListObjectRef = '00000';

        // after upload of image extract dowload url
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(res => {
          tmpImgObject.url = res;
          tmpImgObject.url_thumb = null;
          tmpImgObject.fileName = file.name;
          tmpImgObject.fullPath = this.filePath + '/' + file.name;
          this.afs.collection(this.imgstorageobject.fireClourFireRef).add(JSON.parse(JSON.stringify(tmpImgObject)))
          .then(
            resp => {
              const metadata = {
                customMetadata: {
                  'FireStoreDocRef': resp.path,
                  'FireStoreDocId': resp.id
                }
              };
              fileRef.updateMetadata(metadata);
              fireStoreImgListObjectRef = resp.id;
              resp.update({'FireStoreDocRef': resp.path});
            }
          );
          }); // end subscribe

        this.showUploadProgress = false; // after uplaod completed set show progress bar to fale
        //this.selectedFile = null; // after uplaod completed set selected file name to null
      }) // end finalize
    ).subscribe(); // end pipe
  } // end onUpload

  public canselUpload() {
    //this.selectedFile = null; // set selected file name to null
  }

  public login() {
    this.userAuth = from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }
  public logout() {
    this.afAuth.signOut();
  }

}
