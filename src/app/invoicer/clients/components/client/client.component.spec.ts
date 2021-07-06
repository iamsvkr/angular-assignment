import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { IClient } from '../../../../../app/Entities/client';
import { ClientService } from '../../../../../app/services/client.service';

import { IClientFormModel } from '../client-entry/componentModel/clientFormModel';
import { ClientComponent } from './client.component';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  
  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      imports:[AgGridModule.withComponents([])],
      declarations: [ ClientComponent ],
      providers:[ClientService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInt and client and ClientFormModel initalized',()=>{
    const service  = fixture.debugElement.injector.get(ClientService);
    let spy_getClient = spyOn(service,"getClient").and.callFake(()=>{
        return [{
          clientName: "CLIENT1",
          clientAddress: "ADDRESS1",
          gstNumber: "GST001",
          id: 1
        }];
    });
    component.ngOnInit();
    expect(spy_getClient).toHaveBeenCalled();
    expect(component.clients.length).toBeGreaterThan(0);
    expect(component.clientValue.clientName).toBe("");
  })
  it('should be handle onClientFormSubmit event',()=>{
    spyOn(component, 'onClientSave');
    const clientEntryComponent = fixture.debugElement.query(By.css(".app-client-entry-component"));
    clientEntryComponent.triggerEventHandler('onClientFormSubmit', {});
    fixture.detectChanges();
    expect(component.onClientSave).toHaveBeenCalled(); 

  });
  it('should be initalized with default client object',()=>{
    expect(component.client.id).toBe(-1);
  });
  it('clientModelMapper should map client object in to IClientFormModel object',()=>{
    let client: IClient = {
      clientName: "CLIENT1",
      clientAddress: "ADDRESS1",
      gstNumber: "GST001",
      id: 1
    };
    let clientFormModel:IClientFormModel = component.clientModelMapper(client);
    expect(clientFormModel.clientName).toBe("CLIENT1");
  });
  it('should be handle onClientFormSubmit event',()=>{
    spyOn(component, 'onClientSave');
    const clientEntryComponent = fixture.debugElement.query(By.css(".app-client-entry-component"));
    clientEntryComponent.triggerEventHandler('onClientFormSubmit', {});
    fixture.detectChanges();
    expect(component.onClientSave).toHaveBeenCalled(); 
  });
  describe("clients data grid",()=>{
    it("clients data should be bind to grid",()=>{
      component.clients = [{
        clientName: "CLIENT1",
        clientAddress: "ADDRESS1",
        gstNumber: "GST001",
        id: 1
      }];
      fixture.detectChanges();
      const clientgrid = fixture.debugElement.query(By.css(".ag-center-cols-container"));
      expect(clientgrid.children.length).toBeGreaterThan(0)
    });
  });
  describe("client entry form",()=>{
    it('should be created with client-entry component',()=>{
      const compiledContent = fixture.debugElement.nativeElement;
      const clientEntryComponent = compiledContent.querySelector("app-client-entry");
      expect(clientEntryComponent).toBeDefined();
    });
  });
});
