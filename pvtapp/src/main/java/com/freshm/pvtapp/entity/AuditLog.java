package com.freshm.pvtapp.entity;

import java.time.LocalDateTime;

import com.freshm.pvtapp.enums.AuditAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    /**
     * Company Isolation
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "company_id"
    )
    private Company company;



    /**
     * User who performed action
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id"
    )
    private User user;



    /**
     * Example:
     *
     * Vendor
     * Purchase
     * Payment
     */
    @Column(nullable = false)
    private String entityName;



    /**
     * ID of changed record
     *
     * Example:
     *
     * Vendor ID = 100
     */
    private Long entityId;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuditAction action;



    /**
     * Old value JSON
     */
    @Column(columnDefinition = "TEXT")
    private String oldValue;



    /**
     * New value JSON
     */
    @Column(columnDefinition = "TEXT")
    private String newValue;



    private LocalDateTime actionTime;



    @PrePersist
    public void beforeSave(){

        if(actionTime == null){
            actionTime = LocalDateTime.now();
        }

    }
}
