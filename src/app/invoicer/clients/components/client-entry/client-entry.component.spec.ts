import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ClientEntryComponent } from './client-entry.component';

describe('ClientEntryComponent', () => {
  let component: ClientEntryComponent;
  let fixture: ComponentFixture<ClientEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEntryComponent ],
      imports:[FormsModule,ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('input client should bind with form field',()=>{
    component.client = {
      clientName:"CLIENT1",
      clientAddress:"ADDRESS1",
      isGSTApplication:true,
      clientGSTNumber:"GST1"
    };
    component.clientForm.get("clientName").patchValue(component.client.clientName);
    component.clientForm.get("clientAddress").patchValue(component.client.clientAddress);
    component.clientForm.get("isGSTApplication").patchValue(component.client.isGSTApplication);
    component.clientForm.get("clientGSTNumber").patchValue(component.client.clientGSTNumber);
    fixture.detectChanges();
    let componentElement = fixture.debugElement.nativeElement;
    let clientName = componentElement.querySelector("#clientName").value;
    let clientAddress= componentElement.querySelector("#clientAddress").value;
    let clientGSTNumber= componentElement.querySelector("#clientGSTNumber").value;
    expect(clientName).toBe("CLIENT1");
    expect(clientAddress).toBe("ADDRESS1");
    expect(clientGSTNumber).toBe("GST1");

  });
  it('client form shoud be invalid',()=>{
    expect(component.clientForm.valid).toBeFalsy();
  });
  it('Save button should be disabled if client form is invalid',()=>{
    component.client = {
      clientName:"",
      clientAddress:"",
      isGSTApplication:true,
      clientGSTNumber:""
    };
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector("button");
    console.log(button);
    expect(button.classList.value).toContain("disabled");
  });
});
