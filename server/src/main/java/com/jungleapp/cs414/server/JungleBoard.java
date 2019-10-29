package com.jungleapp.cs414.server;

public class JungleBoard {

    private Piece[][] board;

    public JungleBoard() { board = new Piece[9][7]; }

    public void initialize() {
        this.placePiece(new Lion(this, "RED"), "00");
        this.placePiece(new Tiger(this, "RED"), "06");
        this.placePiece(new Dog(this, "RED"), "11");
        this.placePiece(new Cat(this,"RED"),"15");
        this.placePiece(new Rat(this, "RED"),"20");
        this.placePiece(new Leopard(this,"RED"),"22");
        this.placePiece(new Wolf(this, "RED"), "24");
        this.placePiece(new Elephant(this, "RED"), "26");

        this.placePiece(new Lion(this, "BLUE"), "86");
        this.placePiece(new Tiger(this, "BLUE"), "80");
        this.placePiece(new Dog(this, "BLUE"), "75");
        this.placePiece(new Cat(this,"BLUE"),"71");
        this.placePiece(new Rat(this, "BLUE"),"66");
        this.placePiece(new Leopard(this,"BLUE"),"64");
        this.placePiece(new Wolf(this, "BLUE"), "62");
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
