package com.freshm.pvtapp.service;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.ReportGraphResponse;
import com.freshm.pvtapp.dto.ReportSummaryResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.repository.PaymentRepository;
import com.freshm.pvtapp.repository.PurchaseRepository;
import com.freshm.pvtapp.security.SecurityUtil;

@Service
public class ReportServiceImpl implements ReportService {

    private final PurchaseRepository purchaseRepository;
    private final PaymentRepository paymentRepository;
    private final SecurityUtil securityUtil;

    public ReportServiceImpl(
            PurchaseRepository purchaseRepository,
            PaymentRepository paymentRepository,
            SecurityUtil securityUtil) {

        this.purchaseRepository = purchaseRepository;
        this.paymentRepository = paymentRepository;
        this.securityUtil = securityUtil;
    }

    @Override
    public ReportSummaryResponse getReportSummary() {

        Company company = securityUtil.getCurrentCompany();

        Double totalPurchase =
                purchaseRepository.getTotalPurchase(company.getId());

        Double totalPayment =
                paymentRepository.getTotalPayment(company.getId());

        Double hamali =
                purchaseRepository.getTotalHamali(company.getId());

        Double commission =
                purchaseRepository.getTotalCommission(company.getId());

        Double transport =
                purchaseRepository.getTotalTransportAdvance(company.getId());

        Double pending = totalPurchase - totalPayment;

        ReportSummaryResponse response =
                new ReportSummaryResponse();

        response.setTotalPurchase(totalPurchase);
        response.setTotalPayment(totalPayment);
        response.setPendingAmount(pending);
        response.setHamali(hamali);
        response.setCommission(commission);
        response.setTransportAdvance(transport);

        return response;
    }
   
}