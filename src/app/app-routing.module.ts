import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/Guard/auth.guard';
import { CheckSesionGuard } from './auth/Guard/check-sesion.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),canActivate:[AuthGuard]},
  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule),canActivate:[CheckSesionGuard] },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
