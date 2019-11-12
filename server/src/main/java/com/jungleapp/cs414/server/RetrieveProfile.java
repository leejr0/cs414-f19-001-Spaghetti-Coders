package com.jungleapp.cs414.server;


import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.mysql.cj.protocol.Resultset;
import spark.Request;
import java.sql.*;

public class RetrieveProfile {
    private Profile profile = new Profile();

    private Connection connection;

    RetrieveProfile(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        Gson gson = new Gson();
        profile = gson.fromJson(requestBody, Profile.class);

        connection = MySQLConnection.establishMySQLConnection();
    }

    // Default for testing purposes.
    RetrieveProfile(String nickname, String password, String email) {
        profile.nickname = nickname;
        profile.password = password;
        profile.email = email;

        connection = MySQLConnection.establishMySQLConnection();
    }



    boolean establishProfileIdentity() {
        boolean result = false;

        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from Player");

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

    public boolean createNewProfile() {
        if (!establishProfileIdentity()) {
            connection = MySQLConnection.establishMySQLConnection();
            try {
                Statement statement = connection.createStatement();

                // Check if player already exists in database
                ResultSet resultSet = statement.executeQuery("select * from Player where Player.nickname = '" +
                                profile.nickname + "' or Player.email = '" +
                        profile.email + "'");

                if (resultSet.next())
                    return false;

                // Register player into the database
                statement.execute("insert into Player values ('" + profile.nickname + "', " +
                        "'" + profile.email + "','" + profile.password + "', 0, 0);");

                return true;
            } catch (SQLException e) {
                return false;
            }
        }

        return false;
    }

}
