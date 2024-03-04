import { Component, OnInit, AfterViewInit } from '@angular/core';
 
declare var $: any;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = ['assets/thali.webp', 'assets/khaman.webp', 'assets/dhokla.webp', 'assets/frenchfries.webp', 'assets/cake.webp','assets/milkshake.webp']; 
  currentImageIndex = 0;

  ngOnInit(): void {
    this.showSlides();
  }

  showSlides(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 2000);  
  }
}
