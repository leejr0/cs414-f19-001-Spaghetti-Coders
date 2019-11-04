package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Rat extends Piece {

    Rat(JungleBoard board, String color) {
        super(board, color);
        rank = 1;
        name = "rat";
        super.legalMoves = legalMoves();
    }

    Rat(Piece piece) {
        super(piece);
    }

    //The rat uses the normal legal moves method in piece, but it can also move on water so checkspace is overridden
    @Override
    public boolean checkSpace(int row, int column) {
        String currentPosition = this.getPosition(row, column);
        try {
            if (board.getPiece(row, column) == null){
                return true;
            }

            if(!board.getPiece(row, column).getColor().equals(this.getColor())){
                //If both rats are in the water, return legal move
                if (waterTiles.contains(currentPosition) && waterTiles.contains(getPosition(row,column))) {
                    return true;
                }

                //If current rat is in water and there is a rat on land, return legal move.
                if (waterTiles.contains(currentPosition) && !waterTiles.contains(getPosition(row,column))
                        && board.getPiece(row, column).getRank() == 1) {
                    return true;
                }

                // Both pieces are on land and a rat is attacking a rat or elephant, return legal move.
                if (!waterTiles.contains(currentPosition) && !waterTiles.contains(getPosition(row,column))
                        && (board.getPiece(row, column).getRank() == 1 || board.getPiece(row, column).getRank() == 8)
                        || board.getPiece(row, column).isTrapped) {
                    return true;
                }

            }

        } catch (IllegalPositionException e) {
            return false;
        }
        return false;
    }

}
