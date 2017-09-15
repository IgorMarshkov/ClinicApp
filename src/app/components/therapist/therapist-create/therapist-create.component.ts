import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TherapistService} from '../therapist.service';
import {ClinicService} from '../../clinic/clinic.service';
import {Therapist} from '../therapist';
import {Clinic} from '../../clinic/clinic';

@Component({
  selector: 'app-therapist-create',
  templateUrl: './therapist-create.component.html',
  styleUrls: ['./therapist-create.component.css']
})
export class TherapistCreateComponent implements OnInit {
  clinics: Clinic[] = [];
  therapistForm: FormGroup;

  constructor(private therapistService: TherapistService,
              private clinicService: ClinicService,
              private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.getClinics();
  }

  createForm() {
    this.therapistForm = this.fb.group({
      'fullName': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      'clinicId': new FormControl(''),
    });
  }

  private getClinics(): void {
    this.clinicService.getClinics().subscribe(resp => {
      this.clinics = resp;
    });
  }

  private createTherapist(): void {
    if (!this.therapistForm.valid) {
      return;
    }
    const therapist = new Therapist();
    therapist.fullName = this.therapistForm.controls.fullName.value;
    therapist.clinicId = this.therapistForm.controls.clinicId.value;
    this.therapistService.createTherapist(therapist).subscribe(res => {
        if (res) {
          this.therapistService.notifyTherapistsChanged(res);
        }
      }
    );
  }
}
