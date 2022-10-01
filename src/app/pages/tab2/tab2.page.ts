import { Component } from '@angular/core';
import { NewRegistro } from 'src/app/interfaces';
import { Registro } from 'src/app/models/registro.model';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  get registros():Registro[]{
    return this.dataLocalService.getRegistroLocal;
  }

  constructor(private dataLocalService:DataLocalService) {}

   
  abrirRegistro(content, format ){
    const registro: Registro = new Registro(format,content);
    this.dataLocalService.abrirRegistro(registro);
    this.dataLocalService.guardarRegistro(registro.format, registro.content);
  }
}
