package com.example.backend.service.impl;

import com.example.backend.model.Group;
import com.example.backend.model.Project;
import com.example.backend.model.Student;
import com.example.backend.repository.IGroupRepository;
import com.example.backend.repository.IProjectRepository;
import com.example.backend.repository.IStudentRepository;
import com.example.backend.service.IGroupService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class GroupService implements IGroupService {

    @Autowired
    private IGroupRepository repository;

    @Autowired
    private IStudentRepository studentRepository;

    @Autowired
    private IProjectRepository projectRepository;

    @Override
    public Group createGroup(Group group) {
        Group existingGroup = repository.findByProjectIdAndStudentId(group.getProjectId(), group.getStudentId());
        if (existingGroup != null) {
            throw new IllegalArgumentException("A group with the same projectId and studentId already exists.");
        }
        Optional<Project> projectOptional = projectRepository.findById(group.getProjectId());
        if (projectOptional.isPresent()) {


            group.setProjectName(projectOptional.get().getProjectName());
            group.setProjectDescription(projectOptional.get().getProjectDescription());
            group.setMembers(Collections.singletonList(projectOptional.get().getUserId()));
            repository.save(group);
            projectOptional.get().setGroup(group);
            projectRepository.save(projectOptional.get());
            return group;

        } else {
            throw new IllegalArgumentException("Project with ID " + group.getProjectId() + " not found");
        }
    }

    @Override
    public void likeContent(String groupId, String projectId) {
        Optional<Group> groupOptional = repository.findById(groupId);
        Optional<Project> projectOptional = projectRepository.findById(projectId);

        if (groupOptional.isPresent() && projectOptional.isPresent()) {
            Group group = groupOptional.get();
            Project project = projectOptional.get();

            group.setLikes(group.getLikes() + 1);
            repository.save(group);
            project.getGroup().setLikes(project.getGroup().getLikes()+1);;
            projectRepository.save(project);
        } else {
            throw new ResourceNotFoundException("Group or Project not found with id: " + groupId + ", " + projectId);
        }
    }


    @Override
    public Group joinGroup(String groupId, String studentId) {
        Group group = repository.findById(groupId).orElse(null);
        if (group == null) {
            throw new IllegalArgumentException("Group with ID " + groupId + " not found");
        }

        if (group.getMembers().contains(studentId)) {
            throw new IllegalArgumentException("Student " + studentId + " is already a member of this group");
        }

        group.getMembers().add(studentId);
        return repository.save(group);
    }





    @Override
    public Group getGroupById(String id) {
        return repository.findById(id).get();
    }

    @Override
    public Group getGroupByStudentId(String studentId) {
        return repository.findGroupByStudentId(studentId);
    }

    @Override
    public List<Group> GetGroupsByMembers(String members) {
        return repository.findGroupByMembers(members);
    }

    @Override
    public List<Group> getAllGroups() {
        return repository.findAll();
    }

    @Override
    public void deleteGroupByProjectId(String projectId) {
        repository.deleteGroupByProjectId(projectId);
    }

}
