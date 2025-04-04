package com.example.Task.Details.repository;

import com.example.Task.Details.model.TaskModel;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<TaskModel,Integer>{
    @Query("select t from TaskModel t where t.date=?1 ")
    List<TaskModel> getTaskByDate(String d);

    @Modifying
    @Transactional
    @Query("delete from TaskModel t where t.date=?1 ")
    void delete(String d);

    @Query("select max(t.id) from TaskModel t")
    List<TaskModel> findLastTask();
}
