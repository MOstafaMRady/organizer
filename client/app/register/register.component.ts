import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UserService} from '../services/user.service';
import {ToastComponent} from '../shared/toast/toast.component';
import {CourseCrudService} from '../course/course-crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  course: any;
  registerForm: FormGroup;

  username = this.formBuilder.control('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

  email = this.formBuilder.control('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)]);

  password = this.formBuilder.control('', [Validators.required,
    Validators.minLength(6)]);

  role = this.formBuilder.control('', [Validators.required]);

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService, private courseCrud: CourseCrudService) {
  }

  ngOnInit() {
    if (this.courseCrud.registrationCourse) {
      this.course = this.courseCrud.registrationCourse;
    }

    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }

  setClassUsername() {
    return {'has-danger': !this.username.pristine && !this.username.valid};
  }

  setClassEmail() {
    return {'has-danger': !this.email.pristine && !this.email.valid};
  }

  setClassPassword() {
    return {'has-danger': !this.password.pristine && !this.password.valid};
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}
