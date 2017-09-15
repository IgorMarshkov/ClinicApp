export class Patient {
  id: number;
  therapistId: number;
  clinicId: number;
  fullName: string;

  public update(patient: Patient) {
    this.fullName = patient.fullName;
    this.clinicId = patient.clinicId;
    this.therapistId = patient.therapistId;
  }
}
