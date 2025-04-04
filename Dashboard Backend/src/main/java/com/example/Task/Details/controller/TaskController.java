package com.example.Task.Details.controller;

import com.example.Task.Details.model.TaskModel;
import com.example.Task.Details.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping("/store")
    public List<TaskModel> createTask(@Valid @RequestBody List<TaskModel> taskModel){
        return taskService.create(taskModel);
    }

    @GetMapping("/fetch")
    public List<TaskModel> getTask(){
        return taskService.getAllTask();
    }

    @GetMapping("/{d}")
    public List<TaskModel> get(@PathVariable String d){
        return taskService.getByDate(d);
    }

    @DeleteMapping("/delete")
    public String deleteAllTasks(){
        return taskService.deleteAll();
    }

    @DeleteMapping("deleteByDate/{d}")
    public String deleteTaskByDate(@PathVariable String d){
        return taskService.deleteTask(d);
    }

    @GetMapping("/fetchLatestTask")
    public List<TaskModel> getLatestTask(){
        return taskService.lastTask();
    }




//    @PutMapping("update/{date}")
//    public List<TaskModel> updateTask(@PathVariable("date") String d,@RequestBody TaskModel taskModel,){
//        return taskService.update(d,taskModel);
//    }
}

