package com.project.mydoctorproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mydoctorproject.model.Review;
import com.project.mydoctorproject.repo.ReviewRepo;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;

    public List<Review> getallReviews() {
        return reviewRepo.findAll();
    }

    public Review saveReview(Review review) {
        return reviewRepo.save(review);
    }

    public Review getReviewById(int id) {
        return reviewRepo.findById(id).orElse(null);
    }

    public Review updateReview(int id, Review newData) {
        return reviewRepo.findById(id).map(r -> {
            r.setName(newData.getName());
            r.setPhonenumber(newData.getPhonenumber());
            r.setReview(newData.getReview());
            r.setRating(newData.getRating());
            return reviewRepo.save(r);
        }).orElse(null);
    }

    public String deleteReview(int id) {
        if (reviewRepo.existsById(id)) {
            reviewRepo.deleteById(id);
            return "Review Deleted successfully";
        } else {
            return "Review ID not found";
        }
    }
}
