package com.example.backend.repository;

import com.example.backend.model.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IQueryRepository extends MongoRepository<Query,String> {
}
