package com.example.backend.service.impl;

import com.example.backend.model.Query;
import com.example.backend.repository.IQueryRepository;
import com.example.backend.service.IQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueryService implements IQueryService
{
    @Autowired
    private IQueryRepository repository;

    @Override
    public Query addQuery(Query query) {
        return repository.save(query);
    }

    @Override
    public Query getQueryById(String id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Query> getAllQueries() {
        return repository.findAll();
    }

    @Override
    public Query updateQuery(Query query) {
        return repository.save(query);
    }

    @Override
    public void deleteQueryById(String id) {
        repository.deleteById(id);
    }
}
