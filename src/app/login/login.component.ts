import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Tu Bienestar';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form.value);

    if (form.value.usuario === 'admin' && form.value.contrasena === 'admin') {
      localStorage.setItem('usuario', form.value.usuario);
      this.router.navigate(['/menu']);
    }
  }

}
