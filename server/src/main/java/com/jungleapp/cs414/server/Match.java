package com.jungleapp.cs414.server;

import spark.Request;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

class Match {
    private Gson gson = new Gson();

    private JungleBoard board;
    private String winner;
    private boolean isActive;
    private String whoseTurn;
    private String playerBlue;
    private String playerRed;
    private Move move;

    Connection connection;

    Match(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        Gson gson = new Gson();

        System.out.println(requestBody);

        Match currentMatch = gson.fromJson(requestBody, Match.class);

        this.board = currentMatch.board;
        this.isActive = currentMatch.isActive;
        this.whoseTurn = currentMatch.whoseTurn;
        this.winner = currentMatch.winner;
        this.move = currentMatch.move;

        connection = MySQLConnection.establishMySQLConnection();
    }

    void createNewMatch() {
        this.board.initialize();
        this.isActive = true;
        this.whoseTurn = this.playerBlue;

        saveNewMatch();
    }

    void updateMatch() {
        /* TODO: Call board.makeMove(this.move.row, this.move.col, this.move.toRow, this.move.toCol)
            Calculate potential win, calculate whoseTurn, and update database with the former information.
        */
    }

    private void saveNewMatch() {
        try {
            Statement statement = connection.createStatement();

            LocalDateTime currentTime = LocalDateTime.now();
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            String formattedTime = currentTime.format(timeFormatter);

            // Register new match into the database
            statement.execute("insert into Game values (" + gson.toJson(this.board) + ", " +
                    "'" + this.isActive + "','" + this.whoseTurn + "','" + this.winner + "'," +
                    "'" + formattedTime + "', NULL");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    String createJSON() { return gson.toJson(this); }
}