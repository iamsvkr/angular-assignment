import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from "ag-grid-angular";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountComponent } from './components/account/account.component';
import { AccountEntryComponent } from './components/account-entry/account-entry.component';
import { ViewCellRenderComponent } from './components/view-cell-render/view-cell-render.component';



@NgModule({
  declarations: [AccountComponent, AccountEntryComponent, ViewCellRenderComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    NgbModule
  ]
})
export class AccountsModule { }
