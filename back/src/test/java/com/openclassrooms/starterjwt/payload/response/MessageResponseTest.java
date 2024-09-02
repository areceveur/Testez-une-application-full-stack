package com.openclassrooms.starterjwt.payload.response;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class MessageResponseTest {
    @Test
    public void getMessageTest() {
        MessageResponse messageResponse = new MessageResponse("Session created");
        assertNotNull(messageResponse.getMessage());
    }
}
