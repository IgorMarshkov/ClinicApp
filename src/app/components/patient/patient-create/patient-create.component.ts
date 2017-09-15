import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { ClinicService } from '../../clinic/clinic.service';
import { Patient } from '../patient';
import { Clinic } from '../../clinic/clinic';
import { TherapistService } from '../../therapist/therapist.service';
import { Therapist } from '../../therapist/therapist';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  therapists: Therapist[] = [];
  clinics: Clinic[] = [];
  patientForm: FormGroup;


  constructor(private patientService: PatientService,
              private clinicService: ClinicService,
              private therapistService: TherapistService,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.getClinics();
  }

  createForm() {
    this.patientForm = this.fb.group({
      'fullName': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      'clinicId': new FormControl(''),
      'therapistId': new FormControl(''),
    });
    this.patientForm.controls.clinicId.valueChanges.subscribe(data => {
      this.loadTherapistsForClinic(data);
    });
  }


  private getClinics(): void {
    this.clinicService.getClinics().subscribe(resp => {
      this.clinics = resp;
    });
  }

  loadTherapistsForClinic(clinicId: number): void {
    this.therapistService.getTherapistsForClinic(clinicId).subscribe(resp => {
      this.therapists = resp;
      if (resp.length < 1) {
        this.patientForm.controls.therapistId.setValue(null);
      }
    });
  }


  private createPatient(): void {
    if (!this.patientForm.valid) {
      return;
    }
    const patient = new Patient();
    patient.fullName = this.patientForm.controls.fullName.value;
    patient.clinicId = this.patientForm.controls.clinicId.value;
    patient.therapistId = this.patientForm.controls.therapistId.value;
    this.patientService.createPatient(patient).subscribe(res => {
      if (res) {
        this.patientService.notifyPatientsChanged(res);
      }
    });
  }

}
