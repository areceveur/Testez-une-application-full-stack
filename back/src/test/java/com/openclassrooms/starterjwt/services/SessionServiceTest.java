package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@Transactional
public class SessionServiceTest {

    @Autowired
    private SessionService sessionService;

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SessionRepository sessionRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateSession() {
        Session session = new Session();
        session.setName("Session de yoga");
        session.setDescription("Session de yoga");
        session.setDate(new Date());
        Session createdSession = sessionService.create(session);

        assertNotNull(createdSession);
        assertNotNull(createdSession.getId());
    }

    @Test
    public void testDeleteSession() {
        Session session = new Session();
        session.setName("Session de yoga");
        session.setDescription("Session de yoga");
        session.setDate(new Date());
        Session createdSession = sessionService.create(session);
        assertNotNull(createdSession.getId());

        sessionService.delete(createdSession.getId());
    }

    @Test
    public void testUpdateSession() {
        Session session = new Session();
        session.setName("Session de yoga");
        session.setDescription("Session de yoga");
        session.setDate(new Date());

        Session createdSession = sessionService.create(session);
        assertNotNull(createdSession.getId());

        createdSession.setName("Nouvelle session de yoga");
        createdSession.setDescription("Session de yoga mise à jour");

        Session updatedSession = sessionService.update(createdSession.getId(), createdSession);

        assertNotNull(updatedSession);
        assertEquals("Nouvelle session de yoga", updatedSession.getName());
        assertEquals("Session de yoga mise à jour", updatedSession.getDescription());
    }

    @Test
    public void testListSession() {
        Session session1 = new Session();
        session1.setName("Première session de yoga");
        session1.setDescription("Session de yoga 1");
        session1.setDate(new Date());

        Session session2 = new Session();
        session2.setName("Deuxième session de yoga");
        session2.setDescription("Session de yoga 2");
        session2.setDate(new Date());

        Session createdSession1 = sessionService.create(session1);
        Session createdSession2 = sessionService.create(session2);

        assertNotNull(createdSession1.getId());
        assertNotNull(createdSession2.getId());

        List<Session> expectedSessions = Arrays.asList(createdSession1, createdSession2);

        when(sessionRepository.findAll()).thenReturn(expectedSessions);

        List<Session> result = sessionService.findAll();
        assertNotNull(result);
    }

    @Test
    public void testFindSessionById() {
        Session session = new Session();
        session.setName("Session de yoga");
        session.setDescription("Session de yoga");
        session.setDate(new Date());
        Session createdSession = sessionService.create(session);
        assertNotNull(createdSession);
        assertNotNull(createdSession.getId());

        Long id = createdSession.getId();
        Session foundSession = sessionService.getById(id);

        assertNotNull(foundSession);
        assertEquals("Session de yoga", foundSession.getName());

        Session nonExistentSession = sessionService.getById(-1L);
        assertNull(nonExistentSession);
    }

    @Test
    public void testParticipate() {
        Session session = new Session();
        session.setName("Session de yoga");
        session.setDescription("Session de yoga");
        session.setDate(new Date());

        User user = new User();
        user.setLastName("User");
        user.setFirstName("Test");
        user.setEmail("user@test.com");
        user.setPassword("password");

        List<User> users = new ArrayList<>();
        session.setUsers(users);

        when(sessionRepository.save(any(Session.class))).thenReturn(session);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(sessionRepository.findById(session.getId())).thenReturn(Optional.of(session));
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        Session createdSession = sessionService.create(session);
        User createdUser = userRepository.save(user);

        assertNotNull(createdSession);
        assertNotNull(createdSession.getId());
        assertNotNull(createdUser);
        assertNotNull(createdUser.getId());

        sessionService.participate(createdSession.getId(), 5L);
    }

    @Test
    public void participateTest_NotFoundException() {
        Long id = 2L;
        Long userId = 3L;

        when(sessionRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> {
            sessionService.participate(id, userId);
        });

        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    public void noLongerParticipateTest_NotFoundException() {
        Long id = 1L;
        Long userId = 1L;

        when(sessionRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> {
            sessionService.noLongerParticipate(id, userId);
        });
        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    public void noLongerParticipateTest_BadRequest() {
        Long id = 2L;
        Long userId = 3L;

        when(sessionRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(BadRequestException.class, () -> {
            sessionService.noLongerParticipate(id, userId);
        });

        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    public void noLongerParticipateTest() {
        Long id = 3L;
        Long userId = 5L;

        User user = new User();
        user.setId(userId);

        Session session = new Session();
        session.setId(id);
        session.setUsers(Arrays.asList(user));
        session.setDate(new Date());
        session.setName("Yoga");
        session.setDescription("Session de yoga");

        Session createdSession = sessionService.create(session);

        when(sessionRepository.findById(id)).thenReturn(Optional.of(session));
        sessionService.noLongerParticipate(createdSession.getId(), userId);
        assertTrue(createdSession.getUsers().isEmpty());
    }
}
