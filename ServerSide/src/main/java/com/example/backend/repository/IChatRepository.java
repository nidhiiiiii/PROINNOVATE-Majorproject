package com.example.backend.repository;

import com.example.backend.model.Chat;
import com.example.backend.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IChatRepository extends MongoRepository<Chat,String>
{
    List<Chat> getMessageById(String id);

    Chat findByFilename(String filename);

    List<Chat> getChatBySender(String sender);

    List<Chat> getChatByGroupId(String groupId);
}
