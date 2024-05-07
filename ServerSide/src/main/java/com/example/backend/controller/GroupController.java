package com.example.backend.controller;

import com.example.backend.model.Group;
import com.example.backend.model.Student;
import com.example.backend.service.IGroupService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/groups")
@CrossOrigin("*")
public class GroupController
{
    @Autowired
    private IGroupService service;

    @PostMapping("/create")
    private ResponseEntity<?> createGroup(@RequestBody Group group)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            service.createGroup(group);
            res.put("success",true);
            res.put("msg","Group Created Successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to create the group");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PostMapping("/{groupId}/join/{studentId}")
    private ResponseEntity<?> joinGroup(@PathVariable String groupId, @PathVariable String studentId) {
        Group group = service.joinGroup(groupId, studentId);
        if (group != null) {
            return ResponseEntity.ok(group);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getGroupsById(@PathVariable String id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            Group group = service.getGroupById(id);
            res.put("success",true);
            res.put("Group",group);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to fetch the group by provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping("/members/{members}")
    private ResponseEntity<?> getGroupsByMembers(@PathVariable String members)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Group> group = service.GetGroupsByMembers(members);
            res.put("success",true);
            res.put("Group",group);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to fetch the group by member id is"+ members);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
    
    @GetMapping("/student/{studentId}")
    private ResponseEntity<?> getGroupsByStudentId(@PathVariable String studentId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            Group group = service.getGroupByStudentId(studentId);
            res.put("success",true);
            res.put("Group",group);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","failed to fetch the group by provided student id is"+studentId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }   
    }

    @PutMapping("/like/{groupId}/{projectId}")
    public ResponseEntity<String> likeContent(@PathVariable String groupId, @PathVariable String projectId) {
        try {
            service.likeContent(groupId, projectId);
            return ResponseEntity.ok("Content liked successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    private ResponseEntity<?> getAllGroups()
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Group> groups = service.getAllGroups();
            res.put("success",true);
            res.put("Groups",groups);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the available groups");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }



}
