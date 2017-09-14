export class Clinic {
  id: number;
  title: string;

  public update(clinic: Clinic) {
    this.title = clinic.title;
  }
}
