package com.dealshub.backend.controller;

import com.dealshub.backend.model.Deal;

import com.dealshub.backend.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/deals")
@CrossOrigin(origins = "http://localhost:3000")

public class DealController {

    @Autowired
    private DealService dealService;

    @GetMapping
    public List<Deal> getAllDeals() {
        return dealService.getAllDealsFromDB(); // get sorted list
    }

    @GetMapping("/fetch")
    public List<Deal> fetchAndSaveDeals() {
        return dealService.fetchDealsFromApi(); // fetch and save new ones
    }

    @GetMapping("/search")
    public List<Deal> searchDeals(@RequestParam String query) {
        return dealService.searchDeals(query);
    }

    @DeleteMapping("/expired")
    public ResponseEntity<String> removeExpiredDeals() {
        dealService.deleteExpiredDeals();
        return ResponseEntity.ok("Expired/closed deals removed.");
    }


}
