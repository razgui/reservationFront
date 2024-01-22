import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { PatientDTO } from '../models/patient.dto';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PatientComponent implements OnInit {
  patients: any[] = [];
  displayAddDialog = false;
  displayEditDialog = false;
  newPatient: PatientDTO = {} as PatientDTO; // Initialize an empty patient object
  selectedPatient: any;
  filterText: string = '';
  @ViewChild('patientForm') patientForm!: NgForm;

  constructor(private patientService: PatientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe((data: any[]) => {
      // Apply filter if filterText is provided
      this.patients = this.filterText ? this.filterPatients(data) : data;
    });
  }

  onFilterChange(event: any): void {
    this.filterText = event.target.value;
    this.loadPatients(); // Trigger the method manually
  }

  filterPatients(data: any[]): any[] {

    const filteredData = data.filter(patient =>
      patient.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(this.filterText.toLowerCase()) ||
      patient.mail.toLowerCase().includes(this.filterText.toLowerCase()) ||
      patient.telephone.toLowerCase().includes(this.filterText.toLowerCase())
    );

    return filteredData;
  }

  showAddPatientDialog(): void {
    this.displayAddDialog = true;
  }

  showEditPatientDialog(patient: any): void {
    this.selectedPatient = { ...patient }; // Copy the selected patient to avoid two-way binding issues
    this.displayEditDialog = true;
  }

  cancelAddPatientDialog(): void {
    this.displayAddDialog = false;
    // reset the newPatient object
    this.newPatient = {} as PatientDTO;
  }

  cancelEditPatientDialog(): void {
    this.displayEditDialog = false;
    // reset the selectedPatient object
    this.selectedPatient = null;
  }

  saveNewPatient(): void {
    this.patientService.createPatient(this.newPatient).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient added successfully' });
        this.loadPatients();
        this.cancelAddPatientDialog();
      },
      (error) => {
        console.error('Error adding patient:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add patient' });
      }
    );
  }

  editPatient(patient: any): void {
    this.selectedPatient = { ...patient }; // Create a copy of the patient to avoid modifying the original
    this.displayEditDialog = true;
  }


  updatePatient(): void {
    if (this.selectedPatient.id !== undefined) {
      this.patientService.updatePatient(this.selectedPatient.id, this.selectedPatient).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient updated successfully' });
          this.loadPatients();
          this.cancelEditPatientDialog();
        },
        (error) => {
          console.error('Error updating patient:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update patient' });
        }
      );
    } else {
      console.error('Attempted to update a patient with undefined ID.');
    }
  }


  deletePatient(patientId: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this patient?',
      accept: () => {
        this.patientService.deletePatient(patientId).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient deleted successfully' });
            this.loadPatients();
          },
          (error) => {
            console.error('Error deleting patient:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete patient' });
          }
        );
      },
      reject: () => {
        // User rejected the confirmation
      }
    });
  }
}
