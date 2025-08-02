package com.cassandra.studentsystem.service;

import com.cassandra.studentsystem.model.Student;
import com.cassandra.studentsystem.repository.StudentRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }

    @Override
    public Optional<Student> findStudent(int id) {
        return studentRepository.findById(id);
    }


    @Override
    public Page<Student> findAll(Pageable pageable, String searchText) {
        return studentRepository.findAllStudents(pageable, searchText);
    }

    @Override
    public long countStudents() {
        System.out.println("count service reached");
        return studentRepository.count();
    }
}
