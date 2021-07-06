import { Component, OnInit } from '@angular/core';
import { IClient } from '../../../../../app/Entities/client';
import { IClientFormModel } from '../client-entry/componentModel/clientFormModel';
import { ClientService } from '../../../../services/client.service'
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  columnDefs = [
    { field: "id", width: 10, hide: true },
    { field: "clientName", width: 200, headerName: 'Client name', sortable: true },
    { field: "clientAddress", width: 200, headerName: 'Address', headerClass: 'client_grid_column_align-right' },
    { field: "gstNumber", width: 200, headerName: "GST No." }
  ];
  gridApi: any;
  gridColumnApi: any;
  constructor(private clientService: ClientService) { }
  clientValue!: IClientFormModel;
  client: IClient = {
    clientName: "",
    clientAddress: "",
    gstNumber: undefined,
    id: -1
  };
  clients!: IClient[];
  ngOnInit(): void {
    this.clients = this.clientService.getClient();
    this.clientValue = this.clientModelMapper(this.client);

  }
  onClientSave(value: IClientFormModel): void {
    if (value) {
      if (this.client) {
        this.client.clientName = value.clientName;
        this.client.clientAddress = value.clientAddress;
        this.client.gstNumber = value.clientGSTNumber;
        if(this.clientValue.id) this.client.id = this.clientValue.id;
      } else {
        this.client = {
          clientName: value.clientName,
          clientAddress: value.clientAddress,
          gstNumber: value.clientGSTNumber,
          id: -1
        }
      }
      this.clients = this.clientService.saveClient(this.client);
      this.gridApi.setRowData(this.clients);
      this.clearClient();

    }
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onSelectionChanged(event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.client = selectedRows[0];
    this.clientValue = this.clientModelMapper(this.client);
  }
  clientModelMapper(client: IClient) {
    let clientValue = {
      clientName: client.clientName,
      clientAddress: client.clientAddress,
      isGSTApplication: client.gstNumber && client.gstNumber.length > 0 ? true : false,
      clientGSTNumber: client.gstNumber,
      id: client.id
    }
    return clientValue;
  }
  clearClient(){
    this.client = {
      clientName: "",
      clientAddress: "",
      gstNumber: undefined,
      id: -1
    };
    this.clientValue = this.clientModelMapper(this.client);
  }
}
