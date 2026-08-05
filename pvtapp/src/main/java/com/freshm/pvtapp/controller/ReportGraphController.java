// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.freshm.pvtapp.controller;

import com.freshm.pvtapp.dto.ReportGraphResponse;
import com.freshm.pvtapp.service.ReportGraphService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/reports"})
public class ReportGraphController {
   private final ReportGraphService reportGraphService;

   public ReportGraphController(ReportGraphService reportGraphService) {
      this.reportGraphService = reportGraphService;
   }

   @GetMapping({"/graph"})
   public ResponseEntity<ReportGraphResponse> getCurrentMonthGraph() {
      return ResponseEntity.ok(this.reportGraphService.getCurrentMonthGraph());
   }
}