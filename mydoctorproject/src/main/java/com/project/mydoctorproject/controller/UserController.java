package com.project.mydoctorproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.mydoctorproject.jwt.JwtUtil;
import com.project.mydoctorproject.model.Doctor;
import com.project.mydoctorproject.repo.DoctorRepo;

@RestController
public class UserController {
    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Doctor doctor) {

        // Fetch doctor from DB by email
        Doctor docFromDB = doctorRepo.findByEmail(doctor.getEmail());

        // Validate password
        if (docFromDB == null || !docFromDB.getPassword().equals(doctor.getPassword())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(docFromDB.getEmail());
        return ResponseEntity.ok(token);
    }
}



