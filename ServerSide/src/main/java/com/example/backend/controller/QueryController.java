package com.example.backend.controller;

import com.example.backend.model.Query;
import com.example.backend.service.IQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/query")
@CrossOrigin("*")
public class QueryController
{
    @Autowired
    private IQueryService service;

    @PostMapping
    private ResponseEntity<?> addQuery(@RequestBody Query query)
    {
        HashMap<String ,Object> res = new HashMap<>();
        try{
            service.addQuery(query);
            res.put("success",true);
            res.put("msg","Query Added Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to add the query");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping
    private ResponseEntity<?> getAllQueries()
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            List<Query> queries = service.getAllQueries();
            res.put("success",true);
            res.put("Queries",queries);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the queries");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getQueriesBYId(@PathVariable String id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            Query query = service.getQueryById(id);
            res.put("success",true);
            res.put("Query",query);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch tbe query by provided id is"+ id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteQueriesBYId(@PathVariable String id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try{
            service.deleteQueryById(id);
            res.put("success",true);
            res.put("msg","Query Delete successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch(Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to delete tbe query id is"+ id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
