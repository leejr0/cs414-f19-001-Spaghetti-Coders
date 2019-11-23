package com.jungleapp.cs414.server;


import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.mysql.cj.protocol.Resultset;
import spark.Request;
import java.sql.*;

public class RetrieveProfile {
    private Profile profile = new Profile();
    private Gson gson = new Gson();

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
            try {
                connection = MySQLConnection.establishMySQLConnection();
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

    public void getProfile() {
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from Player where Player.nickname = '" +
                    profile.nickname + "'");
            while (resultSet.next()) {
                profile.email = resultSet.getString("email");
                profile.password = resultSet.getString("password");
                profile.wins = resultSet.getInt("wins");
                profile.losses = resultSet.getInt("losses");
                if(profile.losses == 0 && profile.wins == 0) {
                    profile.ratio = 0.0;
                }
                else if(profile.losses == 0) {
                    profile.ratio = (double)profile.wins;
                }
                else if(profile.wins == 0) {
                    profile.ratio = 0.0;
                }
                else{
                    profile.ratio = (double)profile.wins/profile.losses;
                }
            }

        } catch (SQLException e) {

        }
    }

    public boolean unregisterProfile() {
        try {
            Statement statement = connection.createStatement();

            statement.executeUpdate("DELETE FROM Player WHERE Player.nickname = '" +
                    profile.nickname + "';");
            statement.executeUpdate("DELETE FROM Played_By WHERE Played_By.nickname = '" +
                    profile.nickname + "';");
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean updateProfile(){
        try {
            Statement statement = connection.createStatement();
            statement.executeUpdate("UPDATE Player SET Player.password = '" + profile.newPassword + "', Player.email = '" + profile.newEmail +
                    "' WHERE Player.nickname = '" + profile.nickname + "';");
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean searchPlayer(){
        try {
            Statement statement = connection.createStatement();
            System.out.println("select * from Player where Player.nickname = '" +
                    profile.nickname + "';");
            ResultSet resultSet = statement.executeQuery("select * from Player where Player.nickname = '" +
                    profile.nickname + "';");
            if (resultSet.next()){
                return true;
            }
            return false;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public String getProfileJSON() {
        return gson.toJson(profile);
    }

    void closeMySQLConnection() {
        try {
            this.connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
