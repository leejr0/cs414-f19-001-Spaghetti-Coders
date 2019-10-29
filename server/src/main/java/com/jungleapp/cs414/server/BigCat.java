package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class BigCat extends Piece{
    public BigCat(JungleBoard board, String color) {
        super(board, color);
    }

    //Lions and Tiger can jump water spaces so we account for that here
    public ArrayList<String> legalMoves() {
        ArrayList<String> moves = new ArrayList<String>();

        //check left
        if (column > 0) {
            String checkLeft = moveMaker(row, column - 1);

            if (checkSpace(checkLeft)) { moves.add(checkLeft); }

            // If tile is water, then jump across two water columns.
            if (checkWaterMove(checkLeft)) {
                if (checkSpace(moveMaker(row, column - 3))){
                    moves.add(moveMaker(row, column - 3));
                }
            }

        }

        //check right
        if (column < 8) {
            String checkRight = moveMaker(row, column + 1);
            if (checkSpace(checkRight)) { moves.add(checkRight); }

            if (checkWaterMove(checkRight)) {
                if (checkSpace(moveMaker(row, column + 3))) {
                    moves.add(moveMaker(row, column + 3));
                }
            }
        }

        //check up
        if (row > 0) {
            String checkUp = moveMaker(row - 1,column);
            if (checkSpace(checkUp)) { moves.add(checkUp); }

            //If tile is water, then jump across three water rows.
            if (checkWaterMove(checkUp)) {
                if (checkSpace(moveMaker(row - 4, column))){
                    moves.add(moveMaker(row - 4, column));
                }
            }
        }

        //check down
        if (row < 9) {
            String checkDown = moveMaker(row + 1,column);
            if (checkSpace(checkDown)){ moves.add(checkDown); }

            if (checkWaterMove(checkDown)) {
                if (checkSpace(moveMaker(row + 4, column))){
                    moves.add(moveMaker(row + 4, column));
                }
            }

        }

        return moves;
    }

    private boolean checkWaterMove(String position) {
        return super.waterTiles.contains(position);
    }

}
