import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { formLabel,formMessage } from "../../../../lib/formLabelMessage";
import {IAccount} from "../../../../Entities/account"
@Component({
  selector: 'app-account-entry',
  templateUrl: './account-entry.component.html',
  styleUrls: ['./account-entry.component.css']
})
export class AccountEntryComponent implements OnInit,OnChanges {

  @Input() account!:IAccount;
  @Output() onFormSubmit:EventEmitter<IAccount> = new EventEmitter<IAccount>();
  accountForm!:FormGroup;
  formLabel =  formLabel.account;
  formMessage = formMessage.account;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountName:['',Validators.required],
      accountAddress:['',Validators.required],
      panNumber:['',Validators.required],
      isGSTRegistered:[false],
      gstNumber:[''],
      bankAccountNumber:['',Validators.required],
      bankName:['',Validators.required],
      bankBranch:['',Validators.required],
      ifscCode:['',Validators.required]
    });
    this.accountForm.get("isGSTRegistered")!.valueChanges.subscribe((value)=>{
      if(value){
        this.accountForm.get("gstNumber")!.setValidators(Validators.required)
      }else{
        this.accountForm.get("gstNumber")!.clearValidators();
        this.accountForm.get("gstNumber")!.setValue(null);
      }
      this.accountForm.get("gstNumber")!.updateValueAndValidity();
    });
  }
  ngOnChanges(changes:SimpleChanges){
    if(changes.account && changes.account.currentValue !== changes.account.previousValue){
        this.applyInputValueChange(changes.account.currentValue);
    }
  }
  applyInputValueChange(account:IAccount){
    if (this.accountForm) {
      this.accountForm.get("accountName")!.patchValue(account.accountName);
      this.accountForm.get("accountAddress")!.patchValue(account.accountAddress);
      this.accountForm.get("panNumber")!.patchValue(account.panNumber);
      this.accountForm.get("isGSTRegistered")!.patchValue(account.isGSTRegistered);
      this.accountForm.get("gstNumber")!.patchValue(account.gstNumber);
      this.accountForm.get("bankAccountNumber")!.patchValue(account.bankAccountNumber);
      this.accountForm.get("bankName")!.patchValue(account.bankName);
      this.accountForm.get("bankBranch")!.patchValue(account.bankBranch);
      this.accountForm.get("ifscCode")!.patchValue(account.ifscCode);
    }
  }
  onAccountFormSubmit():void{
    let account:IAccount =  {
      accountName:this.accountForm.get("accountName")!.value,
      accountAddress:this.accountForm.get("accountAddress")!.value,
      panNumber:this.accountForm.get("panNumber")!.value,
      isGSTRegistered:this.accountForm.get("isGSTRegistered")!.value,
      gstNumber:this.accountForm.get("gstNumber")!.value,
      bankAccountNumber:this.accountForm.get("bankAccountNumber")!.value,
      bankName:this.accountForm.get("bankName")!.value,
      bankBranch:this.accountForm.get("bankBranch")!.value,
      ifscCode:this.accountForm.get("ifscCode")!.value,
      id:this.account.id
      
    }
    this.onFormSubmit.emit(account);
    this.accountForm.reset();
  }

}
