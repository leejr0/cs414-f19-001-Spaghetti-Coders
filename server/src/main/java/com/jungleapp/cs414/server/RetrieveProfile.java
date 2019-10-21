package com.jungleapp.cs414.server;


import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;
import java.sql.*;

class RetrieveProfile {
    Profile profile;
    String MySQLConnectionURL = "jdbc:mysql://localhost:3306/jungle";
    String DBUsername = "root";
    String DBPassword = "spaghetti";
    Connection connection;

    RetrieveProfile(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        Gson gson = new Gson();
        profile = gson.fromJson(requestBody, Profile.class);

        establishMySQLConnection();
    }

    private void establishMySQLConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(
                    MySQLConnectionURL, DBUsername, DBPassword
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    boolean establishProfileIdentity() {
        boolean result = false;

        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from player;");

            while (resultSet.next()) {
                if (resultSet.getString("nickname").equals(profile.nickname)
                && resultSet.getString("password").equals(profile.password)) {
                    result = true;
                }
            }

            connection.close();
            return result;
        } catch (Exception e) {
            return false; // Something went horribly wrong
        }
    }
}
