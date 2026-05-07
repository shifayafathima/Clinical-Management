package com.project.mydoctorproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mydoctorproject.model.Doctor;
import com.project.mydoctorproject.repo.DoctorRepo;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepo doctorRepo;

    public boolean login(String email, String password) {
        Doctor doc = doctorRepo.findByEmail(email);
        if (doc == null) return false;
        return doc.getPassword().equals(password);
    }
}
