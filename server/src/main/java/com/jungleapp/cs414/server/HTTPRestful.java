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

        get("/getRandomPlayer", this::getRandomPlayer);

        post("/login", this::login);

        post("/register", this::register);

        post("/newMatch", this::createNewMatch);

        post("/updateMatch", this::updateMatch);

        post("/retrieveProfile", this::retrieveProfile);

        post("/unregister", this::unregisterProfile);

        post("/updateProfile", this::updateProfile);

        post("/searchPlayer", this::searchPlayer);

        post("/invitePlayer", this::invitePlayer);

        post("/retrieveMatch", this::retrieveMatch);

        post("/declineMatch", this::declineMatch);

        System.out.println("\n\nServer running on port: " + this.port + "\n\n");

    }

    private boolean register(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveProfile retrieveProfile = new RetrieveProfile(request);
        boolean result = retrieveProfile.createNewProfile();
        retrieveProfile.closeMySQLConnection();

        return result;
    }

    private boolean login(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveProfile loginProfile = new RetrieveProfile(request);
        boolean result = loginProfile.establishProfileIdentity();
        loginProfile.closeMySQLConnection();

        return result;
    }

    private boolean searchPlayer(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        RetrieveProfile searchProfile = new RetrieveProfile(request);
        boolean result = searchProfile.searchPlayer();
        searchProfile.closeMySQLConnection();

        return result;
    }

    private String getRandomPlayer(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        // TODO: Implement random player search
        RetrieveProfile loginProfile = new RetrieveProfile(request);

        return "";
    }

    //Class that doesn't interfere with other functionality
    private boolean invitePlayer(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        // TODO: Implement invitation mechanic
        Match match = new Match(request);

        return match.createNewPendingMatch();
    }

    private String createNewMatch(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        Match match = new Match(request);
        String result = match.createNewMatch();
        match.closeMySQLConnection();

        return result;
    }

    private String updateMatch(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        Match match = new Match(request);
        String result = match.updateMatch();
        match.closeMySQLConnection();

        return result;
    }

    private String retrieveProfile(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveProfile loginProfile = new RetrieveProfile(request);
        loginProfile.getProfile();
        String result = loginProfile.getProfileJSON();
        loginProfile.closeMySQLConnection();

        return result;
    }

    private boolean unregisterProfile(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveProfile removeProfile = new RetrieveProfile(request);
        boolean result = removeProfile.unregisterProfile();
        removeProfile.closeMySQLConnection();

        return result;
    }

    private boolean updateProfile(Request request, Response response){
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveProfile updateProfile = new RetrieveProfile(request);
        boolean result = updateProfile.updateProfile();
        updateProfile.closeMySQLConnection();

        return result;
    }

    private String retrieveMatches(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        RetrieveMatches retrieveMatches = new RetrieveMatches(request);

        String result = retrieveMatches.getMatches();
        retrieveMatches.closeMySQLConnection();

        return result;
    }

    private boolean retrieveMatch(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        System.out.println("I made it!");
        return true;
    }

    private boolean declineMatch(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");
        System.out.println("Declining");
        return true;
    }
}
