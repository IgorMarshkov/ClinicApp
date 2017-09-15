import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  patientForm: FormGroup;

  ngOnInit() {

  }

}
