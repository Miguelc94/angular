import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  title = 'Bienestar Universitario';
  constructor(private router: Router) {}

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
