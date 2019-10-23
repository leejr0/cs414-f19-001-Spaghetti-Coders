package com.jungleapp.cs414.server;

import java.util.ArrayList;

public abstract class Piece {

    protected JungleBoard board;
    protected int rank;
    protected int row;
    protected int column;
    private String pieceColor;

    public Piece (JungleBoard board, String color) {
        this.board = board;
        this.pieceColor = color;
    }

    public String getColor(){
        return pieceColor;
    }

    public int getRank() { return rank; }

    public void setPosition(String position) throws IllegalPositionException{

        if(position.length() != 2) {
            throw new IllegalPositionException("The given position is not of valid form.");
        }
        int rowPos = position.charAt(0) - 48;
        int colPos = position.charAt(1) - 48;

        if(rowPos > 8 || rowPos < 0 || colPos < 0 || colPos > 6) {
            throw new IllegalPositionException("The given position is not on the board.");
        }

        this.row = rowPos;
        this.column = colPos;
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
            String checkLeft = moveMaker(row, column-1);
            if (checkSpace(checkLeft)) { moves.add(checkLeft); }
        }

        //check right
        if (column < 8) {
            String checkRight = moveMaker(row, column+1);
            if (checkSpace(checkRight)) { moves.add(checkRight); }
        }

        //check up
        if (row > 0) {
            String checkUp = moveMaker(row-1,column);
            if (checkSpace(checkUp)) { moves.add(checkUp); }
        }

        //check down
        if (row < 8) {
            String checkDown = moveMaker(row+1,column);
            if (checkSpace(checkDown)){ moves.add(checkDown); }
        }

        return moves;

    }

    private String moveMaker(int row, int column) {
        String move = "";
        move += row;
        move += column;
        return move;
    }

    private boolean checkSpace(String position) {
        try {
            if (board.getPiece(position) == null){
                return true;
            }
            else if(board.getPiece(position).getColor() != this.getColor() && board.getPiece(position).getRank() <= this.getRank()){
                return true;
            }
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
        return false;
    }

}
