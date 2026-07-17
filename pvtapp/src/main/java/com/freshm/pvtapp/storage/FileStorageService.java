package com.freshm.pvtapp.storage;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String saveFile(
            MultipartFile file,
            String folderName,
            String fileName
    );

    void deleteFile(String filePath);

    boolean fileExists(String filePath);

}
