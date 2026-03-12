package com.aaru.SpringBoot2.Service;

import com.aaru.SpringBoot2.Repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    StudentRepo studentRepo;

    public String say(){
        return studentRepo.say();
    }

}
