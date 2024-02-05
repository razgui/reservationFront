import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { MessageService } from 'primeng/api';
import { PatientDTO } from '../models/patient.dto';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  newPatient: PatientDTO = {} as PatientDTO; // Initialize an empty patient object
  constructor(private patientService: PatientService,
    private messageService: MessageService) {}

  ngOnInit(): void {
  }

  saveNewPatient(): void {
    this.patientService.createPatient(this.newPatient).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient added successfully' });
        this.cancelAddPatientDialog();
      },
      (error) => {
        console.error('Error adding patient:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add patient' });
      }
    );
  }

  cancelAddPatientDialog(): void {
    this.newPatient = {} as PatientDTO;
  }

}
