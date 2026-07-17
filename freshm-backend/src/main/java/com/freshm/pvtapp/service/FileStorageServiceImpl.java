package com.freshm.pvtapp.service;

import com.freshm.pvtapp.service.FileStorageService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path uploadPath;

    public FileStorageServiceImpl(
            @Value("${file.upload-dir:uploads}") String uploadDir
    ) {

        this.uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {

            Files.createDirectories(uploadPath);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Could not create upload directory.",
                    e
            );

        }

    }

    @Override
    public String store(MultipartFile file) {

        if (file == null || file.isEmpty()) {

            throw new RuntimeException("Please select a file.");

        }

        String originalFileName =
                StringUtils.cleanPath(file.getOriginalFilename());

        String extension = "";

        int index = originalFileName.lastIndexOf(".");

        if (index > 0) {

            extension = originalFileName.substring(index);

        }

        String uniqueFileName =
                UUID.randomUUID().toString() + extension;

        try {

            Files.copy(
                    file.getInputStream(),
                    uploadPath.resolve(uniqueFileName),
                    StandardCopyOption.REPLACE_EXISTING
            );

            return uniqueFileName;

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to store file.",
                    e
            );

        }

    }

    @Override
    public Resource load(String fileName) {

        try {

            Path file = uploadPath.resolve(fileName).normalize();

            Resource resource =
                    new UrlResource(file.toUri());

            if (resource.exists()) {

                return resource;

            }

            throw new RuntimeException(
                    "File not found."
            );

        } catch (MalformedURLException e) {

            throw new RuntimeException(
                    "File not found.",
                    e
            );

        }

    }

    @Override
    public void delete(String fileName) {

        try {

            Path file =
                    uploadPath.resolve(fileName).normalize();

            Files.deleteIfExists(file);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Unable to delete file.",
                    e
            );

        }

    }

}