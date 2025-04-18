import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule, NgxPaginationModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  p: number = 1;

  searchText: string = '';

  constructor(private readonly userService: UserService) { }

  get filteredUsers(): User[] {
    if (!this.searchText) return this.users;

    const lowerSearch = this.searchText.toLowerCase();

    return this.users.filter(user =>
      user.id?.toString().includes(lowerSearch) ||
      user.firstname?.toLowerCase().includes(lowerSearch) ||
      user.lastname?.toLowerCase().includes(lowerSearch) ||
      user.email?.toLowerCase().includes(lowerSearch) ||
      user.phoneNumber?.toLowerCase().includes(lowerSearch) ||
      user.address?.toLowerCase().includes(lowerSearch) ||
      user.city?.toLowerCase().includes(lowerSearch) ||
      user.state?.toLowerCase().includes(lowerSearch) ||
      user.country?.toLowerCase().includes(lowerSearch) ||
      user.zipCode?.toLowerCase().includes(lowerSearch)
    );
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.users.sort((a: any, b: any) => {
      const valueA = typeof a[column] === 'string' ? a[column].toLowerCase() : a[column];
      const valueB = typeof b[column] === 'string' ? b[column].toLowerCase() : b[column];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
