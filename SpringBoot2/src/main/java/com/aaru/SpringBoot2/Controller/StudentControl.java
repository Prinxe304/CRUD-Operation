package com.aaru.SpringBoot2.Controller;

import com.aaru.SpringBoot2.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentControl {


    @Autowired
    StudentService studentService;

    @GetMapping("/welcome")
    public String welcome(){
        return studentService.say();
    }

}
