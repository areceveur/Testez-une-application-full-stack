package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SessionMapperImplTest {

    @Qualifier("sessionMapper")
    @InjectMocks
    private SessionMapperImpl sessionMapper;

    @Mock
    private TeacherService teacherService;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void toEntityTest() {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("Yoga");
        sessionDto.setDescription("Session de yoga");
        sessionDto.setDate(new Date());

        Session session = sessionMapper.toEntity(sessionDto);
        assertNotNull(session);
    }

    @Test
    public void testToEntity_NullDto() {
        Session session = sessionMapper.toEntity((SessionDto) null);
        assertNull(session);
    }

    @Test
    public void toDtoTest() {
        Session session = new Session();
        session.setName("Yoga");
        session.setDescription("Session de yoga");
        session.setDate(new Date());

        SessionDto sessionDto = sessionMapper.toDto(session);
        assertNotNull(sessionDto);
    }

    @Test
    public void NullDtoTest() {
        SessionDto sessionDto = sessionMapper.toDto((Session) null);
        assertNull(sessionDto);
    }

    @Test
    public void toEntityListTest() {
        SessionDto sessionDto1 = new SessionDto();
        sessionDto1.setName("Yoga");
        sessionDto1.setDescription("Session de yoga");
        sessionDto1.setDate(new Date());

        Session session1 = sessionMapper.toEntity(sessionDto1);
        assertNotNull(session1);

        SessionDto sessionDto2 = new SessionDto();
        sessionDto2.setName("Yoga");
        sessionDto2.setDescription("Session de yoga");
        sessionDto2.setDate(new Date());

        Session session2 = sessionMapper.toEntity(sessionDto2);
        assertNotNull(session2);

        List<SessionDto> sessionDtos = new ArrayList<>();
        sessionDtos.add(sessionDto1);
        sessionDtos.add(sessionDto2);

        List<Session> sessions = sessionMapper.toEntity(sessionDtos);

        assertNotNull(sessions);
    }

    @Test
    public void testToEntityList_NullDto() {
        List<Session> result = sessionMapper.toEntity((List<SessionDto>) null);
        assertNull(result);
    }

    @Test
    public void toDtoListTest() {
        Session session1 = new Session();
        session1.setName("Yoga");
        session1.setDescription("Session de yoga");
        session1.setDate(new Date());

        SessionDto sessionDto1 = sessionMapper.toDto(session1);
        assertNotNull(sessionDto1);

        Session session2 = new Session();
        session2.setName("Yoga");
        session2.setDescription("Session de yoga");
        session2.setDate(new Date());

        SessionDto sessionDto2 = sessionMapper.toDto(session2);
        assertNotNull(sessionDto2);

        List<Session> sessions = new ArrayList<>();
        sessions.add(session1);
        sessions.add(session2);

        List<SessionDto> sessionDtos = sessionMapper.toDto(sessions);

        assertNotNull(sessionDtos);
    }

    @Test
    public void testToDtoList_NullDto() {
        List<SessionDto> result = sessionMapper.toDto((List<Session>) null);
        assertNull(result);
    }

    @Test
    public void sessionTeacherIdTest() {
        Teacher mockTeacher = new Teacher();
        mockTeacher.setFirstName("Hélène");
        mockTeacher.setLastName("THIERCELIN");
        mockTeacher.setId(1L);

        when(teacherService.findById(1L)).thenReturn(mockTeacher);

        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("Yoga");
        sessionDto.setDescription("Session de yoga");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);

        Session session = sessionMapper.toEntity(sessionDto);

        assertNotNull(session);
        assertNotNull(session.getTeacher());
        assertEquals(mockTeacher.getId(), session.getTeacher().getId());
    }

    @Test
    public void sessionTeacherId_NullTeacherTest() {
        Teacher teacher = new Teacher();
        teacher.setId(1L);
        Session session = new Session();
        session.setTeacher(teacher);
        session.setName("Yoga");
        session.setDescription("Session de yoga");

        SessionDto sessionDto = sessionMapper.toDto(session);

        assertNotNull(sessionDto);
        assertEquals(1L, sessionDto.getTeacher_id());
    }

    @Test
    public void sessionTeacherId_NullIdTest() {
        Teacher teacher = new Teacher();
        teacher.setId(null);
        Session session = new Session();
        session.setTeacher(teacher);

        SessionDto sessionDto = sessionMapper.toDto(session);

        assertNull(sessionDto.getTeacher_id());
    }

    @Test
    public void sessionTeacherId_NullSessionTest() {
        Session session = null;
        SessionDto sessionDto = sessionMapper.toDto(session);

        assertNull(sessionDto);
    }
}
