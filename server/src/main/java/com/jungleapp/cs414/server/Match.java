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
    MatchStructure currentMatch;
    private Gson gson = new Gson();

    private JungleBoard jungleBoard;
    private String winner;
    private Boolean isActive = true;
    private String whoseTurn;
    private String playerBlue;
    private String playerRed;
    private Move move;

    private Connection connection;

    Match(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        Gson gson = new Gson();


        currentMatch = gson.fromJson(requestBody, MatchStructure.class);

        this.jungleBoard = currentMatch.jungleBoard;
        this.isActive = currentMatch.isActive;
        this.whoseTurn = currentMatch.whoseTurn;
        this.playerBlue = currentMatch.playerBlue;
        this.playerRed = currentMatch.playerRed;
        this.winner = currentMatch.winner;
        this.move = currentMatch.move;

        connection = MySQLConnection.establishMySQLConnection();
    }

    String createNewMatch() {
        this.jungleBoard = new JungleBoard();
        this.jungleBoard.initialize();
        this.isActive = true;
        this.whoseTurn = this.playerBlue;

        saveNewMatch();

        return this.jungleBoard.getBoardJSON();
    }

    String updateMatch() {
        this.jungleBoard.resetBoard();

        boolean successfulMove = this.jungleBoard.makeMove(this.move.row, this.move.col, this.move.toRow, this.move.toCol);
        if(successfulMove) {
            if (this.whoseTurn.equals(this.playerBlue)){     //if piece was placed, switch turn to other player
                this.whoseTurn = this.playerRed;
            }else{
                this.whoseTurn = this.playerBlue;
            }
            checkWin();
        }
        return getMatchJSON();
    }

    private void saveUpdatedMatch() {
        // TODO: Finish updating match with some sort of match identifier(gameID).
//        try {
//            Statement statement = connection.createStatement();
//            String formattedTime = null;
//            if (!isActive) {
//                LocalDateTime matchEndTime = LocalDateTime.now();
//                DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm-ss");
//
//                formattedTime = matchEndTime.format(timeFormatter);
//            }
//
//            //Update database entry with current details.
//            statement.execute("UPDATE Game SET board='" + gson.toJson(this.board) + "'," +
//                    "status='" + this.isActive + "'," +
//                    "playerTurn='" + this.whoseTurn + "'," +
//                    "winner='" + this.winner + "'," +
//                    "endTime='" + formattedTime + "' WHERE TODO: Insert applicable match identifier here.");
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
    }

    //As long as a piece is inside the den, we know its a win for player. Same color pieces may not move into their own den.
    private void checkWin() {
        try {
            if (this.jungleBoard.getPiece(0, 3) != null) {
                this.winner = this.playerBlue;
                this.isActive = false;
            } else if (this.jungleBoard.getPiece(8, 3) != null) {
                this.winner = this.playerRed;
                this.isActive = false;
            }
        } catch (IllegalPositionException ignored) {}
    }

    private void saveNewMatch() {
        try {
            Statement statement = connection.createStatement();

            LocalDateTime currentTime = LocalDateTime.now();
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm-ss");

            String formattedTime = currentTime.format(timeFormatter);

            // Register new match into the database
            statement.execute("INSERT INTO Game VALUES (NULL, '" + this.jungleBoard.getBoardJSON() + "', " +
                    "'" + this.isActive + "','" + this.whoseTurn + "', NULL ," +
                    "'" + formattedTime + "', NULL);");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private String getMatchJSON() {
        currentMatch.jungleBoard = this.jungleBoard;
        currentMatch.isActive = this.isActive;
        currentMatch.whoseTurn = this.whoseTurn;
        currentMatch.winner = this.winner;
        currentMatch.move = this.move;

        return gson.toJson(currentMatch);
    }
}