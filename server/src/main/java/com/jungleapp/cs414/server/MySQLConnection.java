package com.jungleapp.cs414.server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

class MySQLConnection {
    static Connection establishMySQLConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return openMySQLConnection();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return null;
    }

    static Connection openMySQLConnection() {
        try {
            //FAURE DATABASE
            String mySQLConnectionURL = "jdbc:mysql://faure/vstepa?useTimezone=true&serverTimezone=UTC";
            String DBUsername = "vstepa";
            String DBPassword = "830982615";

            //LOCAL DATABASE
//            String mySQLConnectionURL = "jdbc:mysql://localhost:3306/cs414?useTimezone=true&serverTimezone=UTC";
//            String DBUsername = "root";
//            String DBPassword = "pass";

            return DriverManager.getConnection(mySQLConnectionURL, DBUsername, DBPassword);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

}
