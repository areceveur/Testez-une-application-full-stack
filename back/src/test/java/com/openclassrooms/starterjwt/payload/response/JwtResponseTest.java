package com.openclassrooms.starterjwt.payload.response;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class JwtResponseTest {
    @Test
    public void responseTest() {
        JwtResponse jwtResponse = new JwtResponse("token", 1L, "TestUser", "Test", "user", false);

        jwtResponse.setId(1L);
        jwtResponse.setToken("token");
        jwtResponse.setUsername("TestUser");
        jwtResponse.setFirstName("Test");
        jwtResponse.setLastName("User");
        jwtResponse.setAdmin(false);

        assertNotNull(jwtResponse.getId());
        assertNotNull(jwtResponse.getToken());
        assertNotNull(jwtResponse.getUsername());
        assertNotNull(jwtResponse.getFirstName());
        assertNotNull(jwtResponse.getLastName());
        assertNotNull(jwtResponse.getAdmin());
    }
}
