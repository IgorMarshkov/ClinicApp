import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { ClinicService } from '../../clinic/clinic.service';
import { TherapistService } from '../../therapist/therapist.service';
import { PatientDTO } from '../patientDTO';
import { Therapist } from '../../therapist/therapist';
import { Clinic } from '../../clinic/clinic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  @Input()
  patient: PatientDTO;
  therapists: Therapist[];
  clinics: Clinic[];
  patientForm: FormGroup;

  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private location: Location,
              private clinicService: ClinicService,
              private therapistService: TherapistService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.patientService.getPatient(+param['id']).subscribe(resp => {
        this.patient = resp;
        this.getClinics();
        this.createForm();
        this.loadTherapistsForClinic(this.patient.clinicId);
      });
    });
  }

  createForm() {
    this.patientForm = this.fb.group({
      'fullName': new FormControl(this.patient.fullName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      'clinicId': new FormControl(this.patient.clinicId),
      'therapistId': new FormControl(this.patient.therapistId),
    });
    this.patientForm.controls.clinicId.valueChanges.subscribe(data => {
      this.loadTherapistsForClinic(data);
    });
  }

  private updatePatient(): void {
    if (!this.patientForm.valid) {
      return;
    }
    const changedPatient = new PatientDTO();
    changedPatient.id = this.patient.id;
    changedPatient.fullName = this.patientForm.controls.fullName.value;
    changedPatient.clinicId = this.patientForm.controls.clinicId.value;
    changedPatient.therapistId = this.patientForm.controls.therapistId.value;
    this.patientService.updatePatient(changedPatient).subscribe(res => {
      if (res) {
        this.patientService.notifyPatientsChanged(res);
        this.location.back();
      }
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

  private cancel() {
    this.location.back();
  }

}
