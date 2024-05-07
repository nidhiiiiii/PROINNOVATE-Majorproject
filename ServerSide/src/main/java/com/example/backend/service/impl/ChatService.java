package com.example.backend.service.impl;

import com.example.backend.model.Chat;
import com.example.backend.model.Student;
import com.example.backend.repository.IChatRepository;
import com.example.backend.repository.IStudentRepository;
import com.example.backend.service.IChatService;
import com.example.backend.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ChatService implements IChatService
{
    @Autowired
    private IChatRepository repository;

    @Autowired
    private IStudentRepository studentRepository;

    @Override
    public void sendMessages(String groupId, String sender,List<String> receiver, String message)
    {
        Student student = studentRepository.findById(sender).get();

        Chat chat1 = Chat.builder()
                .groupId(groupId)
                .sender(sender)
                .senderName(student.getName())
                .receiver(receiver)
                .message(message)
                .build();
        repository.save(chat1);
    }

    @Override
    public List<Chat> getAllMessages() {
        return repository.findAll();
    }

    @Override
    public List<Chat> getMessagesById(String id) {
        return repository.getMessageById(id);
    }

    @Override
    public List<Chat> getChatByGroupId(String groupId) {
        return repository.getChatByGroupId(groupId);
    }

    @Override
    public List<Chat> getChatBySender(String sender) {
        return repository.getChatBySender(sender);
    }
    @Override
    public void uploadFile(String groupId, String sender, List<String> receiver, String message, MultipartFile data) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + data.getOriginalFilename();

        Chat chat = Chat.builder()
                .groupId(groupId)
                .sender(sender)
                .receiver(receiver)
                .message(message)
                .filename(fileName)
                .data(data.getBytes())
                .build();

        repository.save(chat);
    }
    @Override
    public byte[] downloadFile(String filename) {
        Chat chat = repository.findByFilename(filename);
        if (chat != null && chat.getData() != null) {
            return chat.getData();
        } else {
            return null;
        }
    }
}
