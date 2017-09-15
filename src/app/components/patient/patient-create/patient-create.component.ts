import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PatientService} from '../patient.service';
import {ClinicService} from '../../clinic/clinic.service';
import {Patient} from '../patient';
import {Clinic} from '../../clinic/clinic';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {
  patientForm: FormGroup;

  ngOnInit() {

  }

}
