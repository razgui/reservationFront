import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { SoinDTO } from '../models/soin';
import { SoinService } from '../services/soin.service';

@Component({
  selector: 'app-soins',
  templateUrl: './soins.component.html',
  styleUrls: ['./soins.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SoinsComponent implements OnInit {
  soins: any[] = [];
  displayAddDialog = false;
  displayEditDialog = false;
  newSoin: SoinDTO = {} as SoinDTO; // Initialize an empty soin object
  selectedSoin: any;
  filterText: string = '';
  @ViewChild('soinForm') soinForm!: NgForm;

  constructor(private soinService: SoinService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
      this.loadSoins();
    }

    loadSoins(): void {
      this.soinService.getSoins().subscribe((data: any[]) => {
        // Apply filter if filterText is provided
        this.soins = this.filterText ? this.filterSoins(data) : data;
      });
    }

    onFilterChange(event: any): void {
      this.filterText = event.target.value;
      this.loadSoins(); // Trigger the method manually
    }

    filterSoins(data: any[]): any[] {

      const filteredData = data.filter(soin =>
        soin.id.toLowerCase().includes(this.filterText.toLowerCase()) ||
        soin.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
        soin.price.toLowerCase().includes(this.filterText.toLowerCase()) ||
        soin.description.toLowerCase().includes(this.filterText.toLowerCase())
      );

      return filteredData;
    }

    showAddSoinDialog(): void {
      this.displayAddDialog = true;
    }

    showEditSoinDialog(soin: any): void {
      this.selectedSoin = { ...soin }; // Copy the selected soin to avoid two-way binding issues
      this.displayEditDialog = true;
    }

    cancelAddSoinDialog(): void {
      this.displayAddDialog = false;
      // reset the newSoin object
      this.newSoin = {} as SoinDTO;
    }

    cancelEditSoinDialog(): void {
      this.displayEditDialog = false;
      // reset the selectedSoin object
      this.selectedSoin = null;
    }

    saveNewSoin(): void {
      this.soinService.createSoin(this.newSoin).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Soin added successfully' });
          this.loadSoins();
          this.cancelAddSoinDialog();
        },
        (error) => {
          console.error('Error adding soin:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add soin' });
        }
      );
    }

    editSoin(soin: any): void {
      this.selectedSoin = { ...soin }; // Create a copy of the soin to avoid modifying the original
      this.displayEditDialog = true;
    }

    updateSoin(): void {
      if (this.selectedSoin.id !== undefined) {
        this.soinService.updateSoin(this.selectedSoin.id, this.selectedSoin).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Soin updated successfully' });
            this.loadSoins();
            this.cancelEditSoinDialog();
          },
          (error) => {
            console.error('Error updating soin:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update soin' });
          }
        );
      } else {
        console.error('Attempted to update a soin with undefined ID.');
      }
    }


    deleteSoin(soinId: number): void {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this soin?',
        accept: () => {
          this.soinService.deleteSoin(soinId).subscribe(
            () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Soin deleted successfully' });
              this.loadSoins();
            },
            (error) => {
              console.error('Error deleting soin:', error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete soin' });
            }
          );
        },
        reject: () => {
          // User rejected the confirmation
        }
      });
    }

}
