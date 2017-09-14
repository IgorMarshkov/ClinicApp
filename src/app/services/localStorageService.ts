const CLINICS_LOCAL_STORAGE_KEY = 'clinics';
const THERAPISTS_LOCAL_STORAGE_KEY = 'therapists';
const PATIENTS_LOCAL_STORAGE_KEY = 'patients';

export class LocalStorageService {
  public getClinics(): string {
    return localStorage.getItem(CLINICS_LOCAL_STORAGE_KEY);
  }

  public getTherapists(): string {
    return localStorage.getItem(THERAPISTS_LOCAL_STORAGE_KEY);
  }

  public getPatients(): string {
    return localStorage.getItem(PATIENTS_LOCAL_STORAGE_KEY);
  }

  public storeClinics(clinics: string): void {
    localStorage.setItem(CLINICS_LOCAL_STORAGE_KEY, clinics);
  }

  public storeTherapists(therapists: string): void {
    localStorage.setItem(THERAPISTS_LOCAL_STORAGE_KEY, therapists);
  }

  public storePatients(patients: string): void {
    localStorage.setItem(PATIENTS_LOCAL_STORAGE_KEY, patients);
  }
}
