import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  /**
   * Form control + functions
   */
  form: FormGroup;
  // form types, default signup
  type: 'login' | 'signup' | 'reset' = 'signup';
  // loading state
  loading = false;

  serverMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    // Initialise the form for email + password login
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: [''],
    });
  }
  // helper function that changes the form state from login, signup, reset
  changeType(val) {
    this.type = val;
  }

  // get the form type from the UI
  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  // verify passwords matching
  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  // submit email + password if using authentication via email/password
  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.authService.loginWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.authService.signUpWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        this.authService.resetPassword(email);
        this.serverMessage = 'Check your email';
        setTimeout(() => {
          this.serverMessage = '';
        }, 4000);
      }
    } catch (err) {
      this.serverMessage = err;
    }
    this.loading = false;
  }

  async onClickSignInAnonymously() {
    this.loading = true;
    this.authService
      .signInAnonymously()
      .then(() => {
        this.loading = false;
      })
      .catch((error) => {
        this.serverMessage = error;
        this.loading = false;
        return;
      });
  }

  async onClickSignInWithGoogle() {
    this.loading = true;
    await this.authService
      .signInWithGoogleAuthProvider()
      .then(() => {
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        this.serverMessage = error;
        return;
      });
  }
}
