package com.aaru.st1.clss.repo;

import com.aaru.st1.clss.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Studentrepo extends JpaRepository<Student, Long> {
}
