import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicerRoutingModule } from './invoicer-routing.module';
import { InvoicerComponent } from './invoicer/invoicer.component';



@NgModule({
  declarations: [InvoicerComponent],
  imports: [
    CommonModule,
    InvoicerRoutingModule
  ]
})
export class InvoicerModule { }
