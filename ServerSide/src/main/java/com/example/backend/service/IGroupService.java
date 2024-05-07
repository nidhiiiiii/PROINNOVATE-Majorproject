package com.example.backend.service;

import com.example.backend.model.Group;

import java.util.List;

public interface IGroupService
{

    Group createGroup(Group group);

    void likeContent(String groupId,String projectId);

    Group joinGroup(String projectId, String studentId);

    Group getGroupById(String id);

    Group getGroupByStudentId(String studentId);

    List<Group> GetGroupsByMembers(String members);

    List<Group> getAllGroups();

    void deleteGroupByProjectId(String projectId);

}
