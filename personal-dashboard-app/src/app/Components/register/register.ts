import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordMatchValidator } from '../Validators/password-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
      { validators: passwordMatchValidator('password', 'confirmPassword') }
    );
  }
  // Toggle password visibility with hash eye
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }



  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      delete userData.confirmPassword; // Don’t store confirmPassword

      // Save data to localStorage
      localStorage.setItem('registeredUser', JSON.stringify(userData));

      console.log('User Registered:', userData);

      alert('Registration successful!');
      this.router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched();
      console.warn('Form is invalid');
    }
  }
}

