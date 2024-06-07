import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultasListComponent } from './multas-list/multas-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MultasFormComponent } from './multas-form/multas-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: 'criar', component: MultasFormComponent },
  { path: 'listar', component: MultasListComponent },
  { path: '', redirectTo: 'criar', pathMatch: 'full' },
  { path: '**', redirectTo: 'criar' }
];

@NgModule({
  declarations: [
    MultasListComponent,
    MultasFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ]
})
export class MultasModule { }
