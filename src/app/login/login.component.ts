import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthJWTService } from '../core/services/auth.jwt/auth.jwt.service';
import { first, map } from 'rxjs/operators';
import { AlertService } from '../core/services/alert/alert.service';
import { LoginCredentials } from '../core/models/loginCredentials';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  private loginCredentials: LoginCredentials;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthJWTService,
    private alertService: AlertService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: false,
      loginrole: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log('Login Component - On Submit');
    this.submitted = true;

    this.loginCredentials = {
      username: this.f.username.value,
      password: this.f.password.value,
      role: this.f.loginrole.value,
      rememberMe: this.f.rememberme.value
    };

    console.table(this.loginCredentials);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('form invalid');
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.loginCredentials)
      .pipe(first())
      .subscribe(
        resp => {
          console.log(resp);
          // this.router.navigate([this.returnUrl]);
          this.router.navigate(['/register']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
