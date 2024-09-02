package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class TeacherServiceTest {
    @Autowired
    TeacherService teacherService;

    @Test
    public void findAllTest() {
        List<Teacher> teachers = teacherService.findAll();
        assertNotNull(teachers);
        System.out.println(teachers);
    };

    @Test
    public void findByIdTest() {
        Teacher teacher = teacherService.findById(1L);
        System.out.println(teacher);
    }
}
