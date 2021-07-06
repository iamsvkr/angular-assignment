import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { IClient } from '../Entities/client'
var service: ClientService;
describe('ClientService', () => {
  
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

    TestBed.configureTestingModule({
      providers:[ClientService]
    });

    service = TestBed.inject(ClientService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    console.log(service)
  });
  
  it('client collection must be null',()=>{
    expect(service.clients.length).toBe(0);
  });

 

  it('saveClient Method must store provided value in localStorage',()=>{
    let client:IClient = {
      id:-1,
      clientName:"Client 1",
      clientAddress:"Address 1",
      gstNumber:"GST 001"
    };
    service.saveClient(client);
    let clients:IClient[] = service.getClient();
    expect(clients.length).toBe(1);
  });

  it('saveClient Method must update client value if it exist',()=>{
    let client:IClient = {
      id:-1,
      clientName:"Client 1",
      clientAddress:"Address 1",
      gstNumber:"GST 001"
    };
    service.saveClient(client);
    let clients:IClient[] = service.getClient();
    expect(clients.length).toBe(1);
    let Updatedclient:IClient = {
      id:1,
      clientName:"Updated",
      clientAddress:"Address 1",
      gstNumber:"GST 001"
    };
    service.saveClient(Updatedclient);
    let updatedclients:IClient[] = service.getClient();
    let clientValue  = updatedclients.filter((item)=>{ return item.id ==1;})
    expect(clientValue[0].clientName).toBe("Updated");
  });

  it('findClientById Method must return match value',()=>{
    let client:IClient = {
      id:-1,
      clientName:"Client 1",
      clientAddress:"Address 1",
      gstNumber:"GST 001"
    };
    service.saveClient(client);
    let clientValue:IClient = service.findClientById(1);
    expect(clientValue.clientName).toBeDefined("Client 1");
  });
});
