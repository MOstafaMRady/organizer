import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RoutingModule} from './routing.module';
import {SharedModule} from './shared/shared.module';
import {CatService} from './services/cat.service';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {AppComponent} from './app.component';
import {CatsComponent} from './cats/cats.component';
import {AboutComponent} from './about/about.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AccountComponent} from './account/account.component';
import {AdminComponent} from './admin/admin.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PlaceComponent} from './place/place.component';
import {PlaceCrudService} from './place/place-crud.service';
import {ReactiveFormsModule} from '@angular/forms';
import {CourseComponent} from './course/course.component';
import {CourseCrudService} from './course/course-crud.service';
import {AttendeeComponent} from './attendee/attendee.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import {AttendeeEditorComponent} from './attendee/attendee-editor.component';
import {AttendeeCrudService} from './attendee/attendee-crud.service';
import {MomentModule} from 'angular2-moment';
import {FullNamePipe} from './shared/pipes/full-name.pipe';
import {GroupComponent} from './group/group.component';
import {GroupEditorComponent} from './group/group-editor.component';
import {GroupCrudService} from './group/group-crud.service';
import {AttendeesJoinPipe} from './shared/pipes/attendees-join.pipe';
import {AttendeeFullNameService} from './shared/pipes/attendee-full-name.service';


@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    PlaceComponent,
    CourseComponent,
    AttendeeComponent,
    AttendeeEditorComponent,
    FullNamePipe,
    AttendeesJoinPipe,
    GroupComponent,
    GroupEditorComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    MomentModule
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CatService,
    UserService,
    PlaceCrudService,
    CourseCrudService,
    AttendeeCrudService,
    GroupCrudService,
    AttendeeFullNameService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}
