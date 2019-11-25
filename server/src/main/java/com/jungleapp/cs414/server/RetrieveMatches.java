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
        this.nickname = this.nickname.substring(1,this.nickname.length()-1);
        connection = MySQLConnection.establishMySQLConnection();
    }

    RetrieveMatches(String nickname) {
        this.nickname = nickname;
        connection = MySQLConnection.establishMySQLConnection();
    }
    String getMatches() {
        try {
            Statement statement;
            statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from Game where playerBlue = '" +
                    this.nickname + "' or playerRed = '" + this.nickname + "';");

            //Initialize and populate match list with a list of matches gathered from the database.
            ArrayList<MatchStructure> matchList = new ArrayList <> ();
            while(resultSet.next()){
                MatchStructure matchStructure = new MatchStructure();
                matchStructure.gameID = resultSet.getInt("gameID");
                matchStructure.playerBlue = resultSet.getString("playerBlue");
                matchStructure.playerRed = resultSet.getString("playerRed");
                matchStructure.status = resultSet.getString("status");
                matchStructure.playerTurn = resultSet.getString("playerTurn");
                matchStructure.winner = resultSet.getString("winner");

                matchList.add(matchStructure);
            }

            // Transform the list of matches into a suitable JSON format for front end.
            Gson gson = new Gson();
            return gson.toJson(matchList);

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Something went horribly wrong with the database, return red flag.
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
