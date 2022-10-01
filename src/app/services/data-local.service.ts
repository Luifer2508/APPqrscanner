import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Registro } from '../models/registro.model';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  private _registroLocal:Registro[] = [];

  get getRegistroLocal() {
    return[...this._registroLocal]
  }

  constructor(private navCtrl:NavController, private iab:InAppBrowser, private storage:Storage ) { 
    this.init();
    
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadRegistros();
  }

  async guardarRegistro(format:string, content:string)
  {
    const nuevoRegistro = new Registro(format, content);
    console.log(nuevoRegistro);
    
    //Tarea 1 -- Deben guardar los registros en la memoria del equipo
    this._registroLocal = [nuevoRegistro,...this._registroLocal];
    this._storage.set('registro', this._registroLocal);
    console.log(nuevoRegistro);

    this.abrirRegistro(nuevoRegistro);


  }

  async loadRegistros(){
    try {
      const registros = await this._storage.get('registro');
      this._registroLocal = registros;
    } catch (error) {
      console.log(error);
    }
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
