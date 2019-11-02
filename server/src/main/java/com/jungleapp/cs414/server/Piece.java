package com.jungleapp.cs414.server;

import java.util.ArrayList;
import java.util.Arrays;

public class Piece {

    protected transient JungleBoard board;
    protected int rank;
    protected int row;
    protected int column;
    private String pieceColor;

    protected boolean isTrapped = false;
    private final ArrayList<String> redTraps = new ArrayList<String>(Arrays.asList("02", "13", "04"));
    private final ArrayList<String> blueTraps = new ArrayList<String>(Arrays.asList("82", "73", "84"));
    final ArrayList<String> waterTiles = new ArrayList<String>(Arrays.asList("31", "32", "41", "42", "51", "52", "34", "35", "44", "45", "54", "55"));

    public Piece (JungleBoard board, String color) {
        this.board = board;
        this.pieceColor = color;
    }

    public String getColor(){
        return pieceColor;
    }

    public int getRank() { return rank; }

    public void setPosition(int row, int column) throws IllegalPositionException{

        if(row > 8 || row < 0 || column < 0 || column > 6) {
            throw new IllegalPositionException("The given position is not on the board.");
        }

        this.row = row;
        this.column = column;
        checkTrapped();
        checkWin();
    }

    String getPosition() {
        String result = "";
        result += Integer.toString(this.row);
        result += Integer.toString(this.column);
        return result;
    }

    String getPosition(int row, int column) {
        return Integer.toString(row) + Integer.toString(column);
    }

    //Pieces except Lion and Tiger can move one spot in each direction as long as the spot is null or contains an enemy piece of equal or lesser rank
    public ArrayList<String> legalMoves() {
        ArrayList<String> moves = new ArrayList<String>();

        //check left
        if (column > 0) {
            if (checkSpace(row, column-1)) { moves.add(moveMaker(row, column-1)); }
        }

        //check right
        if (column < 6) {
            if (checkSpace(row, column+1)) { moves.add(moveMaker(row, column+1)); }
        }

        //check up
        if (row > 0) {
            if (checkSpace(row-1,column)) { moves.add(moveMaker(row-1,column)); }
        }

        //check down
        if (row < 8) {
            if (checkSpace(row+1,column)){ moves.add(moveMaker(row+1,column)); }
        }

        return moves;

    }

    String moveMaker(int row, int column) {
        String move = "";
        move += Integer.toString(row);
        move += Integer.toString(column);
        return move;
    }

    public boolean checkSpace(int row, int column) {
        try {
            if (waterTiles.contains(getPosition())) {
                return false;
            }

            if (board.getPiece(row, column) == null){
                return true;
            }

            if(!board.getPiece(row, column).getColor().equals(this.getColor()) &&
                    (board.getPiece(row, column).getRank() <= this.getRank() || board.getPiece(row, column).isTrapped)){
                return true;
            }

        } catch (IllegalPositionException e) {
            return false;
        }
        return false;
    }

    public void checkTrapped() {
        //check if piece moved to a trap location of the opposite color
        if ((getColor().equals("BLUE") && redTraps.contains(getPosition()))
                || (getColor().equals("RED") && blueTraps.contains(getPosition()))) {
            isTrapped = true;
        }else{
            isTrapped = false;
        }
    }

    public void checkWin() {
        if ((getColor().equals("BLUE") && getPosition().equals("03"))
                || (getColor().equals("RED") && getPosition().equals("83"))) {

            board.declareWinner();
        }
    }

    public void setBoard(JungleBoard board) {
        this.board = board;
    }

}
