package com.openclassrooms.starterjwt.payload.request;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class SignupRequestTest {
    @Test
    public void getEmailTest() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setEmail("test@user.com");

        assertNotNull(signupRequest.getEmail());
    }

    @Test
    public void getFirstNameTest() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setFirstName("Test");

        assertNotNull(signupRequest.getFirstName());
    }

    @Test
    public void getLastNameTest() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setLastName("User");

        assertNotNull(signupRequest.getLastName());
    }

    @Test
    public void getPasswordTest() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setPassword("password");

        assertNotNull(signupRequest.getPassword());
    }
}
