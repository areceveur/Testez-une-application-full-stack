package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.UserService;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class UserControllerTest {

    private User user;

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private UserMapper userMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @WithMockUser(username = "yoga@studio.com")
    @Test
    public void findByIdTest_UserExists() throws Exception {
        UserDto userDto = new UserDto(
                1L,
                "yoga@studio.com",
                "Admin",
                "Admin",
                false,
                null,
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(userService.findById(1L)).thenReturn(user);
        when(userMapper.toDto(user)).thenReturn(userDto);

        mockMvc.perform(get("/api/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("yoga@studio.com"))
                .andExpect(jsonPath("$.lastName").value("Admin"))
                .andExpect(jsonPath("$.firstName").value("Admin"));
    }

    @WithMockUser(username = "test@user.com")
    @Test
    public void findById_UserNotFound() throws Exception {
        when(userService.findById(35L)).thenReturn(null);

        mockMvc.perform(get("/api/user/35")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @WithMockUser(username = "test@user.com")
    @Test
    public void findById_BadRequestTest() throws Exception {
        mockMvc.perform(get("/api/user/invalidId")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @WithMockUser(username = "user@test.com")
    @Test
    public void saveUserTest() throws Exception {
        User user = new User();
        user.setEmail("user@test.com");

        when(userService.findById(4L)).thenReturn(user);

        mockMvc.perform(delete("/api/user/4")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @WithMockUser(username = "test@user.com")
    @Test
    public void save_UserNotFound() throws Exception {
        when(userService.findById(3L)).thenReturn(null);

        mockMvc.perform(delete("/api/user/3")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @WithMockUser(username = "test@user.com")
    @Test
    public void save_UserUnauthorizedTest() throws Exception {
        User user = new User();
        user.setEmail("user@test.com");
        when(userService.findById(4L)).thenReturn(user);

        mockMvc.perform(delete("/api/user/4")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @WithMockUser(username = "test@user.com")
    @Test
    public void save_BadRequestTest() throws Exception {
        mockMvc.perform(delete("/api/user/invalidId")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
