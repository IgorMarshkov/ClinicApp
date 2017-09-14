import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ClinicContainerComponent } from './components/clinic/clinic-container/clinic-container.component';

import { TherapistComponent } from './components/therapist/therapist.component';
import { PatientComponent } from './components/patient/patient.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ClinicModule, routes as clinicRoutes } from './components/clinic/clinic.module';

const routes: Routes = [
  {
    'path': '',
    'redirectTo': 'clinic',
    'pathMatch': 'full'
  }, {
    'path': 'clinic',
    'component': ClinicContainerComponent,
    'children': clinicRoutes
  },
  {
    'path': 'therapist',
    'component': TherapistComponent
  }, {
    'path': 'patient',
    'component': PatientComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClinicContainerComponent,
    TherapistComponent,
    PatientComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ClinicModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
