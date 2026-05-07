package com.project.mydoctorproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mydoctorproject.model.Appointment;
import com.project.mydoctorproject.model.Patient;
import com.project.mydoctorproject.repo.AppointmentRepo;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepo appointmentRepo;

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepo.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    public Appointment getAppointmentById(int id) {
        return appointmentRepo.findById(id).orElse(null);
    }

    public Appointment updateAppointment(int id,Appointment newData){
        return appointmentRepo.findById(id).map(existing->{
            existing.setName(newData.getName());
            existing.setAge(newData.getAge());
            existing.setPhonenumber(newData.getPhonenumber());
            existing.setDisease(newData.getDisease());
            existing.setTime(newData.getTime());
            existing.setDate(newData.getDate());
            return appointmentRepo.save(existing);
        })
        .orElse(null);
    }

    public String deleteAppointment(int id){
        if(appointmentRepo.existsById(id)){
            appointmentRepo.deleteById(id);
            return "Apoointment deleted successfully";
        }else{
            return "Appointment IDnot found";
        }
    }
}
