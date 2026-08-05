package com.freshm.pvtapp.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.freshm.pvtapp.dto.ReportGraphResponse;
import com.freshm.pvtapp.entity.Company;
import com.freshm.pvtapp.repository.PaymentRepository;
import com.freshm.pvtapp.repository.PurchaseRepository;
import com.freshm.pvtapp.security.SecurityUtil;

@Service
public class ReportGraphServiceImpl implements ReportGraphService {

    private final PurchaseRepository purchaseRepository;
    private final PaymentRepository paymentRepository;
    private final SecurityUtil securityUtil;

    public ReportGraphServiceImpl(
            PurchaseRepository purchaseRepository,
            PaymentRepository paymentRepository,
            SecurityUtil securityUtil) {

        this.purchaseRepository = purchaseRepository;
        this.paymentRepository = paymentRepository;
        this.securityUtil = securityUtil;
    }

    @Override
    public ReportGraphResponse getCurrentMonthGraph() {

        Company company = securityUtil.getCurrentCompany();

        Double purchase =
                purchaseRepository.getTotalPurchase(company.getId());

        Double payment =
                paymentRepository.getTotalPayment(company.getId());

        Double hamali =
                purchaseRepository.getTotalHamali(company.getId());

        Double commission =
                purchaseRepository.getTotalCommission(company.getId());

        Double transport =
                purchaseRepository.getTotalTransportAdvance(company.getId());

        ReportGraphResponse response = new ReportGraphResponse();

        response.setMonth(LocalDate.now().getMonth().name());

        response.setPurchase(purchase != null ? purchase : 0.0);
        response.setPayment(payment != null ? payment : 0.0);
        response.setPending((purchase != null ? purchase : 0.0) - (payment != null ? payment : 0.0));
        response.setHamali(hamali != null ? hamali : 0.0);
        response.setCommission(commission != null ? commission : 0.0);
        response.setTransport(transport != null ? transport : 0.0);

        return response;
    }
}