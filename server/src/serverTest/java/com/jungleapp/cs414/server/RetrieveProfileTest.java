package com.jungleapp.cs414.server;
import com.jungleapp.cs414.server.RetrieveProfile;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

public class RetrieveProfileTest {
    private RetrieveProfile retrieveProfile;

    @Test
    void establishProfileIdentityValid() {
        retrieveProfile = new RetrieveProfile("zizamzoe", "1234", "zizamzoe@gmail.com");
        Assertions.assertTrue(retrieveProfile.establishProfileIdentity());
    }

    @Test
    void establishProfileIdentityInvalidUsername() {
        retrieveProfile = new RetrieveProfile("zizamzeo", "1234", "zizamzoe@gmail.com");
        Assertions.assertFalse(retrieveProfile.establishProfileIdentity());
    }


    @Test
    void establishProfileIdentityInvalidPassword() {
        retrieveProfile = new RetrieveProfile("zizamzoe", "bigdumb", "zizamzoe@gmail.com");
        Assertions.assertFalse(retrieveProfile.establishProfileIdentity());
    }

    @Test
    void establishProfileIdentityInvalidEmail() {
        retrieveProfile = new RetrieveProfile("zizamzoe", "1234", "bigdumb@gmail.com");
        Assertions.assertTrue(retrieveProfile.establishProfileIdentity());
    }

    //Test passes but needs to be ignored due to the current lack of ability to delete newly created users easily.
    @Disabled
    @Test
    void createNewProfileValid() {
        retrieveProfile = new RetrieveProfile("newguy", "1234", "newguy@gmail.com");

        assertFalse(retrieveProfile.establishProfileIdentity());
        assertTrue(retrieveProfile.createNewProfile());
        assertTrue(retrieveProfile.establishProfileIdentity());
    }

    @Test
    void createNewProfileExistingNickname() {
        retrieveProfile = new RetrieveProfile("newguy", "29482148", "someotherguy@gmail.com");

        assertFalse(retrieveProfile.createNewProfile());
    }

    @Test
    void createNewProfileExistingEmail() {
        retrieveProfile = new RetrieveProfile("anotherguy", "13tn31t1", "newguy@gmail.com");

        assertFalse(retrieveProfile.createNewProfile());
    }
}
