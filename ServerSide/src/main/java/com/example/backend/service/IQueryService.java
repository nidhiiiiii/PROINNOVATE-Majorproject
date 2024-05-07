package com.example.backend.service;

import com.example.backend.model.Query;

import java.util.List;

public interface IQueryService
{
    Query addQuery(Query query);

    Query getQueryById(String id);

    List<Query> getAllQueries();

    Query updateQuery(Query query);

    void deleteQueryById(String id);
}
