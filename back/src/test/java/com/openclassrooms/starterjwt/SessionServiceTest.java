package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class SessionServiceTest {
    @Autowired
    SessionService sessionService;

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
}
