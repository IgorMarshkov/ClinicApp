import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClinicComponent } from './components/clinic/clinic.component';
import { TherapistComponent } from './components/therapist/therapist.component';
import { PatientComponent } from './components/patient/patient.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    'path': '',
    'redirectTo': 'clinic',
    'pathMatch': 'full'
  }, {
    "path": "clinic",
    "component": ClinicComponent
  }, {
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
    ClinicComponent,
    TherapistComponent,
    PatientComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
