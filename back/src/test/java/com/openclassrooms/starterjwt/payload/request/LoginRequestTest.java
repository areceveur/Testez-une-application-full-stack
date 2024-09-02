package com.openclassrooms.starterjwt.payload.request;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class LoginRequestTest {
    @Test
    public void getEmailTest() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@gmail.com");
        loginRequest.setPassword("password");

        assertNotNull(loginRequest.getEmail());
    }

    @Test
    public void getPasswordTest() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@gmail.com");
        loginRequest.setPassword("password");
        assertNotNull(loginRequest.getPassword());
    }

}
