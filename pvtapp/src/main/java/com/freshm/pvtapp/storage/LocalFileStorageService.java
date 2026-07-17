package com.freshm.pvtapp.storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LocalFileStorageService
        implements FileStorageService {

    @Value("${storage.local.path}")
    private String uploadPath;

    @Override
    public String saveFile(
            MultipartFile file,
            String folderName,
            String fileName
    ) {

        try {

            Path folder =
                    Paths.get(uploadPath, folderName);

            Files.createDirectories(folder);

            String extension =
                    StringUtils.getFilenameExtension(
                            file.getOriginalFilename()
                    );

            String finalFileName =
                    fileName + "." + extension;

            Path target =
                    folder.resolve(finalFileName);

            Files.copy(
                    file.getInputStream(),
                    target
            );

            return target.toString();

        } catch (IOException ex) {

            throw new StorageException(
                    "Unable to save file.",
                    ex
            );

        }

    }

    @Override
    public void deleteFile(String filePath) {

        try {

            Files.deleteIfExists(
                    Paths.get(filePath)
            );

        } catch (IOException ex) {

            throw new StorageException(
                    "Unable to delete file.",
                    ex
            );

        }

    }

    @Override
    public boolean fileExists(String filePath) {

        return Files.exists(
                Paths.get(filePath)
        );

    }

}