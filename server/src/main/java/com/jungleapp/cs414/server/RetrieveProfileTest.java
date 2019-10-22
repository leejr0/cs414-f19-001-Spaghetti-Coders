package com.jungleapp.cs414.server;
import com.jungleapp.cs414.server.RetrieveProfile;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class RetrieveProfileTest {
    private RetrieveProfile retrieveProfile = new RetrieveProfile(
            "zizamzoe", "1234", "zizamzoe@gmail.com"
    );

    @Test
    void establishMySQLConnectionTest() {
        assertTrue(retrieveProfile.establishProfileIdentity());
    }

    @Test
    void establishMySQLConnectionInvalidUsername() {
        retrieveProfile = new RetrieveProfile("zizamzeo", "1234", "zizamzoe@gmail.com");
        assertFalse(retrieveProfile.establishProfileIdentity());
    }


    @Test
    void establishMySQLConnectionInvalidPassword() {
        retrieveProfile = new RetrieveProfile("zizamzoe", "bigdumb", "zizamzoe@gmail.com");
        assertFalse(retrieveProfile.establishProfileIdentity());
    }

    @Test
    void establishMySQLConnectionInvalidEmail() {
        retrieveProfile = new RetrieveProfile("zizamzoe", "1234", "bigdumb@gmail.com");
        assertTrue(retrieveProfile.establishProfileIdentity());
    }

}
