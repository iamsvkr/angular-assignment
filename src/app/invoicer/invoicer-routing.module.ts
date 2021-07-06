import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicerComponent } from './invoicer/invoicer.component';

const routes: Routes = [
  {
    path: '', 
    component: InvoicerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'clients' },
      {
        path: 'clients', 
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'accounts', 
        loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
      },
      {
        path: 'transactions', 
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicerRoutingModule { }
