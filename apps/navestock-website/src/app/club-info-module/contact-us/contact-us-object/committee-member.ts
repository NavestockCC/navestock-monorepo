export class CommitteeMember {
    public Key!: string;
    public Title!: string;
    public Name!: string;
    public Tel!: string;
    public email!: string;
    public Publish!: boolean;
    public SortPosition!: number;
    public MemberType!: string;
    public ContactDetailsPublish!: boolean;
    public TelPublish!: boolean;
    public emailPublish!: boolean;

   
    constructor() {this.initCommitteeMember()}

        initCommitteeMember(): void{
            this.Key;
            this.Title;
            this.Name;
            this.Tel;
            this.email;
            this.Publish = false;
            this.SortPosition;
            this.MemberType;
            this.ContactDetailsPublish = false;
            this.TelPublish = false;
            this.emailPublish = false;
        }

}
