import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientDTO } from '../models/patient.dto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8080/api/patients'; // replace with your backend API URL

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPatientNumber(): Observable<any[]> {
    const url = `${this.apiUrl}/number`;
    return this.http.get<any[]>(url);
  }

  getPatientAddedPerMonth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PerMonth`);
  }

  createPatient(patient: PatientDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, patient);
  }

  updatePatient(id: number, patient: PatientDTO): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, patient);
  }

  deletePatient(patientId: number): Observable<void> {
    const url = `${this.apiUrl}/${patientId}`;
    return this.http.delete<void>(url);
  }
}
