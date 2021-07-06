import { IClient } from '../Entities/client';
export interface IClientService {
    clients:IClient[];
    getClient():IClient[];
    saveClient(client: IClient):IClient[];
    deletClient(client: IClient):IClient[];
    findClientById(id:number):IClient|null;
}