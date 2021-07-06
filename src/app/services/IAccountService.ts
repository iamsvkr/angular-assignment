import { IAccount } from "../Entities/account";
export interface IAccountService {
    accounts:IAccount[];
    accountKey: string;
    getAccounts():IAccount[];
    saveAccount(account:IAccount):IAccount[];
    deletAccount(account:IAccount):IAccount[];
    findAccountById(id:number):IAccount|null;
}