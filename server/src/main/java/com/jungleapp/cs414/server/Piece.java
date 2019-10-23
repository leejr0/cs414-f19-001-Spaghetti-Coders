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

    public boolean checkSpace(int r, int c) {
        if (board[r][c] == null || (!board[r][c].pieceColor.equals(this.pieceColor) && board[r][c].rank <= this.rank)){
            return true;
        }
        return false;
    }

    abstract public ArrayList<String> legalMoves();

}
