package com.openclassrooms.starterjwt.security.jwt;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class JwtUtilsTest {

    @Autowired
    JwtUtils jwtUtils;

    @Mock
    Authentication authentication;

    UserDetailsImpl userDetails;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        userDetails = UserDetailsImpl.builder()
                .id(1L)
                .username("testUser")
                .password("testPassword")
                .firstName("Test")
                .lastName("User")
                .admin(false)
                .build();
        when(authentication.getPrincipal()).thenReturn(userDetails);
    }


    @Test
    public void generateTokenTest() {
        String token = jwtUtils.generateJwtToken(authentication);
        assertNotNull(token);
        assertEquals("testUser", jwtUtils.getUserNameFromJwtToken(token));
    }

    @Test
    public void validateJwtTokenTest() {
        String token = jwtUtils.generateJwtToken(authentication);
        assertNotNull(token);
        assertTrue(jwtUtils.validateJwtToken(token));
    }

    @Test
    public void validateJwtToken_ExpiredToken() throws InterruptedException {
        String expiredToken = Jwts.builder()
                .setSubject((userDetails.getUsername()))
                .setExpiration(new Date(System.currentTimeMillis() - 1000))
                .signWith(SignatureAlgorithm.HS512, "testSecret")
                .compact();

        assertFalse(jwtUtils.validateJwtToken(expiredToken));
    }

    @Test
    public void validateJwtToken_InvalidToken() throws InterruptedException {
        String invalidToken = Jwts.builder()
                .setSubject((userDetails.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000))
                .signWith(SignatureAlgorithm.HS512, "wrongSecret")
                .compact();

        assertFalse(jwtUtils.validateJwtToken(invalidToken));
    }

    @Test
    public void validateJwtToken_MalformedToken() throws InterruptedException {
        String malformedToken = "this.is.not.a.token";
        assertFalse(jwtUtils.validateJwtToken(malformedToken));
    }

    @Test
    public void validateJwtToken_EmptyToken() {
        String invalidToken = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000))
                .signWith(SignatureAlgorithm.HS512, "wrongSecret")
                .compact();
        assertFalse(jwtUtils.validateJwtToken(invalidToken));
    }

    @Test
    public void validateJwtToken_NullToken() {
        String nullToken = null;
        assertFalse(jwtUtils.validateJwtToken(nullToken));
    }

    @Test
    public void validateJwtToken_UnsupportedToken() {
        String unsupportedToken = Jwts.builder()
                .setPayload("unsupported")
                .signWith(SignatureAlgorithm.HS512, "testSecret")
                .compact();

        assertFalse(jwtUtils.validateJwtToken(unsupportedToken));
    }

}
