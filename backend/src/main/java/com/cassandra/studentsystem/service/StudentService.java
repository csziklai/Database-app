package com.cassandra.studentsystem.service;

import com.cassandra.studentsystem.model.Student;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public void deleteStudent(int id);
    public Page<Student> findAll(Pageable pageable, String searchText);

}
