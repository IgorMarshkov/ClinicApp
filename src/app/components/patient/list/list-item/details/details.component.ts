import { Component, Input, OnInit } from '@angular/core';
import { PatientDTO } from '../../../patientDTO';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input()
  patient: PatientDTO;

  ngOnInit() {
  }

}
