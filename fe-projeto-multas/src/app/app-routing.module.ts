import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  {
    path: 'multas',
    loadChildren: () => import('./modules/multas/multas.module').then(m => m.MultasModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
    data: { role: 'Admin' }
  },
  {
    path: '',
    redirectTo: '/multas',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/multas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
