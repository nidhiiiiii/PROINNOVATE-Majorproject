package com.example.backend.repository;

import com.example.backend.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IProjectRepository extends MongoRepository<Project,String>
{
    List<Project> findByUserId(String userId);
    List<Project> findByProjectNameLike(String name);
    Project findByProjectName(String projectName);
    List<Project> findByDepartmentsAndCategory(String departments,String category);
}
