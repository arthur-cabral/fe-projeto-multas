import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MultasUpdateComponent } from './multas-update/multas-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AuthGuard } from 'src/app/security/auth.guard';
import { MultasListComponent } from './multas-list/multas-list.component';
import { MultasDetailsComponent } from './multas-details/multas-details.component';
import { MultasFormComponent } from './multas-form/multas-form.component';
import { MatNativeDateModule } from '@angular/material/core';


const routes: Routes = [
  {
    path: 'criar',
    component: MultasFormComponent
  },
  {
    path: 'listar',
    component: MultasListComponent,
    canActivate: [AuthGuard],
    data: { role: 'User' }
  },
  {
    path: 'editar/:id',
    component: MultasUpdateComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' }
  },
  {
    path: '',
    redirectTo: 'criar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'criar'
  }
];

@NgModule({
  declarations: [
    MultasListComponent,
    MultasFormComponent,
    MultasUpdateComponent,
    MultasDetailsComponent
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
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MultasModule { }
