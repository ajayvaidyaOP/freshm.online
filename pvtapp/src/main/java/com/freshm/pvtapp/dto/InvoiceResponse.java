package com.freshm.pvtapp.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;


@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceResponse {


    private Long id;


    private String invoiceNumber;


    private String pdfPath;


    private LocalDateTime generatedAt;


    private Integer downloadCount;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getInvoiceNumber() {
		return invoiceNumber;
	}


	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}


	public String getPdfPath() {
		return pdfPath;
	}


	public void setPdfPath(String pdfPath) {
		this.pdfPath = pdfPath;
	}


	public LocalDateTime getGeneratedAt() {
		return generatedAt;
	}


	public void setGeneratedAt(LocalDateTime generatedAt) {
		this.generatedAt = generatedAt;
	}


	public Integer getDownloadCount() {
		return downloadCount;
	}


	public void setDownloadCount(Integer downloadCount) {
		this.downloadCount = downloadCount;
	}
    
    

}