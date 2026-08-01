package com.freshm.pvtapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

/**
 * One "karat" line entered on the machine, e.g. 2 crates = 84 kg.
 * Stored inline on a receipt/return via @ElementCollection.
 */
@Embeddable
public class CrateLine {

    @Column(name = "crate_count")
    private Double crateCount;   // e.g. 2

    @Column(name = "gross_weight")
    private Double grossWeight;  // machine weight for those crates (with crate), e.g. 84

    public CrateLine() { }

    public CrateLine(Double crateCount, Double grossWeight) {
        this.crateCount = crateCount;
        this.grossWeight = grossWeight;
    }

    public Double getCrateCount() { return crateCount; }
    public void setCrateCount(Double v) { this.crateCount = v; }
    public Double getGrossWeight() { return grossWeight; }
    public void setGrossWeight(Double v) { this.grossWeight = v; }
}
