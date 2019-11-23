package com.jungleapp.cs414.server;

import com.google.gson.Gson;
import spark.Request;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

class RetrieveMatches {
    private String nickname;
    private Connection connection;

    RetrieveMatches(Request request) {
        this.nickname = request.body();
        connection = MySQLConnection.establishMySQLConnection();
    }

    String getMatches() {
        try {
            Statement statement;
            statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from Game join Played_By on Game.gameID = Played_By.gameID where Played_By.nickname = '" +
                    this.nickname + "' or Played_By.nickname2 = '" + this.nickname + "'");

            //Initialize and populate match list with a list of matches gathered from the database.
            ArrayList<MatchStructure> matchList = new ArrayList <> ();
            while(resultSet.next()){
                MatchStructure matchStructure = new MatchStructure();
                matchStructure.matchID = resultSet.getInt("gameID");
                matchStructure.status = resultSet.getString("status");
                matchStructure.whoseTurn = resultSet.getString("playerTurn");
                matchStructure.winner = resultSet.getString("winner");
                matchStructure.playerBlue = resultSet.getString("nickname");
                matchStructure.playerRed = resultSet.getString("nickname2");

                matchList.add(matchStructure);
            }

            // Transform the list of matches into a suitable JSON format for front end.
            Gson gson = new Gson();
            return gson.toJson(matchList);

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Something went horribly wrong with database, return red flag.
        return null;
    }

    void closeMySQLConnection() {
        try {
            this.connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
