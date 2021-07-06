import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
const routes: Routes = [
  {
    path: '', 
    component: TransactionComponent,
    children: [
      { path: '', redirectTo:'new',pathMatch:'full' },
      { path: 'new', component: NewTransactionComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
