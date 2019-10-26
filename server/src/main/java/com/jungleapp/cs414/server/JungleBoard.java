package com.jungleapp.cs414.server;

public class JungleBoard {

    private Piece[][] board;

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
                e.printStackTrace();
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

    //TO-DO
    public void move(String fromPosition, String toPosition) {

    }
    private boolean validPositionString(String position) {
        if(position.length() != 2) { return false; }

        int rowPos = position.charAt(0)-48;
        int colPos = position.charAt(1)-48;
        if(rowPos > 8 || rowPos < 0 || colPos < 0 || colPos > 6) {
            return false;
        }

        return true;
    }
}
