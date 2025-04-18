import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  passwordVisible = false;

  @Input() userData: User | null = null; // รับข้อมูลผู้ใช้เพื่อแก้ไข
  userForm!: FormGroup;
  formSubmitted = false; // เพิ่มตัวแปรเพื่อตรวจสอบการ submit
  formFields: { name: string, label: string, type: string, placeholder: string }[] = [
    { name: 'firstname', label: 'First Name', type: 'text', placeholder: 'Enter your first name' },
    { name: 'lastname', label: 'Last Name', type: 'text', placeholder: 'Enter your last name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
    { name: 'phoneNumber', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number' },
    { name: 'address', label: 'Address', type: 'text', placeholder: 'Enter your address' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city' },
    { name: 'state', label: 'State', type: 'text', placeholder: 'Enter your state' },
    { name: 'country', label: 'Country', type: 'text', placeholder: 'Enter your country' },
    { name: 'zipCode', label: 'Zip Code', type: 'text', placeholder: 'Enter your zip code' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {
    this.userForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: ['']
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
    this.initForm();
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.userForm.patchValue(user); // เติมข้อมูลในฟอร์ม
      });
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      id: [''], // เพิ่มตรงนี้ด้วย
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  loadUserData(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user: User) => {
          if (user) {
            this.userForm.patchValue(user); // เติมข้อมูลในฟอร์ม
          }
        },
        error: (err: any) => {
          console.error("Error fetching user data:", err);
        }
      });
    }
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/api/v1/user', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:8080/api/v1/user/${user.id}`, user);
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.userForm?.valid) {
      const userData: User = this.userForm.value;

      if (userData.id) {
        // กรณี Update
        this.userService.updateUser(userData.id, userData).subscribe({
          next: (response: any) => {
            console.log("User updated:", response);
            this.router.navigate(['/']); // นำทางกลับหน้าหลัก
          },
          error: (err: any) => {
            console.error("Error updating user:", err);
          }
        });
      } else {
        // กรณี Create
        this.createUser(userData).subscribe({
          next: (response: any) => {
            console.log("User created:", response);
            this.router.navigate(['/']); // นำทางกลับหน้าหลัก
          },
          error: (err: any) => {
            console.error("Error creating user:", err);
          }
        });
      }
    }
  }

  onCancel() {
    window.history.back();
  }

}
