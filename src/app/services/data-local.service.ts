import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Registro } from '../models/registro.model';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(private navCtrl:NavController, private iab:InAppBrowser) { }

  async guardarRegistro(format:string, content:string)
  {
    const nuevoRegistro = new Registro(format, content);
    console.log(nuevoRegistro);
    
    //Tarea 1 -- Deben guardar los registros en la memoria del equipo

    this.abrirRegistro(nuevoRegistro);


  }

  abrirRegistro(registro:Registro)
  {
    this.navCtrl.navigateForward('/tabs/tab2')
    switch(registro.type){

      case 'http' : 
        const browser = this.iab.create(registro.content);
        browser.show();
        //Tarea 2 -- Abrir el registro en el navegador nativo del dispositivo
      break;
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.content}`)
        
        //Abrir el mapa
      break;
      
    }
  }

}
