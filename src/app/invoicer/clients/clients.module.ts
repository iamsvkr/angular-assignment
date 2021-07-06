import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientComponent } from './components/client/client.component';
import { ClientEntryComponent } from './components/client-entry/client-entry.component';
import { ClientService } from '../../../app/services/client.service';


@NgModule({
  declarations: [ClientComponent, ClientEntryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientsRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers:[ClientService]
})
export class ClientsModule { }
