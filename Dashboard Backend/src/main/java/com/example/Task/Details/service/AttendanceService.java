package com.example.Task.Details.service;

import java.util.List;

import com.example.Task.Details.model.Attendance;
import com.example.Task.Details.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repository;

    public Attendance saveAttendance(Attendance attendance) {
        return repository.save(attendance);
    }

    public List<Attendance> getAllAttendance() {
        return repository.findAll();
    }
}