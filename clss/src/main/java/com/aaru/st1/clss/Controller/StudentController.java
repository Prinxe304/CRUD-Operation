package com.aaru.st1.clss.Controller;

import com.aaru.st1.clss.entity.Student;
import com.aaru.st1.clss.repo.Studentrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@RestController
@RequestMapping("/student")
public class
StudentController {

//    @Autowired
    private final Studentrepo studentrepo;

    StudentController(Studentrepo studentrepo) {
        this.studentrepo = studentrepo;
    }

    @PostMapping
    public Student Create(@RequestBody Student student) {
        return studentrepo.save(student);
    }

    @GetMapping
    public List<Student> findAll() {
        return studentrepo.findAll();
    }

    @PutMapping
    public Student Update(@RequestParam Long id, @RequestBody Student student){
        Student s = studentrepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        s.setName(student.getName());
        s.setEmail(student.getEmail());
        return studentrepo.save(s);
    }

    @PatchMapping
    public Student patchUpdate(@RequestParam Long id, @RequestParam String name) {
        Student s = studentrepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        s.setName(name);
        return studentrepo.save(s);   // ✅ THIS SOLVES IT
    }



}
