import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  constructor(
    private router: Router
  ) {
  } 
  navigateOnClick(route: string){
    this.router.navigate([route]);
  }
}

// const burger = document.querySelector('.burger i');
// const nav = document.querySelector('.nav');
// // Defining a function
// function toggleNav() {
// burger.classList.toggle('fa-bars');
// burger.classList.toggle('fa-times');
// nav.classList.toggle('nav-active');
// }
// // Calling the function after click event occurs
// burger.addEventListener('click', function() {
// toggleNav();
// });