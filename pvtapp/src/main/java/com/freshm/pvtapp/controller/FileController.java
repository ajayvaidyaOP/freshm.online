package com.freshm.pvtapp.controller;

import com.freshm.pvtapp.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController {

    private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    /**
     * Upload File
     */
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file
    ) {

        String fileName = fileStorageService.store(file);

        return ResponseEntity.ok(fileName);
    }

    /**
     * Download File
     */
    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String fileName
    ) {

        Resource resource = fileStorageService.load(fileName);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\""
                )
                .body(resource);
    }

    /**
     * View File (PDF/Image)
     */
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable String fileName
    ) {

        Resource resource = fileStorageService.load(fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    /**
     * Delete File
     */
    @DeleteMapping("/{fileName}")
    public ResponseEntity<String> deleteFile(
            @PathVariable String fileName
    ) {

        fileStorageService.delete(fileName);

        return ResponseEntity.ok(
                "File deleted successfully."
        );
    }

}