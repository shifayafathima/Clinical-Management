package com.project.mydoctorproject.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.mydoctorproject.model.Doctor;

public interface DoctorRepo extends JpaRepository<Doctor,String>{
    Doctor findByEmail(String email);
  
    
}
