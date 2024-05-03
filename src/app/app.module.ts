import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { FoodsComponent } from './foods/foods.component';
import { HomeComponent } from './Home/home/home.component';
import {RouterModule} from '@angular/router';
import { ContactComponent } from '../contact/contact/contact.component';
import {FormsModule} from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FoodsComponent,
    ContactComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'home', component:HomeComponent},
      {path:'', redirectTo:'/home', pathMatch:'full'},
      {path:'menu', component:FoodsComponent},
      {path:'contact', component:ContactComponent},
      {path:'cart', component:CartComponent},
      { path: '**', redirectTo: '/home'},
    ]),
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
