package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Rat extends Piece {

    Rat(JungleBoard board, String color) {
        super(board, color);
        rank = 1;
    }

    public ArrayList<String> legalMoves() {
        return super.legalMoves();

        //TODO Implement Special Set of Moves for rat
    }
}
