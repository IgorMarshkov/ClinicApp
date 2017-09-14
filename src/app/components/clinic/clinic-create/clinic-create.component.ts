import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Clinic} from '../clinic';
import {ClinicService} from '..//clinic.service';

@Component({
  selector: 'app-clinic-create',
  templateUrl: './clinic-create.component.html',
  styleUrls: ['./clinic-create.component.scss']
})
export class ClinicCreateComponent implements OnInit {
  clinicForm: FormGroup;

  constructor(private clinicService: ClinicService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.clinicForm = this.fb.group({
      'title': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  private createClinic(): void {
    if (!this.clinicForm.valid) {
      return;
    }
    const clinic = new Clinic();
    clinic.title = this.clinicForm.controls.title.value;
    this.clinicService.createClinic(clinic).subscribe(res => {
        if (res) {
          this.clinicService.notifyClinicsChanged(res);
        }
      }
    );
  }

}
