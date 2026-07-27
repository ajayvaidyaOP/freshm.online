package com.freshm.pvtapp.controller;

import com.freshm.pvtapp.dto.LetterHeadRequest;
import com.freshm.pvtapp.dto.LetterHeadResponse;
import com.freshm.pvtapp.service.LetterHeadService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/letter-head")
@CrossOrigin(origins = "*")
public class LetterHeadController {

    private final LetterHeadService letterHeadService;

    public LetterHeadController(LetterHeadService letterHeadService) {
        this.letterHeadService = letterHeadService;
    }

    @PostMapping
    public ResponseEntity<LetterHeadResponse> createLetterHead(
            @RequestBody LetterHeadRequest request) {

        return ResponseEntity.ok(
                letterHeadService.createLetterHead(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<LetterHeadResponse>> getAllLetterHeads() {

        return ResponseEntity.ok(
                letterHeadService.getAllLetterHeads()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<LetterHeadResponse> getLetterHeadById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                letterHeadService.getLetterHeadById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<LetterHeadResponse> updateLetterHead(
            @PathVariable Long id,
            @RequestBody LetterHeadRequest request) {

        return ResponseEntity.ok(
                letterHeadService.updateLetterHead(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLetterHead(
            @PathVariable Long id) {

        letterHeadService.deleteLetterHead(id);

        return ResponseEntity.ok("Letter Head deleted successfully");
    }
}