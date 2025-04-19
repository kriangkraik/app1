import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'], // แก้ styleUrl → styleUrls
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;

    // Dummy auth logic (replace with real API call)
    if (username === 'admin' && password === 'password') {
      alert('Login successful!');
      this.router.navigate(['/users']); // or your desired route
    } else {
      alert('Invalid credentials');
    }
  }
}
