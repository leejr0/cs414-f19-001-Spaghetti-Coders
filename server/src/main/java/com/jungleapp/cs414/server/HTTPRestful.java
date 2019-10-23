package com.jungleapp.cs414.server;

import com.google.gson.Gson;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Spark;

import static spark.Spark.*;

class HTTPRestful {
    private int port;
    private String path = System.getProperty("user.home");
    Gson gson = new Gson();

    HTTPRestful(int port) {
        this.port = port;

        port(port);

        // serve the static files: index.html and bundle.js
        Spark.staticFiles.externalLocation(path + "/IdeaProjects/cs414/client/dist/public");

        // register all micro-services and the function that services them.
        // start with HTTP GET
        get("/hello", (req, res) -> "Hello World");

        post("/login", this::login);

        post("/validateNickname", this::validateNickname);
        post("/register", (req, res) -> "Temporary");


        System.out.println("\n\nServer running on port: " + this.port + "\n\n");

    }

    private String validateNickname(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        //returns true if nickname is unique
        JSONObject validationJSON = new JSONObject("{\"nickname\":\"" + true + "\"}");
        return validationJSON.toString();
    }

    private String login(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveProfile loginProfile = new RetrieveProfile(request);
        JSONObject loginJSON = new JSONObject("{\"validation\":\"" + loginProfile.establishProfileIdentity() + "\"}");
        return loginJSON.toString();
    }

}
