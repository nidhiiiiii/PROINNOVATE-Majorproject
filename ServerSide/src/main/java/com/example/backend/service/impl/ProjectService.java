package com.example.backend.service.impl;

import com.example.backend.model.Project;
import com.example.backend.model.Valid;
import com.example.backend.repository.IProjectRepository;
import com.example.backend.service.IProjectService;
import com.example.backend.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService implements IProjectService {

    @Autowired
    private IProjectRepository repository;

    public Project uploadProject(String userId,String projectName, String projectDescription, String achievements, String departments, String category, String mobileNumber, MultipartFile file) throws IOException {

        Project project = Project.builder()
                .userId(userId)
                .projectName(projectName)
                .projectDescription(projectDescription)
                .achievements(achievements)
                .departments(departments)
                .category(category)
                .mobileNumber(mobileNumber)
                .file(FileUtils.compressImage(file.getBytes()))
                .valid(Valid.PENDING)
                .date(new Date())
                .build();

        return repository.save(project);
    }

    @Override
    public Project acceptProject(Valid valid) {
        Project project = Project.builder()
                .valid(Valid.PENDING)
                .build();
        return repository.save(project);
    }

    public byte[] downloadFile(String projectName) {
        Optional<Project> projects = Optional.ofNullable(repository.findByProjectName(projectName));

        byte[] files =  FileUtils.decompressImage(projects.get().getFile());

        return files;
    }

    @Override
    public Project getProjectById(String id) {
        Optional<Project> optionalProject = repository.findById(id);
        return optionalProject.orElse(null);
    }

    @Override
    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    @Override
    public List<Project> findByDepartmentsAndCategory(String departments, String category) {
        return repository.findByDepartmentsAndCategory(departments,category);
    }

    @Override
    public List<Project> getProjectByProjectName(String name)
    {
        return repository.findByProjectNameLike(name);
    }

    @Override
    public List<Project> findProjectByUserId(String id) {
        return repository.findByUserId(id);
    }

    @Override
    public Project updateProject(Project project) {
        return repository.save(project);
    }

    @Override
    public void deleteProjectById(String id) {
        repository.deleteById(id);
    }
}
