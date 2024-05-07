package com.example.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student
{
    @Id
    private String id;
    private String image;
    private String name;
    private String email;
    private String password;
    private String college;
    private String mobileNumber;
    private String address;
}
