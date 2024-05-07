package com.example.backend.service;

import com.example.backend.model.Chat;
import com.example.backend.model.Group;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public interface IChatService
{
    void sendMessages(String groupId, String sender, List<String> receiver, String message);

    List<Chat> getAllMessages();

    List<Chat> getMessagesById(String id);

    List<Chat> getChatByGroupId(String groupId);

    List<Chat> getChatBySender(String sender);

    void uploadFile(String groupId, String sender, List<String> receiver, String message,MultipartFile data) throws IOException;

    byte[] downloadFile(String filename);
}
