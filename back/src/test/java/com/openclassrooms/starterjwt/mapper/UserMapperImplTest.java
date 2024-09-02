package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@SpringBootTest
public class UserMapperImplTest {

    @Qualifier("userMapper")
    @InjectMocks
    private UserMapperImpl sessionMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void toEntityTest() {
        UserDto userDto = new UserDto();
        userDto.setFirstName("User");
        userDto.setLastName("Test");
        userDto.setId(1L);
        userDto.setPassword("password");
        userDto.setEmail("email");

        User user = sessionMapper.toEntity(userDto);
        assertNotNull(user);
    }

    @Test
    public void testToEntity_NullDto() {
        User user = sessionMapper.toEntity((UserDto) null);
        assertNull(user);
    }

    @Test
    public void toDtoTest() {
        User user = new User();
        user.setFirstName("User");
        user.setLastName("Test");
        user.setId(1L);
        user.setPassword("password");
        user.setEmail("email");

        UserDto userDto = sessionMapper.toDto(user);
        assertNotNull(userDto);
    }

    @Test
    public void testToDtoNull() {
        UserDto userDto = sessionMapper.toDto((User) null);
        assertNull(userDto);
    }

    @Test
    public void toEntityListTest() {
        UserDto userDto1 = new UserDto();
        userDto1.setFirstName("User");
        userDto1.setLastName("Test");
        userDto1.setId(1L);
        userDto1.setPassword("password");
        userDto1.setEmail("email");

        User user1 = sessionMapper.toEntity(userDto1);
        assertNotNull(user1);

        UserDto userDto2 = new UserDto();
        userDto2.setFirstName("User2");
        userDto2.setLastName("Test2");
        userDto2.setId(1L);
        userDto2.setPassword("password2");
        userDto2.setEmail("email2");

        User user2 = sessionMapper.toEntity(userDto2);
        assertNotNull(user2);

        List<UserDto> userDtos = new ArrayList<>();
        userDtos.add(userDto1);
        userDtos.add(userDto2);

        List<User> users = sessionMapper.toEntity(userDtos);

        assertNotNull(users);
    }

    @Test
    public void testToEntityList_NullDto() {
        List<User> result = sessionMapper.toEntity((List<UserDto>) null);
        assertNull(result);
    }

    @Test
    public void toDtoListTest() {
        User user1 = new User();
        user1.setFirstName("User");
        user1.setLastName("Test");
        user1.setId(1L);
        user1.setPassword("password");
        user1.setEmail("email");

        UserDto userDto1 = sessionMapper.toDto(user1);
        assertNotNull(userDto1);

        User user2 = new User();
        user2.setFirstName("User2");
        user2.setLastName("Test2");
        user2.setId(1L);
        user2.setPassword("password2");
        user2.setEmail("email2");

        UserDto userDto2 = sessionMapper.toDto(user2);
        assertNotNull(userDto2);

        List<User> users = new ArrayList<>();
        users.add(user1);
        users.add(user2);

        List<UserDto> userDtos = sessionMapper.toDto(users);

        assertNotNull(userDtos);
    }

    @Test
    public void testToDtoList_NullDto() {
        List<UserDto> result = sessionMapper.toDto((List<User>) null);
        assertNull(result);
    }
}

