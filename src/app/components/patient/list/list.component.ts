import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { PatientDTO } from '../patientDTO';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  patients: PatientDTO[] = [];

  constructor(private patientService: PatientService) {
    this.patientService.patientsChanged.subscribe(res => {
      this.getPatients();
    });
  }

  ngOnInit() {
    this.getPatients();
  }

  private getPatients(): void {
    this.patientService.getPatients().subscribe(resp => {
      this.patients = resp;
    });
  }

}
