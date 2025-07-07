package com.dealshub.backend.controller;

import com.dealshub.backend.model.User;
import com.dealshub.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            System.out.println("Received user: " + user);

            if (user.getEmail() == null || user.getEmail().isEmpty() ||
                    user.getPassword() == null || user.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("Email and password must not be empty.");
            }

            if (user.getName() == null || user.getName().isEmpty()) {
                return ResponseEntity.badRequest().body("Name is required");
            }

            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.status(409).body("User already exists!");
            }

            userRepository.save(user);
            return ResponseEntity.ok("Registration successful!");
        } catch (Exception e) {
            e.printStackTrace();  // check console
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent()) {
            User dbUser = optionalUser.get();
            if (dbUser.getPassword().equals(user.getPassword())) {
                return ResponseEntity.ok("Login successful!");
            } else {
                return ResponseEntity.ok("Invalid credentials!");
            }
        } else {
            return ResponseEntity.ok("User not found!");
        }
    }



}
