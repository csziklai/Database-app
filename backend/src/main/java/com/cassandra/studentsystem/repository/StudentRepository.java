package com.cassandra.studentsystem.repository;

import com.cassandra.studentsystem.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    @Query("FROM Student s WHERE s.name LIKE %:searchText% OR s.address LIKE %:searchText%")
    Page<Student> findAllStudents(Pageable pageable, @Param("searchText") String searchText);
}


