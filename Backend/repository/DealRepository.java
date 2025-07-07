package com.dealshub.backend.repository;

import com.dealshub.backend.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {

    @Query("SELECT d FROM Deal d WHERE " +
            "LOWER(d.dealTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.dealType) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.dealBadge) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.productAsin) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Deal> searchDeals(String keyword);
}
