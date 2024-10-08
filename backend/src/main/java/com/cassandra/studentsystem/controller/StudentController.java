package com.cassandra.studentsystem.controller;

import com.cassandra.studentsystem.model.Student;
import com.cassandra.studentsystem.service.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService studentService;
    Pageable firstPage = PageRequest.of(0, 15);

    @PostMapping("/add")
    public String add(@RequestBody Student student) {
        studentService.saveStudent(student);
        return "New student has been added";
    }

    @GetMapping("/getAll")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }


    @DeleteMapping("getAll/{id}")
    public String delete(@PathVariable("id") Integer id) {
        studentService.deleteStudent(id);
        return "Student was deleted";

    }

    @GetMapping("/search/{searchText}")
    ResponseEntity<Page<Student>> findAll(Pageable pageable, @PathVariable String searchText) {
        return new ResponseEntity<>(studentService.findAll(pageable, searchText), HttpStatus.OK);
    }

}
