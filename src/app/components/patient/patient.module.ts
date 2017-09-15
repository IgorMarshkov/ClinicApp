import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './list/list-item/details/details.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientContainerComponent } from './patient-container/patient-container.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    'path': '',
    'redirectTo': 'list',
    'pathMatch': 'full'
  },
  {
    'path': 'list',
    'component': ListComponent
  }, {
    'path': 'details/:id',
    'component': DetailsComponent
  }, {
    'path': 'details/:id/edit',
    'component': PatientEditComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PatientContainerComponent,
    ListComponent,
    DetailsComponent,
    ListItemComponent,
    PatientCreateComponent,
    PatientEditComponent
  ],
  exports: [
    ListComponent,
    DetailsComponent,
    ListItemComponent
  ]
})
export class PatientModule { }
