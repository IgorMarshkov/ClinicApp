export class Therapist {
  id: number;
  clinicId: number;
  fullName: string;


  public update(therapist: Therapist) {
    this.fullName = therapist.fullName;
    this.clinicId = therapist.clinicId;
  }
}
