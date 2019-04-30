import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'messages',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'messages',
    loadChildren: './chat/chat.module#ChatPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'messages/:id',
    loadChildren: './chat/chat.module#ChatPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
