import { TestBed } from '@angular/core/testing';
import { IAccount } from '../Entities/account';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    var storage={};
    spyOn(localStorage,'getItem').and.callFake((key:string):string=>{
      return storage[key] || null;
    });

    spyOn(localStorage,'setItem').and.callFake((key:string,value:string):string=>{
      return storage[key] = value;
    });

    spyOn(localStorage,'removeItem').and.callFake((key:string):void=>{
      delete storage[key];
    });

    spyOn(localStorage, 'clear').and.callFake(() =>  {
      storage = {};
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    let obj1:IAccount = {
      id: -1,
      accountName: "ACCOUNT1",
      accountAddress: "ADDRESS1",
      panNumber: "PAN1",
      isGSTRegistered: true,
      gstNumber: "GST01",
      bankAccountNumber: "ACCOUNTNUMBER1",
      bankBranch: "BRANCH1",
      bankName: "BANK1",
      ifscCode: "IFSCODE1"
    }
    let accounts = service.saveAccount(obj1);
    let obj2:IAccount = {
      id: -1,
      accountName: "ACCOUNT2",
      accountAddress: "ADDRESS2",
      panNumber: "PAN2",
      isGSTRegistered: true,
      gstNumber: "GST02",
      bankAccountNumber: "ACCOUNTNUMBER2",
      bankBranch: "BRANCH2",
      bankName: "BANK2",
      ifscCode: "IFSCODE2"
    }
    accounts = service.saveAccount(obj2);
    expect(accounts[0].accountName).toBe("ACCOUNT1");
  });
});
