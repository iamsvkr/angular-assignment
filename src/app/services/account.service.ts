import { Injectable } from '@angular/core';
import { IAccount } from '../Entities/account';
import { findNextIdentity } from '../lib/Utility';
import { IAccountService } from './IAccountService';
@Injectable({
  providedIn: 'root'
})
export class AccountService implements IAccountService{
  accounts: IAccount[] = [];
  accountKey: string = "accounts"
  constructor() {
    let accountCollection:(string|null) = localStorage.getItem(this.accountKey);
    if (accountCollection != null) {
      this.accounts = <IAccount[]>JSON.parse(accountCollection);
    }
  }
  public getAccounts(): IAccount[] {
    let data:(string|null)= localStorage.getItem(this.accountKey);
    if (data !== null) {
        this.accounts = <IAccount[]>JSON.parse(data);
    }
    return this.accounts;
  }
  public saveAccount(account: IAccount): IAccount[] {
    if (account.id == -1 || account.id == null) {
      let id = findNextIdentity("id", this.accounts);
      account.id = id;
      this.accounts.push(account);

    } else {
      let clientIndex: number = this.accounts.findIndex((item) => {
        return item.id == account.id;
      });
      let preValue: IAccount = this.accounts[clientIndex];
      preValue.accountName = account.accountName;
      preValue.accountAddress = account.accountAddress;
      preValue.panNumber = account.panNumber;
      preValue.isGSTRegistered = account.isGSTRegistered;
      preValue.gstNumber = account.gstNumber;
      preValue.bankAccountNumber = account.bankAccountNumber;
      preValue.bankName = account.bankName;
      preValue.bankBranch = account.bankBranch;
      preValue.ifscCode = account.ifscCode;
      this.accounts[clientIndex] = preValue;
    }
    localStorage.setItem(this.accountKey, JSON.stringify(this.accounts));
    return this.accounts;

  }
  public deletAccount(account: IAccount): IAccount[] {
    this.accounts = this.accounts.filter((item: IAccount) => { return item.id !== account.id });
    localStorage.setItem(this.accountKey, JSON.stringify(this.accounts));
    return this.accounts;
  }
  public findAccountById(id:number):IAccount|null{
    if(!isNaN(id)){
      let searchValue = this.getAccounts().filter((item:IAccount)=>{return item.id == id});
      if(searchValue && searchValue.length >0) return searchValue[0];
    }
    return null;
  }
}
