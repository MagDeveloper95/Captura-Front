import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { here } from 'leaflet-control-geocoder/dist/geocoders';
import { environment } from 'src/environments/environment';
import { Foto } from 'src/shared/foto.interface';
import { FotoWrapper } from 'src/shared/fotoWrapper.interface';
import { Visita } from 'src/shared/visita.interface';
import { IonLoaderService } from './ion-loader.service';
import { ToastServiceService } from './toast-service.service';
import { VisitaService } from './visita-service.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor( public http: HttpClient, private visitaService: VisitaService, public toast:ToastServiceService, private loading:IonLoaderService,
    private alertController:AlertController) { }

 /**
   * Método que obtiene todas las fotos almacenadas en la Base de Datos
   * @param id 
   * @returns lista de todas las fotos
   */
  public getAllFotos(): Promise<Foto[]> {

    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto;
      try {
        let fotos: Foto[] = await this.http.get(endpoint).toPromise() as Foto[];
        resolve(fotos);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Método que nos devuelve una foto a partir de un ID dado
   * @param id 
   * @returns foto
   */
  public getFotoById(id?:Number):Promise<Foto[]>{
    return new Promise(async (resolve, reject) => {
      let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+"/"+id;
      try {
        let fotos: Foto[] = await this.http.get(endpoint).toPromise() as Foto[];
        resolve(fotos);
      } catch (error) {
        reject(error);
      }
    });
  }


      /**
   * Método que nos devuelve las fotos a partir de un ID dado
   * @param id 
   * @returns fotos de una visita
   */
       public getFotoPorVisita(id?:Number):Promise<Foto[]>{
        return new Promise(async (resolve, reject) => {
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+"/visita/"+id;
          try {
            let fotos: Foto[] = await this.http.get(endpoint).toPromise() as Foto[];
            resolve(fotos);
          } catch (error) {
            reject(error);
          }
        });
      }


  /**
   * Método que borra una foto de la Base de Datos
   * @param id 
   * @returns foto borrada
   */
   public deleteFoto(id: Number): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      if(id && id >-1){
        let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+'/'+id;
        try {
          this.http.delete(endpoint).toPromise();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }else{
        reject(false);
      }
    });
  }

    /**
     * Metodo que crea una nueva foto en la Base de Datos
     * @param foto
     * @returns nueva foto
     */
    public async createFoto(foto: Foto): Promise<Foto> {
      return new Promise(async (resolve, reject) => {
        try {
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+'/guardar';
          let newFoto: Foto = await this.http.post(endpoint, foto).toPromise() as Foto;
          resolve(newFoto);
        } catch (error) {
          reject(error);
        }
      });
    }


    public async uploadImagenFile(blobData, id:Number): Promise<Foto> {
      return new Promise(async (resolve, reject) => {
        try {
          //creamos una foto
          let foto: FotoWrapper = {
            visita: id,
            comentario: blobData.name,
            file : blobData,
          };
          const formData = new FormData();
          formData.append('file', blobData, blobData.name);
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+'/add';     
          let newFoto: Foto = await this.http.post(endpoint,formData).toPromise() as Foto;
          resolve(newFoto);
        } catch (error) {
          reject(error);  
        }
      });
    }

    async uploadImage(file:File, id:Number): Promise<void> {
      const httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    };

      return new Promise(async (resolve, reject) => {
        try {
          //creamos una foto
          console.log(file)
          let foto: FotoWrapper = {
            visita: id,
            comentario: file.name,
            id: -1,
            file: file,
          };
          const formData: FormData = new FormData();
          formData.append('file', file);
          formData.append('visita', ""+id);
          formData.append('comentario', file.name);
          formData.append('id', "-1");
          let endpoint = environment.apiEnviroment.endpoint+environment.apiEnviroment.foto+'/add';     
          await this.loading.customLoader("Subiendo...");
          await this.http.post(endpoint,formData).toPromise();
          await this.toast.showToast("Foto subida con éxito", "sucess");
          await this.loading.dismissLoader();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
}
