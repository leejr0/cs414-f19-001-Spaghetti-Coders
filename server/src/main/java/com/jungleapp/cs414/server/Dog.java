package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Dog extends Piece{

    Dog(JungleBoard board, String color) {
        super(board, color);
        rank = 4;
    }

    //The dog uses regular legal moves
    public ArrayList<String> legalMoves() {
        return super.legalMoves();
    }
}
