package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class SessionControllerTest {

    private Session session;

    @Autowired
    private MockMvc mockMvc;

    @Mock
    SessionService sessionService;

    @Mock
    SessionMapper sessionMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @WithMockUser(username = "yoga@studio.com")
    @Test
    public void createTest() throws Exception {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("Session");
        sessionDto.setDate(new Date());
        sessionDto.setName("Yoga");

        Session session = new Session();
        session.setDescription("Session");
        session.setDate(new Date());
        session.setName("Yoga");

        when(sessionService.create(sessionMapper.toEntity(sessionDto))).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        mockMvc.perform(post("/api/session")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sessionDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @WithMockUser(username = "yoga@studio.com")
    @Test
    public void findByIdTest_SessionExists() throws Exception {
        SessionDto sessionDto = new SessionDto();

        when(sessionService.getById(1L)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        mockMvc.perform(get("/api/session/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @WithMockUser()
    @Test
    public void findById_SessionNotFound() throws Exception {
        when(sessionService.getById(35L)).thenReturn(null);

        mockMvc.perform(get("/api/session/35")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @WithMockUser()
    @Test
    public void findById_BadRequestTest() throws Exception {
        mockMvc.perform(get("/api/session/invalidId")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @WithMockUser()
    @Test
    public void findAllTest() throws Exception {

        Session session1 = new Session();
        session1.setId(1L);

        Session session2 = new Session();
        session2.setId(2L);

        List<Session> sessions = new ArrayList<>();
        sessions.add(session1);
        sessions.add(session2);

        SessionDto sessionDto1 = new SessionDto();

        SessionDto sessionDto2 = new SessionDto();

        when(sessionService.findAll()).thenReturn(sessions);
        when(sessionMapper.toDto(session1)).thenReturn(sessionDto1);
        when(sessionMapper.toDto(session2)).thenReturn(sessionDto2);

        mockMvc.perform(get("/api/session")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));
    }

    @WithMockUser()
    @Test
    public void updateTest() throws Exception {
        SessionDto sessionDto = new SessionDto();
        sessionDto.setId(1L);
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("Session update");
        sessionDto.setDate(new Date());
        sessionDto.setName("Yoga");

        Session updateSession = new Session();
        updateSession.setDescription("Session update");
        updateSession.setDate(new Date());
        updateSession.setName("Yoga");

        when(sessionMapper.toEntity(sessionDto)).thenReturn(updateSession);
        when(sessionService.update(1L, updateSession)).thenReturn(updateSession);
        when(sessionMapper.toDto(updateSession)).thenReturn(sessionDto);

        mockMvc.perform(put("/api/session/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sessionDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.description").value("Session update"))
                .andExpect(jsonPath("$.name").value("Yoga"));
    }

    @WithMockUser()
    @Test
    public void update_BadRequestTest() throws Exception {
        mockMvc.perform(put("/api/session/invalidId")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @WithMockUser("test@user.com")
    @Test
    public void participateTest() throws Exception {
        Long sessionId = 1L;
        Long userId = 2L;

        doNothing().when(sessionService).participate(anyLong(), anyLong());

        mockMvc.perform(post("/api/session/1/participate/2", sessionId, userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @WithMockUser("yoga@studio.com")
    @Test
    public void participate_BadRequestTest() throws Exception {
        Long sessionId = 1L;
        String userId = "invalidId";

        doNothing().when(sessionService).participate(anyLong(), anyLong());

        mockMvc.perform(post("/api/session/1/participate/invalidId", sessionId, userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @WithMockUser("yoga@studio.com")
    @Test
    public void deleteTest() throws Exception {
        Long sessionId = 1L;
        Long userId = 2L;

        doNothing().when(sessionService).noLongerParticipate(anyLong(), anyLong());

        mockMvc.perform(delete("/api/session/1/participate/2", sessionId, userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @WithMockUser("yoga@studio.com")
    @Test
    public void delete_BadRequestTest() throws Exception {
        String sessionId = "invalidId";
        Long userId = 2L;

        doNothing().when(sessionService).noLongerParticipate(anyLong(), anyLong());

        mockMvc.perform(delete("/api/session/invalidId/participate/2", sessionId, userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @WithMockUser()
    @Test
    public void saveSessionTest() throws Exception {
        Session session = new Session();
        session.setId(1L);

        when(sessionService.getById(1L)).thenReturn(session);

        mockMvc.perform(delete("/api/session/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @WithMockUser()
    @Test
    public void save_SessionNotFound() throws Exception {
        when(sessionService.getById(1L)).thenReturn(null);

        mockMvc.perform(delete("/api/session/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @WithMockUser()
    @Test
    public void save_BadRequestTest() throws Exception {
        mockMvc.perform(delete("/api/session/invalidId")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}