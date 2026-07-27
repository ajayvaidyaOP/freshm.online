package com.freshm.pvtapp.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {


    private Long purchaseId;


    private Double amount;


    private String paymentMode;


    private String transactionNumber;


    private LocalDate paymentDate;


    private String remarks;

}