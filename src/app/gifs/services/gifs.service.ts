import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'D7VaU8pAQcw2qsjrtnsaAZTpZobLhJVI';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];
  //cambiar el any por su tipo
  public resultados: Gif[] = []; 

  get historial(){
    return [...this._historial]; //se uso el spreadOperator para romper la referencia
  }

  constructor(private http: HttpClient){
    //si la pagina de recarga debe de mantener el historial de la buscaqueda
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    //almacenar la imagenes para que se cargue cuando se recarge el navegador web
  }

  //funcion para recibir lo escrito y lo añana al primer valor de arreglo usando el unshift
  buscarGifs(query: string = '') {
    //validacion para no ingresar palabra repetida
    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query); //coloca lo que se escribe dentro de los primeros 10 comenzando con el primero
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '10').set('q', query);
    
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}