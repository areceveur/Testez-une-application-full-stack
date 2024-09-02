package com.openclassrooms.starterjwt.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.models.User;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void deleteTest() {
        User user = new User();
        user.setFirstName("User");
        user.setLastName("Test");
        User createdUser = userRepository.save(user);

        assertNotNull(createdUser.getId());

        userService.delete(createdUser.getId());
    }

    @Test
    public void findByIdTest() {
        User user = new User();
        user.setFirstName("User");
        user.setLastName("Test");
        User createdUser = userRepository.save(user);
        assertNotNull(createdUser.getId());
        User foundUser = userService.findById(createdUser.getId());
        assertNotNull(foundUser);

        userService.findById(createdUser.getId());
    }
}
