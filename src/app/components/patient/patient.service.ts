import { Injectable } from '@angular/core';
import { Patient } from './patient';
import { LocalStorageService } from '../../services/localStorageService';
import { IdGenerator } from '../../services/IdGenerator';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientDTO } from './patientDTO';
import { Therapist } from '../therapist/therapist';
import { Clinic } from '../clinic/clinic';

@Injectable()
export class PatientService {
  localStorageService = new LocalStorageService();
  private patientsChangedSource = new Subject<Patient>();
  patientsChanged = this.patientsChangedSource.asObservable();

  constructor() {
  }

  public notifyPatientsChanged(patient: Patient) {
    this.patientsChangedSource.next(patient);
  }

  public getPatients(): Observable<PatientDTO[]> {
    return Observable.create(observer => {
        const patients = this.mapResponseToPatient(this.localStorageService.getPatients()).map(el => {
          return this.mapPatientToDTO(el);
        });
        observer.next(patients);
        observer.complete();
      }
    );
  }

  public getPatient(id: number): Observable<PatientDTO> {
    return Observable.create(observer => {
        const patients = this.mapResponseToPatient(this.localStorageService.getPatients()).map(el => {
          return this.mapPatientToDTO(el);
        });
        const patient = patients.find(el => {
          return el.id === id;
        });
        observer.next(patient);
        observer.complete();
      }
    );
  }

  public createPatient(patient: Patient): Observable<Patient> {
    patient.id = IdGenerator.generateId();
    return Observable.create(observer => {
      const patients = this.mapResponseToPatient(this.localStorageService.getPatients());
      patients.push(patient);
      this.localStorageService.storePatients(JSON.stringify(patients));
      observer.next(patient);
      observer.complete();
    });
  }

  public updatePatient(patient: PatientDTO): Observable<Patient> {
    return Observable.create(observer => {
      const patients = this.mapResponseToPatient(this.localStorageService.getPatients());
      const oldPatient = patients.find(el => {
        return el.id === patient.id;
      });
      oldPatient.update(this.mapDTOToPatient(patient));
      this.localStorageService.storePatients(JSON.stringify(patients));
      observer.next(patient);
      observer.complete();
    });
  }

  public deletePatient(patient: PatientDTO): Observable<boolean> {
    return Observable.create(observer => {
      const patients = this.mapResponseToPatient(this.localStorageService.getPatients());
      const index = patients.findIndex(el => {
        return el.id === patient.id;
      });
      patients.splice(index, 1);
      this.localStorageService.storePatients(JSON.stringify(patients));
      observer.next(true);
      observer.complete();
    });
  }


  private mapResponseToPatient(resp: any): Patient[] {
    if (!resp) {
      return [];
    }
    return (<any[]>JSON.parse(resp)).map(el => {
      const patient = new Patient();
      patient.id = +el.id;
      patient.fullName = el.fullName;
      patient.clinicId = +el.clinicId;
      patient.therapistId = +el.therapistId;
      return patient;
    });
  }

  private mapPatientToDTO(patient: Patient): PatientDTO {

    const therapistsRawData = this.localStorageService.getTherapists();
    const therapist = (<any[]>JSON.parse(therapistsRawData)).map(el => {
      const resTherapist = new Therapist();
      resTherapist.id = +el.id;
      resTherapist.clinicId = +el.clinicId;
      resTherapist.fullName = el.fullName;
      return resTherapist;
    }).find(el => {
      return el.id === patient.therapistId;
    });

    const clinicRawData = this.localStorageService.getClinics();
    const clinic = (<any[]>JSON.parse(clinicRawData)).map(el => {
      const resClinic = new Clinic();
      resClinic.id = +el.id;
      resClinic.title = el.title;
      return resClinic;
    }).find(el => {
      return el.id === patient.clinicId;
    });

    const patientDTO = new PatientDTO();
    patientDTO.id = +patient.id;
    patientDTO.fullName = patient.fullName;
    if (therapist) {
      patientDTO.therapistId = therapist.id;
      patientDTO.therapistFullName = therapist.fullName;
    }
    if (clinic) {
      patientDTO.clinicId = clinic.id;
      patientDTO.clinicTitle = clinic.title;
    }
    return patientDTO;
  }

  private mapDTOToPatient(patientDTO: PatientDTO): Patient {
    const patient = new Patient();
    patient.id = patientDTO.id;
    patient.fullName = patientDTO.fullName;
    patient.clinicId = patientDTO.clinicId;
    patient.therapistId = patientDTO.therapistId;
    return patient;
  }
}
