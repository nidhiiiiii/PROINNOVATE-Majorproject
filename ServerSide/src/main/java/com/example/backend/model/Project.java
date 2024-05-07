package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
@Builder
public class Project
{
    @Id
    private String id;
    private String userId;
    private String projectName;
    private String projectDescription;
    private String achievements;
    private String departments;
    private String category;
    private String mobileNumber;
    private byte[] file;
    private Valid valid;
    private Date date;
    private Group group;
}
