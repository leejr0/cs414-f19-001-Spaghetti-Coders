package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Rat extends Piece {

    Rat(JungleBoard board, String color) {
        super(board, color);
        rank = 1;
    }

    // Rat can move to any tile. Rat can kill Elephant if both piece are on land.
    public ArrayList<String> legalMoves() {
        String position = this.getPosition();
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
        if (row < 9) {
            String checkDown = moveMaker(row+1,column);
            if (checkSpace(checkDown)){ moves.add(checkDown); }
        }

        return moves;

    }

    private boolean checkSpace(String position) {
        String currentPosition = this.getPosition();
        try {
            if (board.getPiece(position) == null){
                return true;
            }

            if(!board.getPiece(position).getColor().equals(this.getColor())){
                //If both rats are in the water, return legal move
                if (waterTiles.contains(currentPosition) && waterTiles.contains(position)) {
                    return true;
                }

                //If current rat is in water and there is a rat on land, return legal move.
                if (waterTiles.contains(currentPosition) && !waterTiles.contains(position)
                        && board.getPiece(position).getRank() == 1) {
                    return true;
                }

                // Both pieces are on land and a rat is attacking a rat or elephant, return legal move.
                if (!waterTiles.contains(currentPosition) && !waterTiles.contains(position)
                        && board.getPiece(position).getRank() == 1 || board.getPiece(position).getRank() == 8) {
                    return true;
                }

            }

        } catch (IllegalPositionException e) {
            return false;
        }

        return false;
    }

}
