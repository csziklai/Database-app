package com.cassandra.studentsystem.service;

import com.cassandra.studentsystem.model.Student;
import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public void deleteStudent(int id);

}
