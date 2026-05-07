package com.project.mydoctorproject.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.mydoctorproject.model.Appointment;

public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {
}
