package com.project.mydoctorproject.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.mydoctorproject.model.Review;

public interface ReviewRepo extends JpaRepository<Review,Integer> {

    

    
}
