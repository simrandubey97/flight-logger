import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckInvestmentReadinessComponent } from './check-investment-readiness/check-investment-readiness.component'
import { ScoreComponent } from './score/score.component';
import { ActionItemsComponent } from './action-items/action-items.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'user/changePassword', component: ChangePasswordComponent },
  { path: 'check-investment-readiness', component: CheckInvestmentReadinessComponent },
  { path: 'investment-readiness-score', component: ScoreComponent },
  { path: 'action-items', component: ActionItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
