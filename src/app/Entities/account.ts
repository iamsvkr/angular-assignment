export interface IAccount{
    id:number;
    accountName:string;
    accountAddress:string;
    panNumber:string;
    isGSTRegistered?:boolean;
    gstNumber?:string;
    bankAccountNumber:string;
    bankName:string;
    bankBranch:string;
    ifscCode:string;
}