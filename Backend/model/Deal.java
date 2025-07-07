package com.dealshub.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "deals")
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category")
    private String category;

    private String dealId;
    private String dealType;
    private String dealTitle;
    private String dealPhoto;
    private String dealState;
    private String dealUrl;
    private String canonicalDealUrl;
    private String dealStartsAt;
    private String dealEndsAt;

    private double dealPriceAmount;
    private String dealPriceCurrency;

    private double listPriceAmount;
    private String listPriceCurrency;

    private int savingsPercentage;
    private double savingsAmount;
    private String savingsCurrency;

    private String dealBadge;
    private String productAsin;

    public Deal() {}

    // Getters and Setters (all manually written)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDealId() { return dealId; }
    public void setDealId(String dealId) { this.dealId = dealId; }

    public String getDealType() { return dealType; }
    public void setDealType(String dealType) { this.dealType = dealType; }

    public String getDealTitle() { return dealTitle; }
    public void setDealTitle(String dealTitle) { this.dealTitle = dealTitle; }

    public String getDealPhoto() { return dealPhoto; }
    public void setDealPhoto(String dealPhoto) { this.dealPhoto = dealPhoto; }

    public String getDealState() { return dealState; }
    public void setDealState(String dealState) { this.dealState = dealState; }

    public String getDealUrl() { return dealUrl; }
    public void setDealUrl(String dealUrl) { this.dealUrl = dealUrl; }

    public String getCanonicalDealUrl() { return canonicalDealUrl; }
    public void setCanonicalDealUrl(String canonicalDealUrl) { this.canonicalDealUrl = canonicalDealUrl; }

    public String getDealStartsAt() { return dealStartsAt; }
    public void setDealStartsAt(String dealStartsAt) { this.dealStartsAt = dealStartsAt; }

    public String getDealEndsAt() { return dealEndsAt; }
    public void setDealEndsAt(String dealEndsAt) { this.dealEndsAt = dealEndsAt; }

    public double getDealPriceAmount() { return dealPriceAmount; }
    public void setDealPriceAmount(double dealPriceAmount) { this.dealPriceAmount = dealPriceAmount; }

    public String getDealPriceCurrency() { return dealPriceCurrency; }
    public void setDealPriceCurrency(String dealPriceCurrency) { this.dealPriceCurrency = dealPriceCurrency; }

    public double getListPriceAmount() { return listPriceAmount; }
    public void setListPriceAmount(double listPriceAmount) { this.listPriceAmount = listPriceAmount; }

    public String getListPriceCurrency() { return listPriceCurrency; }
    public void setListPriceCurrency(String listPriceCurrency) { this.listPriceCurrency = listPriceCurrency; }

    public int getSavingsPercentage() { return savingsPercentage; }
    public void setSavingsPercentage(int savingsPercentage) { this.savingsPercentage = savingsPercentage; }

    public double getSavingsAmount() { return savingsAmount; }
    public void setSavingsAmount(double savingsAmount) { this.savingsAmount = savingsAmount; }

    public String getSavingsCurrency() { return savingsCurrency; }
    public void setSavingsCurrency(String savingsCurrency) { this.savingsCurrency = savingsCurrency; }

    public String getDealBadge() { return dealBadge; }
    public void setDealBadge(String dealBadge) { this.dealBadge = dealBadge; }

    public String getProductAsin() { return productAsin; }
    public void setProductAsin(String productAsin) { this.productAsin = productAsin; }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
