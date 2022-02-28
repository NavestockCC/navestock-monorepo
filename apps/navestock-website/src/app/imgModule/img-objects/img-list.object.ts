export class ImgListObject{
  // Origional IMG data fields
  public url!: string | null;
    public fileName!: string | null;
    public fullPath!: string | null;
    public metadata: any;
 
//IMG Caption
  public caption!: string;

// Thumb IMG data fields
    public fileName_thumb!: string | null;
    public metadata_thumb: any;
    public url_thumb!: string | null;

//Firebase DOC referance
  public FireStoreDocRef!: string;



}