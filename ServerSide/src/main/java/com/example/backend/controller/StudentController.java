package com.example.backend.controller;

import com.example.backend.model.ChangePasswordRequest;
import com.example.backend.model.Student;
import com.example.backend.service.impl.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/student")
@CrossOrigin("*")
public class StudentController
{
    @Autowired
    private StudentService service;

    @PostMapping("/add")
    public ResponseEntity<?> addStudent(
            String name,
            String email,
            String password,
            String college,
            String mobileNumber,
            String address,
            MultipartFile image
    ) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            // Handle file upload - Save the studentPhoto to the desired location
            String filepath = Paths.get("").toAbsolutePath().toString();
            Path originalFilePath = Paths.get(filepath, "src", "main", "resources", "static", "Images", image.getOriginalFilename());
            String host = "http://localhost:8081/Images/" + image.getOriginalFilename();
            image.transferTo(originalFilePath);


            // Create a new student object
            Student student = Student.builder()
                    .name(name)
                    .email(email)
                    .password(password)
                    .college(college)
                    .mobileNumber(mobileNumber)
                    .address(address)
                    .image(host)
                    .build();

            service.addStudent(student);
            res.put("success", true);
            res.put("msg", "Student Added Successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        } catch (IOException ioe) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save student's photo. Please try again.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred while adding the student.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> studentLogin(@RequestBody HashMap<String, String> login) {
        try {
            String email = login.get("email");
            String password = login.get("password");

            if (email == null || password == null) {
                return new ResponseEntity<>("email and password fields are required", HttpStatus.BAD_REQUEST);
            }

            Student student = service.findStudentByEmailAndPassword(email,password);

            if (student != null) {
                return new ResponseEntity<>(student, HttpStatus.OK);
            }
            return new ResponseEntity<>("Invalid Credentials", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>("Student with provided email and password not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    private ResponseEntity<?> getAllStudent()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Student> students = service.getAllStudents();
            res.put("success",true);
            res.put("Students",students);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to fetch the students");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{id}")
    private  ResponseEntity<?> getStudentById(@PathVariable String id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            Student student = service.getStudentById(id);
            res.put("success",true);
            res.put("Student",student);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to fetch the student by provided id is"+ id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }


    @GetMapping("get/name/{name}")
    private ResponseEntity<?> getStudentsByName(@PathVariable String name)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Student> students = service.findStudentByName(name);
            res.put("success",true);
            res.put("Students",students);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to fetch the student by name is"+name);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<?> updateStudent(@PathVariable String id,
                                            String name,
                                            String email,
                                            String password,
                                            String college,
                                            String mobileNumber,
                                            String address,
                                            MultipartFile image
                                            ) throws IOException {
        HashMap<String,Object> res = new HashMap<>();
        try{
            String filepath = Paths.get("").toAbsolutePath().toString();
            Path originalFilePath = Paths.get(filepath, "src", "main", "resources", "static", "Images", image.getOriginalFilename());
            String host = "http://localhost:8080/Images/" + image.getOriginalFilename();
            image.transferTo(originalFilePath);

            Student student = service.getStudentById(id);

            student.setName(name);
            student.setEmail(email);
            student.setPassword(password);
            student.setCollege(college);
            student.setMobileNumber(mobileNumber);
            student.setAddress(address);
            student.setImage(host);

            service.updateStudent(student);
            res.put("success", true);
            res.put("msg", "Student Updated Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to update the student by provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        // Validate the request, authenticate the user, and check if the old password is correct
        Student student = service.authenticateStudent(request.getEmail(), request.getOldPassword());

        if (student != null) {
            // Update the user's password with the new one
            service.changePassword(student, request.getNewPassword(), request.getConfirmPassword());
            if(!Objects.equals(request.getNewPassword(), request.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("New Password and Confirm password are didn't match.");
            }
            return ResponseEntity.ok("Password changed successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }
    }

    @DeleteMapping("/{id}")
    private  ResponseEntity<?> deleteStudentById(@PathVariable String id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            service.deleteStudentById(id);
            res.put("success",true);
            res.put("msg","Student deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to delete the student by provided id is"+ id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
