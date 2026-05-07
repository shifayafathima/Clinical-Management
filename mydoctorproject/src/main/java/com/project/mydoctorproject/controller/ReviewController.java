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

import com.project.mydoctorproject.model.Review;
import com.project.mydoctorproject.repo.ReviewRepo;
import com.project.mydoctorproject.service.ReviewService;

@RestController
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("getallReviews")
    public List<Review> getallReviews() {
        return reviewService.getallReviews();
    }

    @PostMapping("saveReviews")
    public Review saveReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    @GetMapping("getReviewById/{id}")
    public Review getReviewById(@PathVariable int id) {
        return reviewService.getReviewById(id);
    }

    @PutMapping("updateReview/{id}")
    public Review update(@PathVariable int id, @RequestBody Review updateR) {
        return reviewService.updateReview(id, updateR);
    }

    @DeleteMapping("deleteReview/{id}")
    public String delete(@PathVariable int id) {
        return reviewService.deleteReview(id);
    }

}
