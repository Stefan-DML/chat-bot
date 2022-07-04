import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './home-page/chat/chat.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/auth.guard';
import { LoginPageComponent } from './user/login-page/login-page.component';


const routes: Routes = [

  {
    path: '', component: HomePageComponent,canActivate: [AuthGuard], children: [
      { path: 'chat', component: ChatComponent}]
  },
  {
    path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  { path: '**', component: HomePageComponent,canActivate: [AuthGuard] }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
