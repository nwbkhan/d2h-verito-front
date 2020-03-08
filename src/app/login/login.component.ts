import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthenticationService} from '../_services';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['7038080686', Validators.required],
      password: ['abcd1234', Validators.required]
    });

  }


  // for accessing to form fields
  get fval() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.fval.username.value, this.fval.password.value)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.snackbar.open('Caught some error');
          console.log(error);
          this.loading = false;
        });
  }
}
