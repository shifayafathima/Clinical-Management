package com.project.mydoctorproject.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.mydoctorproject.model.Appointment;
import com.project.mydoctorproject.model.Patient;
import com.project.mydoctorproject.repo.AppointmentRepo;
import com.project.mydoctorproject.service.AppointmentService;

@RestController
public class AppointmentController {

    private final AppointmentRepo appointmentRepo;
    
    @Autowired
    private AppointmentService appointmentService;

    AppointmentController(AppointmentRepo appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }

    @PostMapping("/saveAppointment")
    public Appointment saveAppointment(@RequestBody Appointment appointment) {
        
        return appointmentService.saveAppointment(appointment);
    }

    @GetMapping("getAppointmentById/{id}")
    public Appointment getAppointmentById(@PathVariable int id) {
        return appointmentService.getAppointmentById(id);
    }
    @GetMapping("/getallAppointment")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PutMapping("updateAppointment/{id}")
    public Appointment updateAppointment(@PathVariable int id, @RequestBody Appointment update){
        return appointmentService.updateAppointment(id,update);
    }

    @DeleteMapping("deleteAppointment/{id}")
    public String deletAppointment(@PathVariable int id){
        return appointmentService.deleteAppointment(id);
    }
    
}
