package com.example.backend.repository;

import com.example.backend.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IStudentRepository extends MongoRepository<Student,String>
{
    List<Student> findByNameLike(String name);

    Student findByEmail(String email);

    Student findStudentByEmailAndPassword(String email,String password);
}
