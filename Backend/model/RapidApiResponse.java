package com.dealshub.backend.model;

import java.util.List;

public class RapidApiResponse {
    private List<RapidProduct> products;

    public List<RapidProduct> getProducts() {
        return products;
    }

    public void setProducts(List<RapidProduct> products) {
        this.products = products;
    }
}
