package com.jungleapp.cs414.server;

import spark.Request;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class Match {

    private JungleBoard board;
    public Match(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        Gson gson = new Gson();
        board = gson.fromJson(requestBody, JungleBoard.class);

        if(board.createNewBoard) {
            board = new JungleBoard();
            //TODO: Send state to database
        }
        else {

            String fromPosition = board.fromPosition;
            String toPosition = board.toPosition;
            board.makeMove(fromPosition, toPosition);
            //TODO: Send state to database
        }
    }

    public String createJSON() {
        Gson gson = new Gson();
        return gson.toJson(board);
    }
}