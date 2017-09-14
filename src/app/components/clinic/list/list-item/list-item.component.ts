import {Component, OnInit, Input} from '@angular/core';
import {Clinic} from '../../clinic';
import {ClinicService} from '../../clinic.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'list-item',
  templateUrl: 'list-item.component.html',
  styleUrls: ['list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input()
  clinic: Clinic;

  constructor(private clinicService: ClinicService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  private deleteClinic(): void {
    this.clinicService.deleteClinic(this.clinic).subscribe(res => {
      if (res) {
        this.clinicService.notifyClinicsChanged(null);
      }
    });
  }

  private edit(): void {
    this.router.navigate(['../details', this.clinic.id, 'edit'], {relativeTo: this.route});
  }
}
