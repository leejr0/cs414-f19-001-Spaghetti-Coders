package com.jungleapp.cs414.server;
import org.junit.jupiter.api.*;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import static org.junit.jupiter.api.Assertions.*;

class RetrieveProfileTest {
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

    @AfterAll
    static void deleteData() {
        try {
            Connection connection = MySQLConnection.establishMySQLConnection();
            Statement statement = connection.createStatement();
            statement.execute("DELETE FROM Player WHERE nickname = 'newguy'");

            connection.close();
            statement.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
