package com.freshm.pvtapp.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequest {


    private Long vendorId;


    private Long farmerId;


    private List<PurchaseItemRequest> items;


    private String remarks;

}