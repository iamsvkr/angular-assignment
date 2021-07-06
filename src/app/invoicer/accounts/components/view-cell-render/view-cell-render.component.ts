import { Component, OnInit } from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community/main';

@Component({
  selector: 'app-view-cell-render',
  templateUrl: './view-cell-render.component.html',
  styleUrls: ['./view-cell-render.component.css']
})
export class ViewCellRenderComponent  {

  private cellValue!: number;
  private params!:ICellRendererParams;
  constructor() { }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    // set value into cell again
    this.cellValue = this.getValueToDisplay(params);
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
  onViewClick(){
    this.params.context.componentParent.onViewClick(this.params.data);
  }

}
