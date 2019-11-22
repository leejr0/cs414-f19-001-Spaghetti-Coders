package com.jungleapp.cs414.server;

import java.util.ArrayList;
import java.util.Arrays;

public class Piece {

    protected transient JungleBoard board;
    protected int rank;
    protected int row;
    protected int column;
    String name;
    private String pieceColor;
    protected boolean isTrapped = false;
    protected ArrayList<String> legalMoves;

    private final ArrayList<String> redTraps = new ArrayList<String>(Arrays.asList("02", "13", "04"));
    private final ArrayList<String> blueTraps = new ArrayList<String>(Arrays.asList("82", "73", "84"));
    final ArrayList<String> waterTiles = new ArrayList<String>(Arrays.asList("31", "32", "41", "42", "51", "52", "34", "35", "44", "45", "54", "55"));
    final String redDen = "03";
    final String blueDen = "83";

    public Piece (JungleBoard board, String color) {
        this.board = board;
        this.pieceColor = color;
    }

    public Piece(Piece piece) {
        this.rank = piece.rank;
        this.row = piece.row;
        this.column = piece.column;
        this.name = piece.name;
        this.pieceColor = piece.pieceColor;
        this.isTrapped = piece.isTrapped;
        this.legalMoves = piece.legalMoves;
//        this.redTraps = piece.redTraps;
//        this.blueTraps = piece.blueTraps;
//        this.waterTiles = piece.waterTiles;
    }

    public String getColor(){
        return pieceColor;
    }

    public int getRank() { return rank; }

    void setPosition(int row, int column) throws IllegalPositionException{

        if(row > 8 || row < 0 || column < 0 || column > 6) {
            throw new IllegalPositionException("The given position is not on the board.");
        }

        this.row = row;
        this.column = column;

        //Update singular piece legalMoves for instantiation of a piece/board.
        this.legalMoves = this.legalMoves();

        //Check if the current piece is trapped
        checkTrapped();
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
    protected ArrayList<String> legalMoves() {
        ArrayList<String> moves = new ArrayList<String>();

        //check left
        if (column > 0) {
            if (checkSpace(row, column-1)) { moves.add(getPosition(row, column-1)); }
        }

        //check right
        if (column < 6) {
            if (checkSpace(row, column+1)) { moves.add(getPosition(row, column+1)); }
        }

        //check up
        if (row > 0) {
            if (checkSpace(row-1,column)) { moves.add(getPosition(row-1,column)); }
        }

        //check down
        if (row < 8) {
            if (checkSpace(row+1,column)){ moves.add(getPosition(row+1,column)); }
        }

        return moves;
    }

    private void checkTrapped() {
        //check if piece moved to a trap location of the opposite color
        isTrapped = (getColor().equals("BLUE") && redTraps.contains(getPosition()))
                || (getColor().equals("RED") && blueTraps.contains(getPosition()));
    }

    public boolean checkSpace(int row, int column) {
        try {
            if (waterTiles.contains(getPosition(row, column))) {
                return false;
            }

            if((this.getColor().equals("RED") && redDen.equals(getPosition(row, column))) ||
                    (this.getColor().equals("BLUE") && blueDen.equals(getPosition(row, column)))) {
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

    public void setBoard(JungleBoard board) {
        this.board = board;
    }
}
