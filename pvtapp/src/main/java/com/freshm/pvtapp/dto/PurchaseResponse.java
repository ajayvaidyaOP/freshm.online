package com.freshm.pvtapp.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseResponse {


    private Long id;


    private String purchaseNumber;


    private LocalDate purchaseDate;


    private String vendorName;


    private String farmerName;


    private Double totalQuantity;


    private Double totalAmount;


    private String paymentStatus;


    private List<PurchaseItemResponse> items;

}