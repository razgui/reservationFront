import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDTO } from '../models/reservation.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = environment.apiUrl+"/reservations" 

  constructor(private httpClient: HttpClient) {}

  getAllReservations(): Observable<ReservationDTO[]> {
    return this.httpClient.get<ReservationDTO[]>(this.apiUrl);
  }

  getReservation(id: number): Observable<ReservationDTO> {
    return this.httpClient.get<ReservationDTO>(`${this.apiUrl}/${id}`);
  }

  createReservation(reservationDTO: ReservationDTO): Observable<number> {
    return this.httpClient.post<number>(this.apiUrl, reservationDTO);
  }

  updateReservation(id: number, reservationDTO: ReservationDTO): Observable<number> {
    return this.httpClient.put<number>(`${this.apiUrl}/${id}`, reservationDTO);
  }

  deleteReservation(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
