package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Rat extends Piece {

    Rat(JungleBoard board, String color) {
        super(board, color);
        rank = 1;
    }

    //The rat uses the normal legal moves method in piece, but it can also move on water so checkspace is overridden
    public boolean checkSpace(String position) {
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
                        && (board.getPiece(position).getRank() == 1 || board.getPiece(position).getRank() == 8)
                        || board.getPiece(position).isTrapped) {
                    return true;
                }

            }

        } catch (IllegalPositionException e) {
            return false;
        }

        return false;
    }

}
