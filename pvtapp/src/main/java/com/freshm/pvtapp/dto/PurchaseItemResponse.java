package com.freshm.pvtapp.dto;

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
public class PurchaseItemResponse {


    private String productName;


    private Double quantity;


    private Double rate;


    private Double amount;

}
