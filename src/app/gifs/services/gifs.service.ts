import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'D7VaU8pAQcw2qsjrtnsaAZTpZobLhJVI';
  private _historial: string[] = [];

  get historial(){
    return [...this._historial]; //se uso el spreadOperator para romper la referencia
  }

  constructor(private http: HttpClient){}

  //funcion para recibir lo escrito y lo añana al primer valor de arreglo usando el unshift
  buscarGifs(query: string = '') {
    //validacion para no ingresar palabra repetida
    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query); //coloca lo que se escribe dentro de los primeros 10 comenzando con el primero
      this._historial = this._historial.splice(0,10);
    }
    
    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=D7VaU8pAQcw2qsjrtnsaAZTpZobLhJVI&q=dragon ball z&limit=10')
      .subscribe((resp: any) => {
        console.log(resp.data);
      })
  }
}

//api: D7VaU8pAQcw2qsjrtnsaAZTpZobLhJVI
