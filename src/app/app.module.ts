import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ClinicContainerComponent } from './components/clinic/clinic-container/clinic-container.component';
import { TherapistContainerComponent } from './components/therapist/therapist-container/therapist-container.component';

import { PatientComponent } from './components/patient/patient.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ClinicModule, routes as clinicRoutes } from './components/clinic/clinic.module';
import { TherapistModule, routes as therapistRoutes } from './components/therapist/therapist.module';

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
    'component': TherapistContainerComponent,
    'children': therapistRoutes
  }, {
    'path': 'patient',
    'component': PatientComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ClinicModule,
    TherapistModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
