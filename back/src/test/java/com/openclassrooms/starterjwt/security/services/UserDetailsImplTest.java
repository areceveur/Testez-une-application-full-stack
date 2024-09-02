package com.openclassrooms.starterjwt.security.services;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserDetailsImplTest {

    @Test
    public void getAuthoritiesTest() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        assertNotNull(authorities);
        assertTrue(authorities.isEmpty());
    }

    @Test
    public void isAccountNonExpiredTest() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        assertTrue(userDetails.isAccountNonExpired());
    }

    @Test
    public void isAccountNonLockedTest() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        assertTrue(userDetails.isAccountNonLocked());
    }

    @Test
    public void isCredentialsNonExpiredTest() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        assertTrue(userDetails.isCredentialsNonExpired());
    }

    @Test
    public void isEnabledTest() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().build();
        assertTrue(userDetails.isEnabled());
    }

    @Test
    public void getUsernameTest() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(1L)
                .username("yoga@studio.com")
                .build();
        assertEquals("yoga@studio.com", userDetails.getUsername());
    }

    @Test
    public void getPasswordTest() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .password("test!1234")
                .build();
        assertEquals("test!1234", userDetails.getPassword());
    }

    @Test
    public void equalsTest() {
        UserDetailsImpl userDetails1 = UserDetailsImpl.builder()
                .id(1L)
                .build();
        UserDetailsImpl userDetails2 = UserDetailsImpl.builder()
                .id(1L)
                .build();
        UserDetailsImpl userDetails3 = UserDetailsImpl.builder()
                .id(2L)
                .build();
        String differentClass = "differentClass";
        assertEquals(userDetails1, userDetails2);
        assertNotEquals(userDetails1, userDetails3);
        assertEquals(userDetails1, userDetails1);
        assertNotEquals(userDetails1, null);
        assertNotEquals(userDetails1, differentClass);
    }

}
