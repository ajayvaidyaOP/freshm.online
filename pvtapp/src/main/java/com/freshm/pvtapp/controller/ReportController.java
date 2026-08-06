// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.freshm.pvtapp.controller;

import com.freshm.pvtapp.dto.ReportSummaryResponse;
import com.freshm.pvtapp.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/reports"})
public class ReportController {
   private final ReportService reportService;

   public ReportController(ReportService reportService) {
      this.reportService = reportService;
   }

   @GetMapping({"/summary"})
   public ResponseEntity<ReportSummaryResponse> getSummary() {
      return ResponseEntity.ok(this.reportService.getReportSummary());
   }
}