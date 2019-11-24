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
    private MatchStructure currentMatch;
    private Gson gson = new Gson();

    private Connection connection;

    Match(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        Gson gson = new Gson();


        currentMatch = gson.fromJson(requestBody, MatchStructure.class);

        connection = MySQLConnection.establishMySQLConnection();
    }

    // Alternative constructor for JUnit testing.
    Match(String requestBody) {
        JsonParser jsonParser = new JsonParser();
        JsonElement request = jsonParser.parse(requestBody);
        Gson gson = new Gson();

        currentMatch = gson.fromJson(request, MatchStructure.class);
        connection = MySQLConnection.establishMySQLConnection();
    }

    String createNewMatch() {
        currentMatch.jungleBoard = new JungleBoard();
        currentMatch.jungleBoard.initialize();
        currentMatch.status = "Pending";
        currentMatch.whoseTurn = currentMatch.playerBlue;

        saveNewMatch();

        return currentMatch.jungleBoard.getBoardJSON();
    }

    //Temporary class that doesn't interfere with old functionality
    boolean createNewPendingMatch() {
        currentMatch.jungleBoard = new JungleBoard();
        currentMatch.jungleBoard.initialize();
        currentMatch.isActive = true;
        currentMatch.whoseTurn = currentMatch.playerBlue;

        return saveNewMatch();
    }

    String updateMatch() {
        // TODO: Retrieve an old match from the database based on player data or Match-ID
        currentMatch.jungleBoard.resetBoard();

        boolean successfulMove = currentMatch.jungleBoard.makeMove(currentMatch.move.row, currentMatch.move.col, currentMatch.move.toRow, currentMatch.move.toCol);
        if(successfulMove) {
            if (currentMatch.whoseTurn.equals(currentMatch.playerBlue)){     //if piece was placed, switch turn to other player
                currentMatch.whoseTurn = currentMatch.playerRed;
            }else{
                currentMatch.whoseTurn = currentMatch.playerBlue;
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
            if (currentMatch.jungleBoard.getPiece(0, 3) != null) {
                currentMatch.winner = currentMatch.playerBlue;
                currentMatch.isActive = false;
            } else if (currentMatch.jungleBoard.getPiece(8, 3) != null) {
                currentMatch.winner = currentMatch.playerRed;
                currentMatch.isActive = false;
            }
        } catch (IllegalPositionException ignored) {}
    }

    private boolean saveNewMatch() {
        try {
            Statement statement = connection.createStatement();

            LocalDateTime currentTime = LocalDateTime.now();
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm-ss");

            String formattedTime = currentTime.format(timeFormatter);

            // Register new match into Game table.
            statement.execute("INSERT INTO Game VALUES (NULL, '" + currentMatch.jungleBoard.getBoardJSON() + "', " +
                    "'" + currentMatch.playerBlue + "', '" + currentMatch.playerRed + "'," +
                    "'" + currentMatch.status + "','" + currentMatch.whoseTurn + "', NULL ," +
                    "'" + formattedTime + "', NULL);");


            return true;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private String getMatchJSON() {
        return gson.toJson(currentMatch);
    }

    void closeMySQLConnection() {
        try {
            this.connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}