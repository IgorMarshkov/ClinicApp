import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './list/list-item/details/details.component';
import { TherapistCreateComponent } from './therapist-create/therapist-create.component';
import { TherapistEditComponent } from './therapist-edit/therapist-edit.component';
import { TherapistContainerComponent } from './therapist-container/therapist-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TherapistService } from './therapist.service';

export const routes: Routes = [
  {
    'path': '',
    'redirectTo': 'list',
    'pathMatch': 'full'
  }, {
    'path': 'list',
    'component': ListComponent
  }, {
    'path': 'details/:id/edit',
    'component': TherapistEditComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TherapistContainerComponent,
    ListComponent,
    DetailsComponent,
    ListItemComponent,
    TherapistCreateComponent,
    TherapistEditComponent
  ],
  exports: [
    ListComponent,
    DetailsComponent,
    ListItemComponent
  ],
  providers: [
    TherapistService,
  ]
})
export class TherapistModule {
}
