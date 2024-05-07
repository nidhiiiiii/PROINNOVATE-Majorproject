package com.example.backend.repository;

import com.example.backend.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IGroupRepository extends MongoRepository<Group,String>
{
    Group findByProjectIdAndStudentId(String projectId,String studentId);

    Group findGroupByStudentId(String studentId);

    List<Group> findGroupByMembers(String members);

    Group deleteGroupByProjectId(String projectId);
}
