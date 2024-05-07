package com.example.backend.service;

import com.example.backend.model.Student;

import java.util.List;
import java.util.Optional;

public interface IStudentService
{
    Student addStudent(Student student);

    List<Student> getAllStudents();

    Student getStudentById(String id);

    Student findStudentByEmailAndPassword(String email,String password);

    Student authenticateStudent(String email,String password);

    void changePassword(Student student,String newPassword,String confirmPassword);

    List<Student> findStudentByName(String name);

    Student findByEmail(String email);

    Student updateStudent(Student student);

    void deleteStudentById(String id);
}
