package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@SpringBootTest
public class TeacherMapperImplTest {

    @Qualifier("teacherMapper")
    @InjectMocks
    private TeacherMapperImpl sessionMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void toEntityTest() {
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setFirstName("Hélène");
        teacherDto.setLastName("THIERCELIN");
        teacherDto.setId(1L);

        Teacher teacher = sessionMapper.toEntity(teacherDto);
        assertNotNull(teacher);
    }

    @Test
    public void testToEntity_NullDto() {
        Teacher teacher = sessionMapper.toEntity((TeacherDto) null);
        assertNull(teacher);
    }

    @Test
    public void toDtoTest() {
        Teacher teacher = new Teacher();
        teacher.setFirstName("Hélène");
        teacher.setLastName("THIERCELIN");
        teacher.setId(1L);

        TeacherDto teacherDto = sessionMapper.toDto(teacher);
        assertNotNull(teacherDto);
    }

    @Test
    public void NullDtoTest() {
        TeacherDto teacherDto = sessionMapper.toDto((Teacher) null);
        assertNull(teacherDto);
    }

    @Test
    public void toEntityListTest() {
        TeacherDto teacherDto1 = new TeacherDto();
        teacherDto1.setFirstName("Hélène");
        teacherDto1.setLastName("THIERCELIN");
        teacherDto1.setId(1L);

        Teacher teacher1 = sessionMapper.toEntity(teacherDto1);
        assertNotNull(teacher1);

        TeacherDto teacherDto2 = new TeacherDto();
        teacherDto2.setFirstName("Margot");
        teacherDto2.setLastName("DELAHAYE");
        teacherDto2.setId(1L);

        Teacher teacher2 = sessionMapper.toEntity(teacherDto2);
        assertNotNull(teacher2);

        List<TeacherDto> teacherDtos = new ArrayList<>();
        teacherDtos.add(teacherDto1);
        teacherDtos.add(teacherDto2);

        List<Teacher> teachers = sessionMapper.toEntity(teacherDtos);

        assertNotNull(teachers);
    }

    @Test
    public void testToEntityList_NullDto() {
        List<Teacher> result = sessionMapper.toEntity((List<TeacherDto>) null);
        assertNull(result);
    }

    @Test
    public void toDtoListTest() {
        Teacher teacher1 = new Teacher();
        teacher1.setFirstName("Hélène");
        teacher1.setLastName("THIERCELIN");
        teacher1.setId(1L);

        TeacherDto teacherDto1 = sessionMapper.toDto(teacher1);
        assertNotNull(teacherDto1);

        Teacher teacher2 = new Teacher();
        teacher2.setFirstName("Margot");
        teacher2.setLastName("DELAHAYE");
        teacher2.setId(1L);

        TeacherDto teacherDto2 = sessionMapper.toDto(teacher2);
        assertNotNull(teacherDto2);

        List<Teacher> teachers = new ArrayList<>();
        teachers.add(teacher1);
        teachers.add(teacher2);

        List<TeacherDto> teacherDtos = sessionMapper.toDto(teachers);

        assertNotNull(teacherDtos);
    }

    @Test
    public void testToDtoList_NullDto() {
        List<TeacherDto> result = sessionMapper.toDto((List<Teacher>) null);
        assertNull(result);
    }
}
