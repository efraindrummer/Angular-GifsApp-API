import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  //inyeccion del servico de historial del input del coponente busqueda
  get historial(){
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService){}

  buscar(termino: string){
    this.gifsService.buscarGifs(termino);
  }
}
