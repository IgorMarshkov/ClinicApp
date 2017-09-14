import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Clinic} from './clinic';
import {LocalStorageService} from '../../services/localStorageService';
import {IdGenerator} from '../../services/IdGenerator';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ClinicService {
  localStorageService = new LocalStorageService();
  private clinicsChangedSource = new Subject<Clinic>();
  clinicsChanged = this.clinicsChangedSource.asObservable();

  constructor() {
  }

  public notifyClinicsChanged(clinic: Clinic) {
    this.clinicsChangedSource.next(clinic);
  }

  public getClinics(): Observable<Clinic[]> {
    return Observable.create(observer => {
        const clinics = this.mapResponseToClinic(this.localStorageService.getClinics());
        observer.next(clinics);
        observer.complete();
      }
    );
  }

  public getClinic(id: number): Observable<Clinic> {
    return Observable.create(observer => {
        const clinics = this.mapResponseToClinic(this.localStorageService.getClinics());
        const clinic = clinics.find(el => {
          return el.id === id;
        });
        observer.next(clinic);
        observer.complete();
      }
    );
  }

  public createClinic(clinic: Clinic): Observable<Clinic> {
    clinic.id = IdGenerator.generateId();
    return Observable.create(observer => {
      const clinics = this.mapResponseToClinic(this.localStorageService.getClinics());
      clinics.push(clinic);
      this.localStorageService.storeClinics(JSON.stringify(clinics));
      observer.next(clinic);
      observer.complete();
    });
  }

  public updateClinic(clinic: Clinic): Observable<Clinic> {
    return Observable.create(observer => {
      const clinics = this.mapResponseToClinic(this.localStorageService.getClinics());
      const oldClinic = clinics.find(el => {
        return el.id === clinic.id;
      });
      oldClinic.update(clinic);
      this.localStorageService.storeClinics(JSON.stringify(clinics));
      observer.next(clinic);
      observer.complete();
    });
  }

  public deleteClinic(clinic: Clinic): Observable<boolean> {
    return Observable.create(observer => {
      const clinics = this.mapResponseToClinic(this.localStorageService.getClinics());
      const index = clinics.findIndex(el => {
        return el.id === clinic.id;
      });
      clinics.splice(index, 1);
      this.localStorageService.storeClinics(JSON.stringify(clinics));
      observer.next(true);
      observer.complete();
    });
  }


  private mapResponseToClinic(resp: any): Clinic[] {
    if (!resp) {
      return [];
    }
    return (<any[]>JSON.parse(resp)).map(el => {
      const clinic = new Clinic();
      clinic.id = +el.id;
      clinic.title = el.title;
      return clinic;
    });
  }
}
