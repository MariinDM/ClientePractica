import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/Guards/auth.guard';
import { CheckSessionGuard } from './shared/Guards/check-session.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),canActivate:[CheckSessionGuard]},
  { path: 'main', loadChildren: () => import('./main/main.module').then((m) => m.MainModule),canActivate:[AuthGuard] },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
