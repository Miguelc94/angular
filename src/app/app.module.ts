import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CategoriaComponent} from './categoria/categoria.component';
import {CategoriaService} from './services/categoria.service';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {ProductoComponent} from './producto/producto.component';
import {LoginComponent} from './login/login.component';
import {ProductoService} from './services/producto.service';
import {LoginGuard} from './login.guard';
import {NoLoginGuard} from './no-login.guard';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [NoLoginGuard]},
  {path: 'menu', component: MenuComponent, canActivate: [LoginGuard]},
  {path: 'categoria', component: CategoriaComponent, canActivate: [LoginGuard]},
  {path: 'producto', component: ProductoComponent, canActivate: [LoginGuard]},
  {path: 'prestamos', component: PrestamosComponent, canActivate: [LoginGuard]},
  {path: 'reporte', component: ReporteComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    CategoriaComponent,
    MenuComponent,
    ProductoComponent,
    LoginComponent,
    PrestamosComponent,
    ReporteComponent
  ],
  providers: [CategoriaService, ProductoService, LoginGuard, NoLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
