package com.jungleapp.cs414.server;

import com.google.gson.Gson;
import spark.Spark;
import spark.Request;
import spark.Response;
import static spark.Spark.*;

public class MicroServer {
    private int port;
    private String name;
    private String path = "/public/";

    MicroServer(int port, String name) {
        this.port = port;
        this.name = name;

        port(port);

        // serve the static files: index.html and bundle.js
        Spark.staticFiles.location(this.path);

//        get("/", (req, res) -> {res.redirect("index.js"); return null;});
        redirect.get("/", "index.html");
        // register all micro-services and the function that services them.
        // start with HTTP GET
        get("/hello", (req, res) -> "Hello World");

        get("/about", this::about);

//        get("/echo", this::echo);
//
//        get("/hello/:name", this::hello);
//
//        get("/team", this::team);
//
//        // client is sending data, so a HTTP POST is used instead of a GET
//        get("/config", this::config);
//
//        post("/plan", this::plan);
//
//        post("/distance", this::distance);
//
//        post("/search", this::search);

        System.out.println("\n\nServer running on port: " + this.port + "\n\n");

    }

    private String about(Request request, Response response) {
        response.type("application/json");
        response.header("Access-Control-Allow-Origin", "*");

        Gson gson = new Gson();

        RetrieveProfile new_guy = new RetrieveProfile("Zizamzoe", "1234", "zizamzoe@gmail.com");
        return gson.toJson(new_guy);
    }
}
