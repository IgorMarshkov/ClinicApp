import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Therapist } from './therapist';
import { TherapistDTO } from './therapistDTO';
import { LocalStorageService } from '../../services/localStorageService';
import { Clinic } from '../clinic/clinic';
import { IdGenerator } from '../../services/IdGenerator';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TherapistService {
  localStorageService = new LocalStorageService();
  private therapistsChangedSource = new Subject<Therapist>();
  therapistsChanged = this.therapistsChangedSource.asObservable();

  constructor() {
  }

  public notifyTherpaistsChanged(therapist: Therapist) {
    this.therapistsChangedSource.next(therapist);
  }

  public getTherapists(): Observable<TherapistDTO[]> {
    return Observable.create(observer => {
        const therapists = this.mapResponseToTherapist(this.localStorageService.getTherapists()).map(el => {
          return this.mapTherapistToDTO(el);
        });
        observer.next(therapists);
        observer.complete();
      }
    );
  }

  public getTherapist(id: number): Observable<TherapistDTO> {
    return Observable.create(observer => {
        const therapists = this.mapResponseToTherapist(this.localStorageService.getTherapists()).map(el => {
          return this.mapTherapistToDTO(el);
        });
        const therapist = therapists.find(el => {
          return el.id === id;
        });
        observer.next(therapist);
        observer.complete();
      }
    );
  }

  getTherapistsForClinic(clinicId: number): Observable<Therapist[]> {
    return Observable.create(observer => {
      const therapists = this.mapResponseToTherapist(this.localStorageService.getTherapists());
      const therapistsForClinic = therapists.filter(el => {
        return el.id === +clinicId;
      });
      observer.next(therapistsForClinic);
      observer.complete();
    });
  }

  public createTherapist(therapist: Therapist): Observable<Therapist> {
    therapist.id = IdGenerator.generateId();
    return Observable.create(observer => {
      const therapists = this.mapResponseToTherapist(this.localStorageService.getTherapists());
      therapists.push(therapist);
      this.localStorageService.storeTherapists(JSON.stringify(therapists));
      observer.next(therapist);
      observer.complete();
    });
  }

  public updateTherapist(therapist: TherapistDTO): Observable<Therapist> {
    return Observable.create(observer => {
      const therapists = this.mapResponseToTherapist(this.localStorageService.getTherapists());
      const oldTherapist = therapists.find(el => {
        return el.id === therapist.id;
      });
      oldTherapist.update(this.mapDTOToTherapist(therapist));
      this.localStorageService.storeTherapists(JSON.stringify(therapists));
      observer.next(therapist);
      observer.complete();
    });
  }

  public deleteTherapist(therapist: TherapistDTO): Observable<boolean> {
    return Observable.create(observer => {
      const therapists = this.mapResponseToTherapist(this.localStorageService.getTherapists());
      const index = therapists.findIndex(el => {
        return el.id === therapist.id;
      });
      therapists.splice(index, 1);
      this.localStorageService.storeTherapists(JSON.stringify(therapists));
      observer.next(true);
      observer.complete();
    });
  }


  private mapResponseToTherapist(resp: any): Therapist[] {
    if (!resp) {
      return [];
    }
    return (<any[]>JSON.parse(resp)).map(el => {
      const therapist = new Therapist();
      therapist.fullName = el.fullName;
      therapist.id = +el.id;
      therapist.clinicId = +el.clinicId;
      return therapist;
    });
  }

  private mapTherapistToDTO(therapist: Therapist): TherapistDTO {

    const clinicRawData = this.localStorageService.getClinics();
    const clinic = (<any[]>JSON.parse(clinicRawData)).map(el => {
      const resClinic = new Clinic();
      resClinic.id = el.clinicId;
      resClinic.title = el.title;
      return resClinic;
    }).find(el => {
      return el.id === therapist.clinicId;
    });

    const therapistDTO = new TherapistDTO();
    therapistDTO.id = therapist.id;
    therapistDTO.fullName = therapist.fullName;
    if (clinic) {
      therapistDTO.clinicId = clinic.id;
      therapistDTO.clinicTitle = clinic.title;
    }
    return therapistDTO;
  }

  private mapDTOToTherapist(therapistDTO: TherapistDTO): Therapist {
    const therapist = new Therapist();
    therapist.id = therapistDTO.id;
    therapist.fullName = therapistDTO.fullName;
    therapist.clinicId = therapistDTO.clinicId;
    return therapist;
  }
}
