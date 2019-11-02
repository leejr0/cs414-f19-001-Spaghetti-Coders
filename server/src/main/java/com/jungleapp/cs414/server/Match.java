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

        //System.out.println(requestBody);
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
                this.board = board;
                board.resetBoard();
                board.makeMove(board.selectedPiece.row, board.selectedPiece.col, board.chosenMove.toRow, board.chosenMove.toCol);
                //TODO: Send state to database
            }
        } catch(Exception e){
            e.printStackTrace();
        }

    }

    public String createJSON() {
        Gson gson = new Gson();

        return gson.toJson(board);
    }
}