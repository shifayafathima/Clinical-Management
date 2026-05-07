package com.project.mydoctorproject.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.mydoctorproject.model.Patient;

public interface PatientRepo extends JpaRepository<Patient,Integer> {

    

    
}
