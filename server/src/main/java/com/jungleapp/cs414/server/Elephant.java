package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Elephant extends Piece {

    public Elephant(Piece board[][], String color){
        super(board, color);
        rank = 8;
    }

    //The elephant can move one spot in each direction as long as the spot is null or contains an enemy piece of equal or lesser rank
    public ArrayList<String> legalMoves() {
        ArrayList<String> moves = new ArrayList<String>();

        //check left
        if (column > 0) {
            if (checkSpace(row, column-1)) {
                moves.add(Integer.toString(row) + Integer.toString(column-1));
            }
        }

        //check right
        if (column < 8) {
            if (checkSpace(row, column+1)) {
                moves.add(Integer.toString(row) + Integer.toString(column+1));
            }
        }

        //check up
        if (row > 0) {
            if (checkSpace(row-1, column)) {
                moves.add(Integer.toString(row-1) + Integer.toString(column));
            }
        }

        //check down
        if (row < 8) {
            if (checkSpace(row+1, column)){
                moves.add(Integer.toString(row+1) + Integer.toString(column));
            }
        }

        return moves;
    }

}
