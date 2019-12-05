package com.jungleapp.cs414.server;

import com.google.gson.Gson;
import jdk.nashorn.internal.parser.JSONParser;
import org.json.JSONObject;
import spark.Request;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

class RetrieveMatches {
    private String nickname;
    private int ID;
    private Connection connection;
    private Statement statement;
    private ResultSet resultSet;

    RetrieveMatches(Request request, Boolean getBoard) {
        if(!getBoard) {
            this.nickname = request.body();
            this.nickname = this.nickname.substring(1, this.nickname.length()-1);
        }
        else{
            this.ID = Integer.parseInt(request.body());
        }

        connection = MySQLConnection.establishMySQLConnection();
    }

    RetrieveMatches(String nickname) {
        this.nickname = nickname;
        connection = MySQLConnection.establishMySQLConnection();
    }
    String getMatches() {
        try {
            statement = connection.createStatement();
            resultSet = statement.executeQuery("select * from Game where playerBlue = '" +
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

    String getMatch() {
        try {
            statement = connection.createStatement();

            resultSet = statement.executeQuery("select * from Game where gameID = " +
                    this.ID + ";");

            String response = "";
            String status = "";
            while(resultSet.next()){
                response = resultSet.getString("board");
                status = resultSet.getString("status");
            }

            if(status.equals("Pending")) {
                //Update the match to be active
                statement.execute("UPDATE Game SET status='Active'" + " WHERE gameID='" + this.ID + "';");
            }

            return response;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Something went horribly wrong with the database, return red flag.
        return null;
    }

    void closeMySQLConnection() {
        try {
            this.connection.close();
            this.statement.close();
            this.resultSet.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
