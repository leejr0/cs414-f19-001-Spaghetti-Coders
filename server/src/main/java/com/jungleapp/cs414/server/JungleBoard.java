package com.jungleapp.cs414.server;

import java.util.ArrayList;
import java.util.Arrays;

public class JungleBoard {

    private Piece[][] board;
    String winner;
    String player1;
    String player2;
    String whoseTurn; //String for player name's turn
    String fromPosition;
    String toPosition;
    String errorMessage;
    boolean isActive;
    boolean createNewBoard;

    public JungleBoard() { board = new Piece[9][7]; }

    //TO-DO
    public void initialize() {
        this.placePiece(new Elephant(this,"BLUE"), "60");
    }

    public boolean placePiece(Piece piece, String position) {
        if(validPositionString(position)) {
            int rowPos = position.charAt(0)-48;
            int colPos = position.charAt(1)-48;
            board[rowPos][colPos] = piece;
            try {
                piece.setPosition(position);
            } catch (IllegalPositionException e) {

            }
            return true;
        }
        return false;
    }



    public Piece getPiece(String position) throws IllegalPositionException{
        if(!validPositionString(position)) {
            throw new IllegalPositionException("The given position is not valid.");
        }
        int rowPos = position.charAt(0) - 48;
        int colPos = position.charAt(1) - 48;

        return board[rowPos][colPos];
    }


    public void makeMove(String fromPosition, String toPosition) {
        try {
            placePiece(getPiece(fromPosition), toPosition);
        } catch(IllegalPositionException e) {

        }
        if (whoseTurn.equals(player1)){     //if piece was placed, switch turn to other player
            whoseTurn = player2;
        }else{
            whoseTurn = player1;
        }
    }

    private boolean validPositionString(String position) {
        if(position.length() != 2) { return false; }

        int rowPos = position.charAt(0)-48;
        int colPos = position.charAt(1)-48;
        return rowPos <= 8 && rowPos >= 0 && colPos >= 0 && colPos <= 6;
    }
}
