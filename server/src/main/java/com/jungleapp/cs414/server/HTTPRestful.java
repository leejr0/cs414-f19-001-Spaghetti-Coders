package com.jungleapp.cs414.server;

import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Spark;

import static spark.Spark.*;

class HTTPRestful {
    private int port;
    private String path = System.getProperty("user.home");

    HTTPRestful(int port) {
        this.port = port;

        port(port);

        // serve the static files: index.html and bundle.js
        Spark.staticFiles.externalLocation(path + "/IdeaProjects/cs414/client/dist/public");

        // register all micro-services and the function that services them.
        // start with HTTP GET
        get("/hello", (req, res) -> "Hello World");

        get("board", this::board);

        post("/login", this::login);

        post("/register", this::register);

        post("/move", this::move);


        System.out.println("\n\nServer running on port: " + this.port + "\n\n");

    }

    private boolean register(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveProfile retrieveProfile = new RetrieveProfile(request);

        return retrieveProfile.createNewProfile();
    }

    private boolean login(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveProfile loginProfile = new RetrieveProfile(request);

        return loginProfile.establishProfileIdentity();
    }

    private String board(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        //Return the initial board
        return null;
    }

    private String move(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        //Return the board state with the move completed, and the winner, players etc.
        return null;
    }
}
