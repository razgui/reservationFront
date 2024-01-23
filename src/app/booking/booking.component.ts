import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { PatientDTO } from '../models/patient.dto';
import { PatientService } from '../services/patient.service';
import { ReservationDTO } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  displayAddEvent: boolean = false;
  calendarVisible = false;
  bookingDescription: string | undefined;
  terrainList: any[] = [];
  calendarOptions: CalendarOptions | undefined;
  currentEvents: EventApi[] = [];
  patientList: PatientDTO[] = []
  dateInformation: DateSelectArg | undefined;
  reservations: any[] = [];
  reservationForm: FormGroup | undefined;
  thumbnail: any;
  currentUser: any;
  eventList: EventInput[] = [];
  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private patientService: PatientService,
    private reservationService: ReservationService,
  ) {
    this.loadReservations();
    this.createForm();
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next',
        center: 'today',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },

      initialView: 'dayGridMonth',
      initialEvents: this.eventList,
      // eventColor : this.getRandomColor(),
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),

    };
  }
  ngOnInit(): void {
    this.patientService.getPatients().subscribe(res => {
      this.patientList = res
      console.log(this.patientList)
    })

  }

  private createForm() {
    this.reservationForm = this.formBuilder.group({
      id: [null],
      date: [null, Validators.required],
      description: [''],
      patient: [null]
    });
  }

  private loadReservations() {

    this.reservationService.getAllReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.reservations.forEach((res: ReservationDTO) => {
          this.eventList.push({
            id: res?.id?.toString() || '',
            title: res?.description || "",
            start: this.formatDate(res?.date) || new Date(),
            end: this.formatDate(res?.date) || new Date(),
            color: this.getRandomColor(),
          });

        });

      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
          life: 3000,
        });
      },
      complete: () => {
        console.log("eventList", this.eventList)
        this.calendarVisible = true
      },
    });
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    if (calendarOptions) {
      calendarOptions.weekends = !calendarOptions.weekends;
    }
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  saveEvent() {
    let selectInfo = this.dateInformation;
    let title = this.reservationForm?.value.description;
    const calendarApi = selectInfo?.view.calendar;
    calendarApi?.unselect(); // clear date selection
    this.reservationForm!.value.date = selectInfo?.start;
    this.reservationForm!.value.date = selectInfo?.end;
    // this.reservationForm!.value.id = this.currentUser.id;
    // this.reservationForm!.value.userId = this.currentUser.idUser;
    if (this.reservationForm!.value.patient != undefined) {
      this.reservationForm!.value.patient =
        this.reservationForm!.value.patient.id
    }

    const reservation: ReservationDTO = this.reservationForm!.value;
    this.reservationService.createReservation(reservation).subscribe(
      (createdIdReservation) => {
        console.log('Reservation created with ID:', createdIdReservation);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Reservation saved successfully',
          life: 3000,
        });
        // Reset the form after successful submission
        if (title) {
          calendarApi?.addEvent({
            id: createEventId(),
            title,
            start: selectInfo?.startStr,
            end: selectInfo?.endStr,
            allDay: selectInfo?.allDay,
            color: this.getRandomColor(),
          });
        }
        this.bookingDescription = undefined;
        this.displayAddEvent = false;
        this.reservationForm?.reset();
      },
      (error) => {
        console.error('Error creating reservation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
          life: 3000,
        });
      }
    );
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    this.dateInformation = selectInfo;
    this.displayAddEvent = true;
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event._def.publicId)
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      this.reservationService.deleteReservation(parseInt(clickInfo.event._def.publicId)).subscribe(res=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Reservation deleted successfully',
          life: 3000,
        });
      },(error : any) => {
        console.error('Error creating reservation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
          life: 3000,
        });
      })
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  resetDescription() {
    this.reservationForm?.reset()
  }
}