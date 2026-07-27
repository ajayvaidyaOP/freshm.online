package com.freshm.pvtapp.dto;

import java.time.LocalDate;

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
public class PaymentResponse {


    private Long id;


    private Double amount;


    private String paymentMode;


    private String transactionNumber;


    private LocalDate paymentDate;

}