package com.jungleapp.cs414.server;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import static org.junit.jupiter.api.Assertions.*;


class MatchTest {
    private Connection connection;
    ResultSet resultSet;
    private Statement statement;

    @BeforeEach
    void initialize() {
        connection = MySQLConnection.establishMySQLConnection();

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    @Test
    void testSaveMatch() throws SQLException {
        String jsonTest = "{\n" +
                "    playerBlue: 'zizamzoe',\n" +
                "    playerRed: '12345'\n" +
                "}";
        Match match = new Match(jsonTest);

        match.createNewMatch();

        String[] expected = new String[]{"Pending", "zizamzoe", null, "zizamzoe", "12345"};
        getGame("zizamzoe", "12345");

        String[] actual = new String[]{};
        while (resultSet.next()) {
            actual = new String[]{resultSet.getString("status"), resultSet.getString("playerTurn"),
                    resultSet.getString("winner"), resultSet.getString("playerBlue"), resultSet.getString("playerRed")};
        }

        deleteGame("zizamzoe", "12345");
        match.closeMySQLConnection();
        assertArrayEquals(expected, actual);
    }

    void getGame(String playerBlue, String playerRed) throws SQLException {
        resultSet = statement.executeQuery("SELECT * from Game" +
                " where Game.playerBlue = '" + playerBlue + "' and Game.playerRed = '" + playerRed + "';");
    }

    void deleteGame(String playerBlue, String playerRed) throws SQLException {
        statement.execute("DELETE from Game" +
                " where Game.playerBlue = '" + playerBlue + "' and Game.playerRed = '" + playerRed + "';");
    }

    void readTestJSON() {
        try {
            FileReader fileReader = new FileReader("newMatchTest.txt");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
