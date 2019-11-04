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

        post("/login", this::login);

        post("/register", this::register);

        post("/newMatch", this::createNewMatch);

        post("/updateMatch", this::updateMatch);


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

    private String createNewMatch(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        Match match = new Match(request);
        return match.createNewMatch();
    }

    private String updateMatch(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        Match match = new Match(request);

        return match.updateMatch();
    }
}
