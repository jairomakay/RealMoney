import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpensesPage } from './expenses.page';

import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: ExpensesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule
  ],
  declarations: [ExpensesPage]
})
export class ExpensesPageModule { }
