
package com.dealshub.backend.service;

import com.dealshub.backend.model.Deal;
import com.dealshub.backend.repository.DealRepository;
import com.dealshub.backend.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
        import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.*;
        import java.util.stream.Collectors;

@Service
public class DealService {
//Fill it from Rapid API or any other api
    private static final String API_URL = "";
    private static final String API_KEY = "";
    private static final String API_HOST = "";

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    public List<Deal> fetchDealsFromApi() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", API_KEY);
        headers.set("X-RapidAPI-Host", API_HOST);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(API_URL, HttpMethod.GET, entity, Map.class);

        Map<String, Object> body = response.getBody();
        if (body == null || !body.containsKey("data")) {
            return dealRepository.findAll(); // fallback to DB
        }

        Map<String, Object> data = (Map<String, Object>) body.get("data");
        List<Map<String, Object>> dealsRaw = (List<Map<String, Object>>) data.get("deals");

        List<Deal> newDeals = new ArrayList<>();
        List<Deal> existingDeals = dealRepository.findAll();

        Set<String> existingDealIds = existingDeals.stream()
                .map(Deal::getDealId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        for (Map<String, Object> dealMap : dealsRaw) {
            String dealId = (String) dealMap.getOrDefault("deal_id", "");
            String dealTitle = (String) dealMap.getOrDefault("deal_title", "");
            String dealUrl = (String) dealMap.getOrDefault("deal_url", "");

            if (dealId == null || dealId.isEmpty() ||
                    dealTitle == null || dealTitle.isEmpty() ||
                    dealUrl == null || dealUrl.isEmpty() ||
                    existingDealIds.contains(dealId)) {
                continue;
            }


            Deal deal = new Deal();
            deal.setDealId(dealId);
            deal.setDealType((String) dealMap.getOrDefault("deal_type", ""));
            deal.setDealTitle(dealTitle);
            deal.setDealPhoto((String) dealMap.getOrDefault("deal_photo", ""));
            deal.setDealState((String) dealMap.getOrDefault("deal_state", ""));
            deal.setDealUrl(dealUrl);
            deal.setCanonicalDealUrl((String) dealMap.getOrDefault("canonical_deal_url", ""));
            deal.setDealStartsAt((String) dealMap.getOrDefault("deal_starts_at", ""));
            deal.setDealEndsAt((String) dealMap.getOrDefault("deal_ends_at", ""));

            Map<String, Object> dealPrice = (Map<String, Object>) dealMap.get("deal_price");
            if (dealPrice != null) {
                Object amount = dealPrice.get("amount");
                Object currency = dealPrice.get("currency");
                deal.setDealPriceAmount(amount != null ? Double.parseDouble(amount.toString()) : 0.0);
                deal.setDealPriceCurrency(currency != null ? currency.toString() : "INR");
            } else {
                deal.setDealPriceAmount(0.0);
                deal.setDealPriceCurrency("INR");
            }

            Map<String, Object> listPrice = (Map<String, Object>) dealMap.get("list_price");
            if (listPrice != null) {
                Object amount = listPrice.get("amount");
                Object currency = listPrice.get("currency");
                deal.setListPriceAmount(amount != null ? Double.parseDouble(amount.toString()) : 0.0);
                deal.setListPriceCurrency(currency != null ? currency.toString() : "INR");
            } else {
                deal.setListPriceAmount(0.0);
                deal.setListPriceCurrency("INR");
            }

            Object savingsPercent = dealMap.get("savings_percentage");
            deal.setSavingsPercentage(savingsPercent != null ? Integer.parseInt(savingsPercent.toString()) : 0);

            Map<String, Object> savingsAmount = (Map<String, Object>) dealMap.get("savings_amount");
            if (savingsAmount != null) {
                Object amount = savingsAmount.get("amount");
                Object currency = savingsAmount.get("currency");
                deal.setSavingsAmount(amount != null ? Double.parseDouble(amount.toString()) : 0.0);
                deal.setSavingsCurrency(currency != null ? currency.toString() : "INR");
            } else {
                deal.setSavingsAmount(0.0);
                deal.setSavingsCurrency("INR");
            }

            deal.setDealBadge((String) dealMap.getOrDefault("deal_badge", ""));
            deal.setProductAsin((String) dealMap.getOrDefault("product_asin", ""));

            newDeals.add(deal);
        }

        if (!newDeals.isEmpty()) {
            dealRepository.saveAll(newDeals);
        }

        List<Deal> allDeals = new ArrayList<>(newDeals);
        allDeals.addAll(existingDeals);
        Collections.shuffle(allDeals);
        return allDeals;
    }

    public List<Deal> searchDeals(String keyword) {
        return dealRepository.searchDeals(keyword);
    }

    public List<Deal> getAllDealsFromDB() {
        List<Deal> allDeals = dealRepository.findAll();
        Collections.shuffle(allDeals);
        return allDeals;
    }

    public void deleteExpiredDeals() {
        List<Deal> allDeals = dealRepository.findAll();

        List<Deal> expiredDeals = allDeals.stream()
                .filter(this::isDealExpired)
                .toList();

        dealRepository.deleteAll(expiredDeals);
    }

    @Scheduled(fixedRate = 45 * 60 * 1000)
    public void autoFetchDeals() {
        System.out.println("⏰ Auto-fetching deals...");
        fetchDealsFromApi();
    }

    private boolean isDealExpired(Deal deal) {
        try {
            String endDateStr = deal.getDealEndsAt();
            if (endDateStr != null && !endDateStr.isEmpty()) {
                ZonedDateTime endDate = ZonedDateTime.parse(endDateStr);
                if (endDate.isBefore(ZonedDateTime.now())) {
                    return true;
                }
            }

            if (deal.getDealPriceAmount() >= deal.getListPriceAmount()) {
                return true;
            }
        } catch (Exception e) {
            System.err.println("Failed to parse deal end date for dealId: " + deal.getDealId());
        }

        return false;
    }
}

