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
    private Statement statement;

    Match(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        Gson gson = new Gson();

        currentMatch = gson.fromJson(requestBody, MatchStructure.class);

        connection = MySQLConnection.establishMySQLConnection();
    }

    // Constructor for declining match
    Match(Integer gameID) {
        currentMatch = new MatchStructure();
        currentMatch.gameID = gameID;
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
        currentMatch.status = "Pending";
        currentMatch.playerTurn = currentMatch.playerBlue;

        saveNewMatch();

        return currentMatch.jungleBoard.getBoardJSON();
    }

    //Temporary class that doesn't interfere with old functionality
    boolean createNewPendingMatch() {
        currentMatch.jungleBoard = new JungleBoard();
        currentMatch.playerTurn = currentMatch.playerBlue;

        currentMatch.status = "Pending";
        return saveNewMatch();
    }

    String updateMatch() {
        currentMatch.jungleBoard.resetBoard();

        boolean successfulMove = currentMatch.jungleBoard.makeMove(currentMatch.move.row, currentMatch.move.col, currentMatch.move.toRow, currentMatch.move.toCol);

        if(successfulMove) {
            if (currentMatch.playerTurn.equals(currentMatch.playerBlue)){     //if piece was placed, switch turn to other player
                currentMatch.playerTurn = currentMatch.playerRed;
            }else{
                currentMatch.playerTurn = currentMatch.playerBlue;
            }
            checkWin();
        }
        saveUpdatedMatch();

        return getMatchJSON();
    }

    boolean deleteMatch() {
        try {
            statement = connection.createStatement();
            statement.execute("delete from Game where gameID = " + currentMatch.gameID + ";");
            return true;
        } catch (SQLException e) {
            return false;
        }
    }

    String forfeitMatch() {
        currentMatch.jungleBoard.resetBoard();

        currentMatch.status = "Finished";

//        if (currentMatch.playerTurn.equals(currentMatch.playerBlue)) {
//            currentMatch.winner = currentMatch.playerRed;
//        } else {
//            currentMatch.winner = currentMatch.playerBlue;
//        }

        saveUpdatedMatch();
        return getMatchJSON();
    }

    private void saveUpdatedMatch() {
        try {
            statement = connection.createStatement();

            if (currentMatch.status.equals("Finished")) {
                LocalDateTime matchEndTime = LocalDateTime.now();
                DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm-ss");

                String formattedTime = matchEndTime.format(timeFormatter);

                statement.execute("UPDATE Game SET board='" + currentMatch.jungleBoard.getBoardJSON() + "'," +
                        "status='" + currentMatch.status + "'," +
                        "playerTurn='" + currentMatch.playerTurn + "'," +
                        "winner='" + currentMatch.winner + "'," +
                        "endTime='" + formattedTime + "' WHERE gameID=" + currentMatch.gameID + ";");

                //statements to add to wins and losses depending on who wins
                if (currentMatch.winner.equals(currentMatch.playerBlue)){
                    statement.execute("UPDATE Player SET wins = wins + 1 WHERE nickname = '" + currentMatch.playerBlue+ "';" );
                    statement.execute("UPDATE Player SET losses = losses + 1 WHERE nickname = '" + currentMatch.playerRed + "';" );
                }else{
                    statement.execute("UPDATE Player SET wins = wins + 1 WHERE nickname = '" + currentMatch.playerRed+ "';" );
                    statement.execute("UPDATE Player SET losses = losses + 1 WHERE nickname = '" + currentMatch.playerBlue + "';" );
                }
            }
            else {
                //Update database entry with current details.
                statement.execute("UPDATE Game SET board='" + currentMatch.jungleBoard.getBoardJSON() + "'," +
                        "status='" + currentMatch.status + "'," +
                        "playerTurn='" + currentMatch.playerTurn + "'," +
                        "winner='" + currentMatch.winner + "' WHERE gameID=" + currentMatch.gameID + ";");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //As long as a piece is inside the den, we know its a win for player. Same color pieces may not move into their own den.
    private void checkWin() {
        try {
            if (currentMatch.jungleBoard.zeroPieces("RED")) {
                currentMatch.winner = currentMatch.playerBlue;
                currentMatch.status = "Finished";
            } else if (currentMatch.jungleBoard.zeroPieces("BLUE")) {
                currentMatch.winner = currentMatch.playerRed;
                currentMatch.status = "Finished";
            }
            if (currentMatch.jungleBoard.getPiece(0, 3) != null) {
                currentMatch.winner = currentMatch.playerBlue;
                currentMatch.status = "Finished";
            } else if (currentMatch.jungleBoard.getPiece(8, 3) != null) {
                currentMatch.winner = currentMatch.playerRed;
                currentMatch.status = "Finished";
            }
        } catch (IllegalPositionException ignored) {}
    }

    private boolean saveNewMatch() {
        try {
            statement = connection.createStatement();

            LocalDateTime currentTime = LocalDateTime.now();
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm-ss");

            String formattedTime = currentTime.format(timeFormatter);

            // Register new match into Game table.
            statement.execute("INSERT INTO Game VALUES (NULL, '" + currentMatch.jungleBoard.getBoardJSON() + "', " +
                    "'" + currentMatch.playerBlue + "', '" + currentMatch.playerRed + "'," +
                    "'" + currentMatch.status + "','" + currentMatch.playerTurn + "', NULL ," +
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
            this.statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}