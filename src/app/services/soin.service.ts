import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientDTO } from '../models/patient.dto';
import { SoinDTO } from '../models/soin';

@Injectable({
  providedIn: 'root'
})
export class SoinService {
  private apiUrl = 'http://localhost:8080/api/soins'; // replace with your backend API URL

  constructor(private http: HttpClient) {}

  getSoins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createSoin(soin: SoinDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, soin);
  }

  updateSoin(id: number, soin: SoinDTO): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, soin);
  }

  deleteSoin(soinId: number): Observable<void> {
    const url = `${this.apiUrl}/${soinId}`;
    return this.http.delete<void>(url);
  }
}
