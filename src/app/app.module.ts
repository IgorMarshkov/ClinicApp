import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ClinicContainerComponent } from './components/clinic/clinic-container/clinic-container.component';
import { TherapistContainerComponent } from './components/therapist/therapist-container/therapist-container.component';
import { PatientContainerComponent } from './components/patient/patient-container/patient-container.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ClinicModule, routes as clinicRoutes } from './components/clinic/clinic.module';
import { TherapistModule, routes as therapistRoutes } from './components/therapist/therapist.module';
import { PatientModule, routes as patientRoutes } from './components/patient/patient.module';

const routes: Routes = [
  {
    'path': '',
    'redirectTo': 'clinic',
    'pathMatch': 'full'
  }, {
    'path': 'clinic',
    'component': ClinicContainerComponent,
    'children': clinicRoutes
  }, {
    'path': 'therapist',
    'component': TherapistContainerComponent,
    'children': therapistRoutes
  }, {
    'path': 'patient',
    'component': PatientContainerComponent,
    'children': patientRoutes
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ClinicModule,
    TherapistModule,
    PatientModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
