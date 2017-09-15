import { Injectable } from '@angular/core';
import { Patient } from './patient';
import { LocalStorageService } from '../../services/localStorageService';
import { IdGenerator } from '../../services/IdGenerator';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PatientService {
  localStorageService = new LocalStorageService();
  private patientsChangedSource = new Subject<Patient>();
  patientsChanged = this.patientsChangedSource.asObservable();

  constructor() {
  }


}
