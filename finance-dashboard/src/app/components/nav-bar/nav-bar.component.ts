import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private router: Router) {}
  isNavbarCollapsed = false;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  navigateToShortInformation() {
    this.router.navigate(['/short-information']);
    this.isNavbarCollapsed = false;
  }
  navigateToMainTable() {
    this.router.navigate(['']);
    this.isNavbarCollapsed = false;
  }
}
