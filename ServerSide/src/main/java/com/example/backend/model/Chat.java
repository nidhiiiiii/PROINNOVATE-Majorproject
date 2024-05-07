package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
@Builder
public class Chat
{
    @Id
    private String id;
    private String groupId;
    private String sender;
    private String senderName;
    private String message;
    private List<String> receiver;
    private String filename;
    private byte[] data;

}
