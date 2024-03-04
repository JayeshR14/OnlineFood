import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodService } from './food-service';
import { Subscription } from 'rxjs';
import { Ifood } from './food';
import {CartService} from '../cart/cart-service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit, OnDestroy {

  private _listfilter : string = '';

  filteredfood : Ifood[] = [];

  foods : Ifood[] = [];
  sub! : Subscription;

  constructor(private foodService:FoodService, private cartService:CartService,  private snackBar: MatSnackBar) { }

  get listFilter():string{
    return this._listfilter;
  }

  set listfilter(value:string){
    this._listfilter = value;
    this.filteredfood = this.performFilter(value);
  }

  performFilter(filterby:string): Ifood[]{
      filterby = filterby.toLowerCase();
      return this.foods.filter((food:Ifood)=>{
        return food.Name.toLocaleLowerCase().includes(filterby); 
      })
  }

  addToCart(item : Ifood):void{
    this.cartService.addToCart(item);
    this.showAlert('Item Added to cart');
  }

  showAlert(message:string): void{
    this.snackBar.open(message, 'Close',{
      duration:5000
    });
  }

  ngOnInit(): void {
    
    this.sub = this.foodService.getFoods().subscribe({
      next:newfoods=>{
         this.foods = newfoods;
         this.filteredfood = newfoods;
      },
      error:err=>console.log('error')
    })
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }
  
  
}
