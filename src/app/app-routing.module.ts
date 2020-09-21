import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputGridComponent } from './input-grid/input-grid.component';


const routes: Routes = [
    { path: '',   redirectTo: 'sudoku', pathMatch: 'full' },
    { path: 'sudoku',  component: InputGridComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
