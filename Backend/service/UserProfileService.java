package com.dealshub.backend.service;

import com.dealshub.backend.model.UserProfile;
import com.dealshub.backend.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository profileRepository;

    public UserProfile createProfile(UserProfile profile) {
        return profileRepository.save(profile);
    }

    public Optional<UserProfile> getProfileByEmail(String email) {
        return profileRepository.findByEmail(email);
    }

    public UserProfile updateProfile(String email, UserProfile updatedProfile) {
        Optional<UserProfile> optionalProfile = profileRepository.findByEmail(email);
        if (optionalProfile.isPresent()) {
            UserProfile existing = optionalProfile.get();

            existing.setFirstName(updatedProfile.getFirstName());
            existing.setLastName(updatedProfile.getLastName());
            existing.setUsername(updatedProfile.getUsername());
            existing.setProfilePicture(updatedProfile.getProfilePicture());
            existing.setFavoriteCategories(updatedProfile.getFavoriteCategories());
            existing.setPriceRange(updatedProfile.getPriceRange());
            existing.setEmailNotifications(updatedProfile.isEmailNotifications());
            existing.setBrowserNotifications(updatedProfile.isBrowserNotifications());
            existing.setSmsAlerts(updatedProfile.isSmsAlerts());
            existing.setDarkMode(updatedProfile.isDarkMode());

            return profileRepository.save(existing);
        } else {
            throw new RuntimeException("Profile not found for email: " + email);
        }
    }
}
