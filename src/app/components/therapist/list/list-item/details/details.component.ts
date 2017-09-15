import { Component, Input, OnInit } from '@angular/core';
import { TherapistDTO } from '../../../therapistDTO';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input()
  therapist: TherapistDTO;

  ngOnInit() {
  }

}
