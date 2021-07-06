import { Component, OnInit,Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms"; 
import {IClientFormModel} from './componentModel/clientFormModel';

@Component({
  selector: 'app-client-entry',
  templateUrl: './client-entry.component.html',
  styleUrls: ['./client-entry.component.css']
})
export class ClientEntryComponent implements OnInit,OnChanges {

  clientForm!:FormGroup;
  @Input('client') client!:IClientFormModel;
  @Output('onClientFormSubmit') onClientFormSubmit:EventEmitter<IClientFormModel> = new EventEmitter<IClientFormModel>();
  constructor(private fb:FormBuilder) { 
  
  }
  ngOnInit(): void {
    this.clientForm = this.fb.group({
      clientName:[this.client?.clientName, Validators.required],
      clientAddress:[this.client?.clientAddress,Validators.required],
      isGSTApplication:[this.client?.isGSTApplication],
      clientGSTNumber:[this.client?.clientGSTNumber]
    });

    //subscribe to GSTCheckBox value changes event 
      this.clientForm.get("isGSTApplication")!.valueChanges.subscribe(value=>{
      if(value){
        this.clientForm.get("clientGSTNumber")!.setValidators(Validators.required);
        this.client.isGSTApplication = true;
      }else{
        this.clientForm.get("clientGSTNumber")!.clearValidators();
        this.clientForm.get("clientGSTNumber")!.setValue(null);
      }
      this.clientForm.get("clientGSTNumber")!.updateValueAndValidity();
    });
  }
  ngOnChanges(changes:SimpleChanges){
    if(changes.client && changes.client.currentValue !== changes.client.previousValue){
        this.applyInputValueChange(changes.client.currentValue);
    }
  }
  applyInputValueChange(client:IClientFormModel){
    if (this.clientForm) {
      this.clientForm.get("clientName")!.patchValue(client.clientName);
      this.clientForm.get("clientAddress")!.patchValue(client.clientAddress);
      this.clientForm.get("isGSTApplication")!.patchValue(client.isGSTApplication);
      this.clientForm.get("clientGSTNumber")!.patchValue(client.clientGSTNumber);
    }
  }
  onSubmit():void{
    let client:IClientFormModel =  {
      clientName:this.clientForm.get("clientName")!.value,
      clientAddress:this.clientForm.get("clientAddress")!.value,
      isGSTApplication:this.clientForm.get("isGSTApplication")!.value,
      clientGSTNumber:this.clientForm.get("clientGSTNumber")!.value,
      id:this.client.id
    }
    this.onClientFormSubmit.emit(client);
    this.clientForm.reset();
  }
  
}
