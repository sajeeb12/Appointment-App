import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule,DatePipe,],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit{
  ngOnInit(): void {

    let saveAppointment = localStorage.getItem("appointments");
    this.appointments = saveAppointment ? JSON.parse(saveAppointment) : [];
  }
  newAppointmentTitle:string = '';
  newAppointmentDate:Date = new Date();
  appointments: Appointment[] = [];

  addAppointment(){
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment:Appointment = {
        id:Date.now(),
        title:this.newAppointmentTitle,
        date:this.newAppointmentDate
      }
      this.appointments.push(newAppointment);
      this.newAppointmentDate = new Date();
      this.newAppointmentTitle = '';

      localStorage.setItem("appointments",JSON.stringify(this.appointments))
    }
    
  }

  deleteAppointment(index:number){
    this.appointments.splice(index,1);
    localStorage.setItem("appointments",JSON.stringify(this.appointments))
  }
}
