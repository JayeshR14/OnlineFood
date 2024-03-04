import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ifood } from "../foods/food";
import { ICartItem } from "./cart-item.model";

@Injectable({
    providedIn:'root'
})

export class CartService{
  subTotal : number = 0;
  discount: number = 2;
  taxAndCharge : number = 3;
  grandTotal : number = 0;
    private cartItem: ICartItem[] = [];
    private cartSubject = new BehaviorSubject<{ cartItem: ICartItem[], subTotal: number, grandTotal: number  }>({ cartItem: [], subTotal: 0 , grandTotal:0});

    constructor(){
      this.loadCartItems();
    }

    private loadCartItems(): void {
      const storedItem = localStorage.getItem('cartItems');
      if (storedItem) {
        const storedData = JSON.parse(storedItem);
        this.cartItem = storedData.cartItem;
        this.subTotal = storedData.subTotal;
        this.grandTotal = storedData.grandTotal;
        this.cartSubject.next({ cartItem: this.cartItem, subTotal: this.subTotal, grandTotal: this.grandTotal });
      }
    }
  
    private saveCartItem(): void {
      localStorage.setItem('cartItems', JSON.stringify({ cartItem: this.cartItem, subTotal: this.subTotal, grandTotal: this.grandTotal }));
    }

    addToCart(item:Ifood): void{
      const existingItem = this.cartItem.find(fooditem => fooditem.Name === item.Name);
      console.log("is existing",existingItem)
      if(existingItem){
        // number and Number different
        existingItem.Amount = Number(existingItem.Amount) + Number(item.Price);
        existingItem.Quantity += 1;
        existingItem.CartAmount = Number(existingItem.CartAmount) + Number(item.Price);
      }else{
        const newItem : ICartItem = {
          Name : item.Name,
          Quantity: 1,
          Price: item.Price,
          Amount :item.Price,
          CartAmount: item.Price,
          imageUrl : item.imageUrl
        };
        this.cartItem.push(newItem);
      }

      
       this.recalculateTotals();

      this.cartSubject.next({cartItem:this.cartItem, subTotal:this.subTotal, grandTotal:this.grandTotal});
     
      this.saveCartItem();
      return;
    } 

    getCartItem(): BehaviorSubject<{ cartItem: ICartItem[], subTotal: number, grandTotal:number }>{
     return this.cartSubject;
    }

    deleteItem(itemName: string): void {
      // Find the item index by name
      const index = this.cartItem.findIndex(item => item.Name === itemName);
    
      if (index !== -1) {
        // Remove the item from the array
        this.cartItem.splice(index, 1);
    
        // Recalculate subTotal and grandTotal
        this.recalculateTotals();
    
        // Update the cartSubject and localStorage
        this.cartSubject.next({ cartItem: this.cartItem, subTotal: this.subTotal, grandTotal: this.grandTotal });
        this.saveCartItem();
      }
    }
    
    updateQuantity(event: Event,food: ICartItem): void {
      const existingItem = this.cartItem.find(fooditem => fooditem.Name === food.Name);
      const btn = (event.target as HTMLElement).innerHTML;
      if(btn == '+'){
         food.Quantity += 1;
         if(existingItem)
               existingItem.CartAmount = Number(existingItem.CartAmount) + Number(food.Price);
          
      }else{
        if(food.Quantity > 1){
         food.Quantity -= 1;
         if(existingItem)
         existingItem.CartAmount = Number(existingItem.CartAmount) - Number(food.Price);
        }
      }
      this.recalculateTotals();
  
      this.cartSubject.next({ cartItem: this.cartItem, subTotal: this.subTotal, grandTotal: this.grandTotal });
      
      this.saveCartItem();
    }

    private recalculateTotals(): void {
      // Calculate subTotal based on the quantity and amount of each item
      this.subTotal = this.cartItem.reduce((total, cartItem) => total + (cartItem.Quantity * cartItem.Price), 0);
  
      // Calculate GST (assuming 10% GST)
      const gst = 0.1 * this.subTotal;
  
      // Calculate grandTotal including GST, discount, and taxAndCharge
      this.grandTotal = this.subTotal + gst - this.discount + this.taxAndCharge;
  
      // Update the cartSubject and localStorage if needed
      this.cartSubject.next({ cartItem: this.cartItem, subTotal: this.subTotal, grandTotal: this.grandTotal });
      this.saveCartItem();
    }

 
}
