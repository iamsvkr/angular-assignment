import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import  { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { IAccount } from 'src/app/Entities/account';
import { AccountService } from '../../../../services/account.service';
import { ViewCellRenderComponent } from '../view-cell-render/view-cell-render.component';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: IAccount;
  accounts!: IAccount[];
  modalValue!:IAccount;
  @ViewChild('content', { static: false }) private content: any;
  columnDefs = [
    { field: "accountName", width: 180, headerName: 'Account Name', sortable: true },
    { field: "accountAddress", width: 200, headerName: 'Address', sortable: true },
    { field: "panNumber", width: 100, headerName: 'Pan', headerClass: 'client_grid_column_align-right' },
    { field: "gstNumber", width: 100, headerName: "GST No." },
    { field: "id", headerName: "", width: 80, cellRenderer: "viewRender", suppressNavigable: true }]
  gridApi: any;
  gridColumnApi: any;
  context: any;
  frameworkComponents = {
    viewRender: ViewCellRenderComponent
  }
  constructor(private accountService: AccountService,private modalService:NgbModal) {
    //** Initalized account with default Value */
    this.account = this.getAccountDefault();
    this.context = { componentParent: this }
  }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts()
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onSelectionChanged(event: any) {
    var selectedRows = this.gridApi.getSelectedRows();
    let data = selectedRows[0];
    this.account = data;
  }
  getAccountDefault(): IAccount {
    return {
      id: -1,
      accountName: "",
      accountAddress: "",
      panNumber: "",
      isGSTRegistered: false,
      gstNumber: undefined,
      bankAccountNumber: "",
      bankBranch: "",
      bankName: "",
      ifscCode: ""
    }
  }
  onAccountFormSubmit(value: IAccount) {
    let account = { ...value };
    this.accounts = this.accountService.saveAccount(account);
    this.account = this.getAccountDefault();
    this.gridApi.setRowData(this.accounts);
  }
  onViewClick(value: IAccount) {
    this.modalValue = value;
    this.modalService.open(this.content);
  }
}
