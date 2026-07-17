package com.freshm.pvtapp.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseItemRequest {


    @NotNull
    private Long productId;


    @NotNull
    private Double quantity;


    @NotNull
    private Double rate;


    private String remarks;

}