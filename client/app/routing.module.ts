import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatsComponent} from './cats/cats.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AccountComponent} from './account/account.component';
import {AdminComponent} from './admin/admin.component';
import {NotFoundComponent} from './not-found/not-found.component';

import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {PlaceComponent} from './place/place.component';
import {CourseComponent} from './course/course.component';
import {AttendeeComponent} from './attendee/attendee.component';
import {GroupComponent} from './group/group.component';
import {HomeComponent} from './user-area/home.component';
import {CourseRegistrationComponent} from './course-registration/course-registration.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cats', component: CatsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'course-registration', component: CourseRegistrationComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin]},
  {path: 'places', component: PlaceComponent, canActivate: [AuthGuardLogin]},
  {path: 'courses', component: CourseComponent, canActivate: [AuthGuardLogin]},
  {path: 'groups', component: GroupComponent, canActivate: [AuthGuardLogin]},
  {path: 'attendees', component: AttendeeComponent, canActivate: [AuthGuardLogin]},
  {path: 'notfound', component: NotFoundComponent, canActivate: [AuthGuardLogin]},
  {path: '**', redirectTo: '/notfound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {
}
