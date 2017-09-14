import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClinicService} from '../clinic.service';
import {Clinic} from '../clinic';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.component.html',
  styleUrls: ['./clinic-edit.component.scss']
})
export class ClinicEditComponent implements OnInit {
  clinicForm: FormGroup;
  clinic: Clinic;

  constructor(private clinicService: ClinicService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.clinicService.getClinic(+param['id']).subscribe(res => {
        this.clinic = res;
        this.createForm();
      });
    });
  }

  createForm() {
    this.clinicForm = this.fb.group({
      'title': new FormControl(this.clinic.title, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  private updateClinic(): void {
    if (!this.clinicForm.valid) {
      return;
    }
    const updatedClinic = new Clinic();
    updatedClinic.id = this.clinic.id;
    updatedClinic.title = this.clinicForm.controls.title.value;

    this.clinicService.updateClinic(updatedClinic).subscribe(res => {
      if (res) {
        this.clinicService.notifyClinicsChanged(res);
        this.location.back();
      }
    });
  }

  private cancel() {
    this.location.back();
  }

}
