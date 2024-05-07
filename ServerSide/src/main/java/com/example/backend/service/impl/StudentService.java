package com.example.backend.service.impl;

import com.example.backend.model.Student;
import com.example.backend.repository.IStudentRepository;
import com.example.backend.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;


@Service
public class StudentService implements IStudentService
{
    @Autowired(required = true)
    private IStudentRepository repository;

    @Override
    public Student addStudent(Student student) {
        return repository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    @Override
    public Student getStudentById(String id) {
        return repository.findById(id).get();
    }

    @Override
    public Student findStudentByEmailAndPassword(String email, String password) {
        return repository.findStudentByEmailAndPassword(email,password);
    }

    @Override
    public Student findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public Student authenticateStudent(String email, String password)
    {
        Student student = findByEmail(email);
        if (student != null) {
            return student;
        }
        return null;
    }

    @Override
    public void changePassword(Student student, String newPassword,String confirmPassword)
    {
        if(Objects.equals(newPassword, confirmPassword))
        {
            student.setPassword(newPassword);
            repository.save(student);
        }
    }


    @Override
    public List<Student> findStudentByName(String name)
    {
//        String pattern = "%" + name.replaceAll("", "%") + "%";
        return repository.findByNameLike(name);
    }

    @Override
    public Student updateStudent(Student student) {
        return repository.save(student);
    }

    @Override
    public void deleteStudentById(String id) {
        repository.deleteById(id);
    }
}
