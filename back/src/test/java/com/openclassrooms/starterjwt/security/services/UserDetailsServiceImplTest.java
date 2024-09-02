package com.openclassrooms.starterjwt.security.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;

@SpringBootTest
public class UserDetailsServiceImplTest {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Test
    public void loadUserByUsernameTest() {
        UserDetails userDetails = userDetailsService.loadUserByUsername("yoga@studio.com");

        System.out.println(userDetails);
    }
}
