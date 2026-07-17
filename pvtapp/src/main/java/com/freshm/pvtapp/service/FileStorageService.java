package com.freshm.pvtapp.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    /**
     * Store uploaded file
     *
     * @param file Multipart file
     * @return Stored file name
     */
    String store(MultipartFile file);

    /**
     * Load file as Resource
     *
     * @param fileName Stored file name
     * @return Resource
     */
    Resource load(String fileName);

    /**
     * Delete stored file
     *
     * @param fileName Stored file name
     */
    void delete(String fileName);

}