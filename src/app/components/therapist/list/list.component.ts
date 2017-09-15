import { Component, OnInit } from '@angular/core';
import { TherapistDTO } from '../therapistDTO';
import { TherapistService } from '../therapist.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  therapists: TherapistDTO[] = [];

  constructor(private therapistService: TherapistService) {
    this.therapistService.therapistsChanged.subscribe(res => {
      this.getTherapists();
    });
  }

  ngOnInit() {
    this.getTherapists();
  }

  private getTherapists(): void {
    this.therapistService.getTherapists().subscribe(resp => {
      this.therapists = resp;
    });
  }

}
