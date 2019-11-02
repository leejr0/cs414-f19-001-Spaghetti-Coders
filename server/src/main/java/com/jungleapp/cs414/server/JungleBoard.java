package com.jungleapp.cs414.server;

import java.util.ArrayList;
import java.util.Arrays;

public class JungleBoard {

    private Piece[][] board;

    public JungleBoard() {
        board = new Piece[9][7];
        for(int i = 0; i < board.length; i++) {
            for(int j = 0; j < board[i].length; j++) {
                board[i][j] = null;
            }
        }

        initialize();
    }

    public void initialize() {
        this.placePiece(new Lion(this, "RED"), 0, 0);
        this.placePiece(new Tiger(this, "RED"), 0,6);
        this.placePiece(new Dog(this, "RED"), 1,1);
        this.placePiece(new Cat(this,"RED"),1,5);
        this.placePiece(new Rat(this, "RED"),2,0);
        this.placePiece(new Leopard(this,"RED"),2,2);
        this.placePiece(new Wolf(this, "RED"), 2,4);
        this.placePiece(new Elephant(this, "RED"), 2,6);

        this.placePiece(new Lion(this, "BLUE"), 8,6);
        this.placePiece(new Tiger(this, "BLUE"), 8,0);
        this.placePiece(new Dog(this, "BLUE"), 7,5);
        this.placePiece(new Cat(this,"BLUE"),7,1);
        this.placePiece(new Rat(this, "BLUE"),6,6);
        this.placePiece(new Leopard(this,"BLUE"),6,4);
        this.placePiece(new Wolf(this, "BLUE"), 6,2);
        this.placePiece(new Elephant(this,"BLUE"), 6,0);
    }

    public void resetBoard() {
        for(int i = 0; i < board.length; i++) {
            for(int j = 0; j < board[i].length; j++) {
                if(board[i][j] != null) {
                    board[i][j] = setPiece(board[i][j]);
                    if(board[i][j] != null) {
                        board[i][j].setBoard(this);
                    }
                }
            }
        }
    }

    private Piece setPiece(Piece piece) {
        switch(piece.name) {
            case "rat":
                return new Rat(piece);
            case "cat":
                return new Cat(piece);
            case "dog":
                return new Dog(piece);
            case "lion":
                return new Lion(piece);
            case "tiger":
                return new Tiger(piece);
            case "elephant":
                return new Elephant(piece);
            case "panther":
                return new Leopard(piece);
            case "wolf":
                return new Wolf(piece);
        }
        return null;
    }

    public boolean placePiece(Piece piece, int row, int column) {
        if(validPosition(row, column)) {
            board[row][column] = piece;
            try {
                piece.setPosition(row, column);
            } catch (IllegalPositionException e) {

            }
            return true;
        }
        return false;
    }

    public Piece getPiece(int row, int column) throws IllegalPositionException{
        if(!validPosition(row, column)) {
            throw new IllegalPositionException("The given position is not valid.");
        }

        return board[row][column];
    }

    void makeMove(int row, int column, int toRow, int toColumn) {
        try {
            placePiece(getPiece(row, column), toRow, toColumn);
            board[row][column] = null;
        } catch(IllegalPositionException ignored) {}
    }


    private boolean validPosition(int row, int column) {
        return row <= 8 && row >= 0 && column >= 0 && column <= 6;
    }
}
