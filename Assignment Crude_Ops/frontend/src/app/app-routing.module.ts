import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AllUserComponent } from './all-user/all-user.component';
import { AuthGuard } from './authentication/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: AllUserComponent },
  { path: 'alluser', component: AllUserComponent },
  { path: 'home', component: HomeComponent  },
  { path: 'auth', component: AuthenticationComponent },
  { path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'adduser/:id', component: AddUserComponent, canActivate: [AuthGuard] },
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
