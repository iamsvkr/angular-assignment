import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionComponent } from './transaction/transaction.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';



@NgModule({
  declarations: [TransactionComponent, NewTransactionComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
