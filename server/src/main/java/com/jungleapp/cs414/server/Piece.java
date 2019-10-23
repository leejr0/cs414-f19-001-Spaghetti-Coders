package com.jungleapp.cs414.server;

import java.util.ArrayList;

public abstract class Piece {

    public Piece[][] board;
    protected int rank;
    protected int row;
    protected int column;
    private String pieceColor;

    public Piece (Piece[][] board, String color) {
        this.board = board;
        this.pieceColor = color;
    }

    public String getColor(){
        return pieceColor;
    }


    public void setPosition(String position) {
        if(position.length() == 2) {
            int rowPos = position.charAt(0) - 48;
            int colPos = position.charAt(1) - 48;
            if(rowPos > 8 || rowPos < 0 || colPos < 0 || colPos > 6) {

            }
            else {
                this.row = rowPos;
                this.column = colPos;
            }
        }
    }

    public String getPosition(){
        String result = "";
        result += this.row;
        result += this.column;

        return result;
    }

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

    private boolean checkSpace(int r, int c) {
        if (board[r][c] == null || (!board[r][c].pieceColor.equals(this.pieceColor) && board[r][c].rank <= this.rank)){
            return true;
        }
        return false;
    }

}
