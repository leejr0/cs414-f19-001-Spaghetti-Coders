package com.jungleapp.cs414.server;

import spark.Request;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

public class Match {

    class tempClass {
        JungleBoard board = new JungleBoard();
        Piece piece = new Elephant(board, "BLUE");
        String winner;
        String player1 = "huh";
        String player2 = "stupid";
        String whoseTurn; //String for player name's turn
        String fromPosition;
        String toPosition;
        String errorMessage;
        boolean isActive;
        boolean createNewBoard;
    }

    private JungleBoard board;
    public Match(Request request) {
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        Gson gson = new Gson();
        System.out.println(requestBody);
        try {

            JungleBoard board = gson.fromJson(requestBody, JungleBoard.class);
            if(board.createNewBoard) {
                String player1 = board.player1;
                String player2 = board.player2;

                this.board = new JungleBoard();

                this.board.player1 = player1;
                this.board.player2 = player2;
                //TODO: Send state to database
            }
            else {

                String fromPosition = board.fromPosition;
                String toPosition = board.toPosition;
                board.makeMove(fromPosition, toPosition);
                //TODO: Send state to database
            }
        } catch(Exception e){
            System.out.println("I had an oopsie.");
        }

    }

    public String createJSON() {
        Gson gson = new Gson();

        return gson.toJson(board);
    }
}