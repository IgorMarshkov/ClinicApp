import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ListItemComponent} from './list/list-item/list-item.component';
import {ListComponent} from './list/list.component';
import {DetailsComponent} from './details/details.component';
import {ClinicCreateComponent} from './clinic-create/clinic-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClinicEditComponent} from './clinic-edit/clinic-edit.component';
import {ClinicService} from './clinic.service';
import {ClinicContainerComponent} from './clinic-container/clinic-container.component';


export const routes: Routes = [
  {
    'path': '',
    'redirectTo': 'list',
    'pathMatch': 'full'
  },
  {
    'path': 'list',
    'component': ListComponent,
  },
  {
    'path': 'details/:id/edit',
    'component': ClinicEditComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ClinicContainerComponent,
    ListComponent,
    DetailsComponent,
    ListItemComponent,
    ClinicCreateComponent,
    ClinicEditComponent
  ],
  exports: [
    ListComponent,
    DetailsComponent,
    ListItemComponent
  ],
  providers: [
    ClinicService,
  ]
})
export class ClinicModule { }
