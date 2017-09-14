import {Component, OnInit} from '@angular/core';
import {Clinic} from '../clinic';
import {ClinicService} from '../clinic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clinics: Clinic[] = [];

  constructor(private clinicService: ClinicService) {
    this.clinicService.clinicsChanged.subscribe(res => {
      this.getClinics();
    });
  }

  ngOnInit() {
    this.getClinics();
  }

  private getClinics(): void {
    this.clinicService.getClinics().subscribe(resp => {
      this.clinics = resp;
    });
  }

}
