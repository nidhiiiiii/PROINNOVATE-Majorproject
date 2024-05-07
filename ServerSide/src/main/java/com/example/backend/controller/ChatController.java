package com.example.backend.controller;

import com.example.backend.model.Chat;
import com.example.backend.service.impl.ChatService;
import com.example.backend.service.impl.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private GroupService groupService;

    @PostMapping("/send")
    private ResponseEntity<?> sendMessages(@RequestParam String groupId,@RequestParam String sender,@RequestParam List<String> receiver,@RequestParam String message)
    {
        chatService.sendMessages(groupId, sender,receiver, message);
        return ResponseEntity.status(HttpStatus.CREATED).body("Message sent successfully");
    }

    @GetMapping("/getAll")
    private ResponseEntity<?> getAllMessages() {
        List<Chat> messages = chatService.getAllMessages();
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/get/sender/{sender}")
    private ResponseEntity<?> getChatBySender(@PathVariable String sender){
        List<Chat> chat = chatService.getChatBySender(sender);
        return ResponseEntity.status(HttpStatus.OK).body(chat);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getMessagesById(@PathVariable String id) {
        List<Chat> messages = chatService.getMessagesById(id);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/get/groupId/{groupId}")
    private ResponseEntity<?> getMessagesByGroupId(@PathVariable String groupId){
        List<Chat> groupMessages = chatService.getChatByGroupId(groupId);
        return ResponseEntity.ok(groupMessages);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam String groupId,
                                        @RequestParam String sender,
                                        @RequestParam List<String> receiver,
                                        @RequestParam String message,
                                        @RequestParam MultipartFile data) {
        try {
            chatService.uploadFile(groupId, sender, receiver, message, data);
            return ResponseEntity.ok().body("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename) {
        byte[] fileData = chatService.downloadFile(filename);
        if (fileData != null) {
            return ResponseEntity.ok()
                    .contentType(determineContentType(filename))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(fileData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private MediaType determineContentType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        switch (extension) {
            case "txt": return MediaType.TEXT_PLAIN;
            case "pdf": return MediaType.APPLICATION_PDF;
            case "jpg": case "jpeg": return MediaType.IMAGE_JPEG;
            case "png": return MediaType.IMAGE_PNG;
            case "xlsx": return MediaType.APPLICATION_XML;
            default: return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

}