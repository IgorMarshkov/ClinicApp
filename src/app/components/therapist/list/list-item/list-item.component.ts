import { Component, Input, OnInit } from '@angular/core';
import { TherapistDTO } from '../../therapistDTO';
import { TherapistService } from '../../therapist.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'list-item',
  templateUrl: 'list-item.component.html',
  styleUrls: ['list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input()
  therapist: TherapistDTO;

  constructor(private therapistService: TherapistService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  private deleteTherapist(): void {
    this.therapistService.deleteTherapist(this.therapist).subscribe(res => {
        if (res) {
          this.therapistService.notifyTherpaistsChanged(null);
        }
      }
    );
  }

  private edit(): void {
    this.router.navigate(['../details', this.therapist.id, 'edit'], {relativeTo: this.route});
  }

}
