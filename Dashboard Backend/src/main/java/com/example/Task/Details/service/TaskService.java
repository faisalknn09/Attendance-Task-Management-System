package com.example.Task.Details.service;

import com.example.Task.Details.model.TaskModel;
import com.example.Task.Details.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TaskService {

    /*private static final Logger logger = LoggerFactory.getLogger(TaskService.class);*/
    @Autowired
    TaskRepository taskRepository;


    public List<TaskModel> create(List<TaskModel> taskModel) {
        log.info("Task saved successfully");
        return (List<TaskModel>) taskRepository.saveAll(taskModel);
    }

    public List<TaskModel> getAllTask(){
        log.info("All tasks are displayed");
        return (List<TaskModel>) taskRepository.findAll();
    }

    public List<TaskModel> getByDate(String d) {
        log.info("All tasks saved on provided date are displayed");
        return taskRepository.getTaskByDate(d);
    }

    public String deleteAll(){
        log.info("All tasks are deleted successfully");
        taskRepository.deleteAll();
        return "All tasks deleted successfully";
    }

    public String deleteTask(String d){
        log.info("All tasks on provided data are deleted successfully");
        taskRepository.delete(d);
        return "Tasks on mentioned date deleted successfully";
    }

    public List<TaskModel> lastTask() {
        return (List<TaskModel>) taskRepository.findLastTask();
    }



//    public List<TaskModel> update(String d,TaskModel taskModel) {
//        return taskRepository.update(d);
//    }
}