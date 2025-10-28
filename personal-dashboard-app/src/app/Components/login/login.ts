import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router,  private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const savedUser = localStorage.getItem('registeredUser');

      if (savedUser) {
        const user = JSON.parse(savedUser);

        if (user.email === email && user.password === password) {
          this.auth.login(user);
          alert(`Welcome back, ${user.firstName}!`);
          this.router.navigate(['/dashboard']);
        }

        else {
          this.errorMessage = 'Invalid email or password.';
        }
    } else {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
}
}

