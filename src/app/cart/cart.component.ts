import { Component, OnInit } from '@angular/core';
import { CartService } from './cart-service';
import { ICartItem } from './cart-item.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  subTotal: number = 0;
  grandTotal: number = 0;
  cartItem: ICartItem[] = [];
 
  constructor(private cartService:CartService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.cartService.getCartItem().subscribe(({cartItem, subTotal, grandTotal}) =>{
        this.cartItem = cartItem;
        this.subTotal = subTotal;
        this.grandTotal = grandTotal;
   });
  }
  
  onDeleteItem(itemName: string): void {
    this.cartService.deleteItem(itemName);
    this.showAlert('Item Deleted Successfully!');
  }

  showAlert(message:string): void{
    this.snackBar.open(message, 'Close',{
      duration:5000
    });
  }

  addOrRemoveItems(event : Event,food : ICartItem):void
  {
    this.cartService.updateQuantity(event, food);
  }
}
