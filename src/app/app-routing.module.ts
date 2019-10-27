import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'category', loadChildren: './pages/category/category.module#CategoryPageModule' },
  { path: 'expenses', loadChildren: './pages/expenses/expenses.module#ExpensesPageModule' },
  { path: 'historic', loadChildren: './pages/historic/historic.module#HistoricPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
