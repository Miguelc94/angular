import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu.component2.html',
  styleUrls: ['./menu.component2.css']
})
export class MenuDosComponent implements OnInit {

  title = 'Tu Bienestar';
  constructor(private router: Router) {}

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
