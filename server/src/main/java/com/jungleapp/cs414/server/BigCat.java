package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class BigCat extends Piece{
    public BigCat(JungleBoard board, String color) {
        super(board, color);
        super.legalMoves = legalMoves();
    }

    //Lions and Tiger can jump water spaces so we account for that here
    public ArrayList<String> legalMoves() {
        ArrayList<String> moves = new ArrayList<String>();

        //check left
        if (column > 0) {
            String checkLeft = moveMaker(row, column - 1);
            if (checkSpace(row, column - 1)) { moves.add(checkLeft); }

            // If tile is water, then jump across two water columns.
            if (checkWaterMove(checkLeft)) {
                if (checkJump("LEFT")){
                    moves.add(moveMaker(row, column - 3));
                }
            }

        }

        //check right
        if (column < 6) {
            String checkRight = moveMaker(row, column + 1);
            if (checkSpace(row, column + 1)) { moves.add(checkRight); }

            if (checkWaterMove(checkRight)) {
                if (checkJump("RIGHT")) {
                    moves.add(moveMaker(row, column + 3));
                }
            }
        }

        //check up
        if (row > 0) {
            String checkUp = moveMaker(row - 1,column);
            if (checkSpace(row - 1, column)) { moves.add(checkUp); }

            //If tile is water, then jump across three water rows.
            if (checkWaterMove(checkUp)) {
                if (checkJump("UP")){
                    moves.add(moveMaker(row - 4, column));
                }
            }
        }

        //check down
        if (row < 8) {
            String checkDown = moveMaker(row + 1,column);
            if (checkSpace(row + 1, column)){ moves.add(checkDown); }

            if (checkWaterMove(checkDown)) {
                if (checkJump("DOWN")){
                    moves.add(moveMaker(row + 4, column));
                }
            }

        }

        return moves;
    }

    private boolean checkJump(String direction) {
        // Check for vertical water tiles, either UP or DOWN by checking if a tiles contain a piece or not.
        if(direction.equals("UP") || direction.equals("DOWN")) {
            try {
                for(int i = 1; i < 4; i++){
                    if (direction.equals("UP")) {
                        if (board.getPiece(row + i, column) != null) { return false; }
                    }
                    else
                        if(board.getPiece(row - i, column) != null) {return false;}
                }
                switch (direction) {
                    case "UP" :
                        return checkSpace(row + 4, column);
                    case "DOWN" :
                        return checkSpace(row - 4, column);
                }

            } catch (IllegalPositionException e) { return false; }
        }

        // Check for horizontal tiles, either LEFT or RIGHT by checking if the following tiles contain a piece or not.
        if(direction.equals("RIGHT") || direction.equals("LEFT")) {
            try {
                for(int i = 1; i < 3; i++){
                    if(direction.equals("RIGHT")) {
                        if (board.getPiece(row, column + i) != null) {
                            return false;
                        }
                    } else
                        if(board.getPiece(row, column - i ) != null) {return false;}
                }

                switch (direction) {
                    case "RIGHT" :
                        return checkSpace(row , column + 3);
                    case "LEFT" :
                        return checkSpace(row, column - 3);
                }
            } catch (IllegalPositionException e) { return false; }
        }

        return true;
    }


    private boolean checkWaterMove(String position) {
        return super.waterTiles.contains(position);
    }

}
