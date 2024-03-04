import { Injectable } from "@angular/core";
import { Ifood } from "./food";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'  
})

export class FoodService{
    private errorMessage = '';

    private foodUrl = 'assets/api/foods/foods.json';

   constructor(private http: HttpClient){}

    getFoods(): Observable<Ifood[]> {
        return this.http.get<Ifood[]>(this.foodUrl).pipe(
            tap(data=>console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        if (err.error instanceof ErrorEvent) {
          this.errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          this.errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(this.errorMessage);
        return throwError(() => this.errorMessage);
      }
}

