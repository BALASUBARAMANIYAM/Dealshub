package com.dealshub.backend.controller;

import com.dealshub.backend.model.Feedback;
import com.dealshub.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<String> submitFeedback(@RequestBody Feedback feedback) {
        if (feedback.getEmail() == null || feedback.getEmail().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Please login to submit feedback.");
        }

        if (feedback.getMessage() == null || feedback.getMessage().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Feedback message cannot be empty.");
        }

        feedbackService.saveFeedback(feedback);
        return ResponseEntity.ok("✅ Feedback submitted");
    }
}
