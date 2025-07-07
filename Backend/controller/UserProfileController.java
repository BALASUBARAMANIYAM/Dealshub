package com.dealshub.backend.controller;

import com.dealshub.backend.model.UserProfile;
import com.dealshub.backend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000") // adjust for your frontend
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @PostMapping("/create")
    public UserProfile createProfile(@RequestBody UserProfile profile) {
        return userProfileService.createProfile(profile);
    }

    @GetMapping("/{email}")
    public UserProfile getProfileByEmail(@PathVariable String email) {
        Optional<UserProfile> profile = userProfileService.getProfileByEmail(email);
        return profile.orElse(null);
    }

    @PutMapping("/update/{email}")
    public UserProfile updateProfile(@PathVariable String email, @RequestBody UserProfile updatedProfile) {
        return userProfileService.updateProfile(email, updatedProfile);
    }
}
