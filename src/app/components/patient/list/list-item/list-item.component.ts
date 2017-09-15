import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from '../../patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientDTO } from '../../patientDTO';
import { Clinic } from '../../../clinic/clinic';
import { Therapist } from '../../../therapist/therapist';

@Component({
  selector: 'list-item',
  templateUrl: 'list-item.component.html',
  styleUrls: ['list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input()
  patient: PatientDTO;
  therapist: Therapist;

  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
  }

  private deletePatient(): void {
    this.patientService.deletePatient(this.patient).subscribe(res => {
      if (res) {
        this.patientService.notifyPatientsChanged(null);
      }
    });
  }

  private edit(): void {
    this.router.navigate(['../details', this.patient.id, 'edit'], {relativeTo: this.route});
  }

}
