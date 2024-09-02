package com.openclassrooms.starterjwt.security.jwt;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import com.openclassrooms.starterjwt.security.services.UserDetailsServiceImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class AuthTokenFilterTest {
    @InjectMocks
    private AuthTokenFilter authTokenFilter;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain chain;

    @Mock
    private UserDetailsImpl userDetails;

    private String jwtToken;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtToken = Jwts.builder()
                .setSubject("testUser")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000))
                .signWith(SignatureAlgorithm.HS512, "testSecret")
                .compact();
    }

   @Test
   public void doFilterInternalTest_authenticateUser_whenTokenIsValid() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtils.validateJwtToken(jwtToken)).thenReturn(true);
        when(jwtUtils.getUserNameFromJwtToken(jwtToken)).thenReturn("testUser");
        when(userDetailsService.loadUserByUsername("testUser")).thenReturn(userDetails);

        authTokenFilter.doFilterInternal(request, response, chain);

        verify(chain).doFilter(request, response);
        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
   }

   @Test
    public void doFilterInternalTest_noAuthenticateUser_whenTokenIsInvalide() throws Exception {
       when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
       when(jwtUtils.validateJwtToken(jwtToken)).thenReturn(false);

       authTokenFilter.doFilterInternal(request, response, chain);

       verify(chain).doFilter(request, response);
       assertNull(SecurityContextHolder.getContext().getAuthentication());
   }

    @Test
    public void doFilterInternal_ShouldHandleException_WhenErrorOccurs() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtUtils.validateJwtToken(jwtToken)).thenThrow(new RuntimeException("Token validation failed"));

        authTokenFilter.doFilterInternal(request, response, chain);

        verify(chain).doFilter(request, response);
        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }
}
