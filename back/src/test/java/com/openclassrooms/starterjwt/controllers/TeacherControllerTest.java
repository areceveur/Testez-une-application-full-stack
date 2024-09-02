package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class TeacherControllerTest {
    private Teacher teacher;

    @Autowired
    private MockMvc mockMvc;

    @Mock
    TeacherService teacherService;

    @Mock
    TeacherMapper teacherMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @WithMockUser(username = "yoga@studio.com")
    @Test
    public void findByIdTest_TeacherExists() throws Exception {
        TeacherDto teacherDto = new TeacherDto(
                2L,
                "THIERCELIN",
                "Hélène",
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        when(teacherService.findById(2L)).thenReturn(teacher);
        when(teacherMapper.toDto(teacher)).thenReturn(teacherDto);

        mockMvc.perform(get("/api/teacher/2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lastName").value("THIERCELIN"))
                .andExpect(jsonPath("$.firstName").value("Hélène"));
    }

    @WithMockUser(username = "test@user.com")
    @Test
    public void findById_TeacherNotFound() throws Exception {
        when(teacherService.findById(35L)).thenReturn(null);

        mockMvc.perform(get("/api/teacher/35")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @WithMockUser(username = "test@user.com")
    @Test
    public void findById_BadRequestTest() throws Exception {
        mockMvc.perform(get("/api/teacher/invalidId")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @WithMockUser(username = "yoga@studio.com")
    @Test
    public void findAllTest() throws Exception {

        Teacher teacher1 = new Teacher();
        teacher1.setId(2L);
        teacher1.setLastName("THIERCELIN");
        teacher1.setFirstName("Hélène");

        Teacher teacher2 = new Teacher();
        teacher2.setId(1L);
        teacher2.setLastName("DELAHAYE");
        teacher2.setFirstName("Margot");

        List<Teacher> teachers = new ArrayList<>();
        teachers.add(teacher1);
        teachers.add(teacher2);

        TeacherDto teacherDto1 = new TeacherDto(
                2L,
                "THIERCELIN",
                "Hélène",
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        TeacherDto teacherDto2 = new TeacherDto(
                1L,
                "DELAHAYE",
                "Margot",
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(teacherService.findAll()).thenReturn(teachers);
        when(teacherMapper.toDto(teacher1)).thenReturn(teacherDto1);
        when(teacherMapper.toDto(teacher2)).thenReturn(teacherDto2);

        mockMvc.perform(get("/api/teacher")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].lastName").value("DELAHAYE"))
                .andExpect(jsonPath("$[0].firstName").value("Margot"))
                .andExpect(jsonPath("$[1].lastName").value("THIERCELIN"))
                .andExpect(jsonPath("$[1].firstName").value("Hélène"));
    }
}
