import {Component, Input, OnInit} from '@angular/core';
import {Clinic} from '../clinic';
import {ClinicService} from '../clinic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input()
  clinic: Clinic;

  constructor(private clinicService: ClinicService) {
  }

  ngOnInit() {
  }
}
