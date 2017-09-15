import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clinic } from '../../clinic/clinic';
import { TherapistDTO } from '../therapistDTO';
import { TherapistService } from '../therapist.service';
import { ClinicService } from '../../clinic/clinic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-therapist-edit',
  templateUrl: './therapist-edit.component.html',
  styleUrls: ['./therapist-edit.component.scss']
})
export class TherapistEditComponent implements OnInit {
  clinics: Clinic[] = [];
  @Input()
  therapist: TherapistDTO;
  therapistForm: FormGroup;

  constructor(private clinicService: ClinicService,
              private therapistService: TherapistService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private location: Location) {

  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.therapistService.getTherapist(+param['id']).subscribe(res => {
        this.therapist = res;
        this.getClinics();
        this.createForm();
      });
    });
  }

  createForm() {
    this.therapistForm = this.fb.group({
      'fullName': new FormControl(this.therapist.fullName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      'clinicId': new FormControl(this.therapist.clinicId),
    });
  }

  private getClinics(): void {
    this.clinicService.getClinics().subscribe(resp => {
      this.clinics = resp;
    });
  }

  private updateTherapist(): void {
    if (!this.therapistForm.valid) {
      return;
    }
    const updatedTherapist = new TherapistDTO();
    updatedTherapist.id = this.therapist.id;
    updatedTherapist.clinicId = this.therapistForm.controls.clinicId.value;
    updatedTherapist.fullName = this.therapistForm.controls.fullName.value;
    this.therapistService.updateTherapist(updatedTherapist).subscribe(res => {
        if (res) {
          this.therapistService.notifyTherapistsChanged(res);
          this.location.back();
        }
      }
    );
  }

  private cancel() {
    this.location.back();
  }

}
