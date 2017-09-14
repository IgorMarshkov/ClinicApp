const CLINICS_LOCAL_STORAGE_KEY = 'clinics';

export class LocalStorageService {
  public getClinics(): string {
    return localStorage.getItem(CLINICS_LOCAL_STORAGE_KEY);
  }

  public storeClinics(clinics: string): void {
    localStorage.setItem(CLINICS_LOCAL_STORAGE_KEY, clinics);
  }
}
