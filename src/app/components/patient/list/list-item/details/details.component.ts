import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../../patient';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input()
  patient: Patient;

  ngOnInit() {
  }

}
