package com.jungleapp.cs414.server;


import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.mysql.cj.protocol.Resultset;
import spark.Request;
import java.sql.*;

public class RetrieveProfile {
    Profile profile = new Profile();
    //FAURE DATABASE
    String MySQLConnectionURL = "jdbc:mysql://faure/vstepa?useTimezone=true&serverTimezone=UTC";
    String DBUsername = "vstepa";
    String DBPassword = "830982615";

    //LOCAL DATABASE
    String MySQLConnectionURL1 = "jdbc:mysql://localhost/cs414?useTimezone=true&serverTimezone=UTC";
    String DBUsername1 = "root";
    String DBPassword1 = "pass";

    Connection connection;

    RetrieveProfile(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        Gson gson = new Gson();
        profile = gson.fromJson(requestBody, Profile.class);

        establishMySQLConnection();
    }

    // Default for testing purposes.
    RetrieveProfile(String nickname, String password, String email) {
        profile.nickname = nickname;
        profile.password = password;
        profile.email = email;

        establishMySQLConnection();
    }


    private void establishMySQLConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            openMySQLConnection();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
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
            openMySQLConnection();
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

    private void openMySQLConnection() {
        try {
            try {
                connection = DriverManager.getConnection(MySQLConnectionURL, DBUsername, DBPassword);
            } catch (SQLException e) {
                e.printStackTrace();
                connection = DriverManager.getConnection(MySQLConnectionURL1, DBUsername1, DBPassword1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
