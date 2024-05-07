package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.model.Valid;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IProjectService
{
    Project acceptProject(Valid valid);

    Project getProjectById(String id);

    List<Project> getAllProjects();

    List<Project> findByDepartmentsAndCategory(String departments,String category);
    List<Project> getProjectByProjectName(String name);

    List<Project> findProjectByUserId(String id);

    Project updateProject(Project project);

    void deleteProjectById(String id);

}
