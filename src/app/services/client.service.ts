import { Injectable } from '@angular/core';
import { IClient } from '../Entities/client';
import { findNextIdentity } from '../lib/Utility';
import { IClientService } from './IClientService';
@Injectable({
  providedIn: 'root'
})
export class ClientService implements IClientService{

  clients: IClient[] = [];
  clientKey: string = "clients"
  constructor() {
    let clietnCollection:(string|null) = localStorage.getItem(this.clientKey);
    if (clietnCollection != null) {
      this.clients = <IClient[]>JSON.parse(clietnCollection);
    }
  }
  public getClient(): IClient[] {
    let data:(string|null)= localStorage.getItem(this.clientKey);
    if (data !== null) {
        this.clients = <IClient[]>JSON.parse(data);
    }
    return this.clients;
  }
  public saveClient(client: IClient): IClient[] {
    if (client.id == -1 || client.id == null) {
      let id = findNextIdentity("id", this.clients);
      client.id = id;
      this.clients.push(client);

    } else {
      let clientIndex: number = this.clients.findIndex((item) => {
        return item.id == client.id;
      });
      let preValue: IClient = this.clients[clientIndex];
      preValue.clientName = client.clientName;
      preValue.clientAddress = client.clientAddress;
      preValue.gstNumber = client.gstNumber;
      this.clients[clientIndex] = preValue;
    }
    localStorage.setItem(this.clientKey, JSON.stringify(this.clients));
    return this.clients;

  }
  public deletClient(client: IClient): IClient[] {
    this.clients = this.clients.filter((item: IClient) => { return item.id !== client.id });
    localStorage.setItem(this.clientKey, JSON.stringify(this.clients));
    return this.clients;
  }
  public findClientById(id:number):IClient|null{
    if(!isNaN(id)){
      let searchValue = this.getClient().filter((item:IClient)=>{return item.id == id});
      if(searchValue && searchValue.length >0) return searchValue[0];
    }
    return null;
  }
}
