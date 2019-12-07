package com.jungleapp.cs414.server;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class RetrieveMatchesTest {
    private static Connection connection;
    ResultSet resultSet;
    private static Statement statement;

    @BeforeEach
    void initialize() {
        connection = MySQLConnection.establishMySQLConnection();

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Disabled
    @Test
    void getMatches() throws SQLException {
        String jsonTest1 = "{\n" +
                "    playerBlue: 'zizamzoe',\n" +
                "    playerRed: '12345'\n" +
                "}";
        Match match1 = new Match(jsonTest1);

        match1.createNewMatch();

        String jsonTest2 = "{\n" +
                "    playerBlue: 'zizamzoe',\n" +
                "    playerRed: 'jmiller0'\n" +
                "}";
        Match match2 = new Match(jsonTest2);

        match2.createNewMatch();

        String jsonTest3 = "{\n" +
                "    playerBlue: '12345',\n" +
                "    playerRed: 'zizamzoe'\n" +
                "}";
        Match match3 = new Match(jsonTest3);

        match3.createNewMatch();

        String expected = "[{\"playerBlue\":\"zizamzoe\",\"playerRed\":\"12345\",\"status\":\"Pending\",\"playerTurn\":\"zizamzoe\"}," +
                "{\"playerBlue\":\"zizamzoe\",\"playerRed\":\"jmiller0\",\"status\":\"Pending\",\"playerTurn\":\"zizamzoe\"}," +
                "{\"playerBlue\":\"12345\",\"playerRed\":\"zizamzoe\",\"status\":\"Pending\",\"playerTurn\":\"12345\"}]";

        RetrieveMatches retrieveMatches = new RetrieveMatches("zizamzoe");
        String actual = retrieveMatches.getMatches();

        deleteGame("zizamzoe", "12345");
        deleteGame("zizamzoe","jmiller0");
        deleteGame("12345", "zizamzoe");

        assertEquals(expected, actual);
    }

    void deleteGame(String playerBlue, String playerRed) throws SQLException {
        statement.execute("DELETE from Game" +
                " where Game.playerBlue = '" + playerBlue + "' and Game.playerRed = '" + playerRed + "';");
    }

    @AfterAll
    static void closeConnection() throws SQLException {
        if (connection != null && statement != null) {
            connection.close();
            statement.close();
        }
    }

}