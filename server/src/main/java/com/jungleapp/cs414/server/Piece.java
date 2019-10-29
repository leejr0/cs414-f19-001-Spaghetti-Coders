package com.jungleapp.cs414.server;

import java.util.ArrayList;
import java.util.Arrays;

public abstract class Piece {

    protected JungleBoard board;
    protected int rank;
    protected int row;
    protected int column;
    private String pieceColor;

    protected boolean isTrapped = false;
    final ArrayList<String> redTraps = new ArrayList<String>(Arrays.asList("02", "13", "04"));
    final ArrayList<String> blueTraps = new ArrayList<String>(Arrays.asList("82", "73", "84"));
    final ArrayList<String> waterTiles = new ArrayList<String>(Arrays.asList("31", "32", "41", "42", "51", "52", "34", "35", "44", "45", "54", "55"));

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
        checkTrapped();
        checkWin();
    }

    public String getPosition(){
        String result = "";
        result += Integer.toString(this.row);
        result += Integer.toString(this.column);

        return result;
    }

    //Pieces except Lion and Tiger can move one spot in each direction as long as the spot is null or contains an enemy piece of equal or lesser rank
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

    String moveMaker(int row, int column) {
        String move = "";
        move += Integer.toString(row);
        move += Integer.toString(column);
        return move;
    }

    public boolean checkSpace(String position) {
        try {
            if (waterTiles.contains(position)) {
                return false;
            }

            if (board.getPiece(position) == null){
                return true;
            }

            if(!board.getPiece(position).getColor().equals(this.getColor()) &&
                    (board.getPiece(position).getRank() <= this.getRank() || board.getPiece(position).isTrapped)){
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
            board.winner = board.whoseTurn;
            board.isActive = false;
        }
    }

}
