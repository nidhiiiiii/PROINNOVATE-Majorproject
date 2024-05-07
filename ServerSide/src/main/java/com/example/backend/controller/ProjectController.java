package com.example.backend.controller;

import com.example.backend.model.Project;
import com.example.backend.model.Valid;
import com.example.backend.service.impl.GroupService;
import com.example.backend.service.impl.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/projects")
@CrossOrigin("*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private GroupService service;

    @PostMapping("/upload")
    public ResponseEntity<?> addProject(
            MultipartFile file,
            String projectName,
            String projectDescription,
            String achievements,
            String departments,
            String category,
            String mobileNumber,
            String userId) {
        HashMap<String,Object> res = new HashMap<>();
        try {
            res.put("success",true);
            projectService.uploadProject(userId,projectName ,projectDescription, achievements, departments, category, mobileNumber, file);
            res.put("msg","Project Added Successfully");
            return ResponseEntity.status( HttpStatus.OK).body(res);
        } catch (IOException e)
        {
            res.put("success",false);
            res.put("msg","Failed to add the project");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PostMapping("/accept/{projectId}/{valid}")
    private ResponseEntity<?> adminAcceptProject(@PathVariable String projectId, @PathVariable Valid valid) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            Project project = projectService.getProjectById(projectId);

            if (project != null) {
                if (valid == Valid.PENDING) {
                    project.setValid(Valid.ACCEPTED);
                    res.put("message", "Project with ID " + projectId + " accepted successfully.");
                    res.put("Project", project);
                } else if(valid == Valid.REJECTED)
                {
                    project.setValid(Valid.REJECTED);
                    res.put("message", "Project with ID " + projectId + " rejected.");
                    res.put("Project", project);
                }
                else
                {
                    project.setValid(Valid.PENDING);
                    res.put("message", "Project with ID " + projectId + " is pending.");
                    res.put("Project", project);
                }
                projectService.updateProject(project);
                return ResponseEntity.ok(res);
            } else {
                res.put("error", "Project not found with ID: " + projectId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
            }
        } catch (Exception e) {
            res.put("error", "An error occurred while processing the request.");
            return ResponseEntity.badRequest().body(res);
        }
    }


    @GetMapping("/download/{filename}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename) {
        byte[] fileBytes = projectService.downloadFile(filename);
        return ResponseEntity.ok()
                .contentType(determineContentType(filename))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(fileBytes);
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

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable String id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try {
            Project project = projectService.getProjectById(id);
            res.put("success", true);
            res.put("Project", project);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Project not found for provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProjectsByName(@RequestParam String name) {
        List<Project> projects = projectService.getProjectByProjectName(name);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/project/{userId}")
    private ResponseEntity<?> getProjectByUserId(@PathVariable String userId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Project> project = projectService.findProjectByUserId(userId);
            res.put("success",true);
            res.put("Projects",project);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Project details are not found for provided user id id"+userId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping("/filter/dept/cat")
    public ResponseEntity<?> searchProjectsByDepartmentAndCategory(@RequestParam String department,@RequestParam String category)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Project> projects = projectService.findByDepartmentsAndCategory(department,category);
            res.put("Success",true);
            res.put("Projects",projects);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","No Data Found for provided department and category is"+department + "and"+category);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable String id, @RequestBody Project project) {
        project.setId(id);
        Project updatedProject = projectService.updateProject(project);
        if (updatedProject == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProjectAndGroupById(@PathVariable String projectId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            projectService.deleteProjectById(projectId);
            service.deleteGroupByProjectId(projectId);
            res.put("success",true);
            res.put("msg","Successfully delete the project and the group id is"+projectId);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to delete the project and group id is"+ projectId);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
}
