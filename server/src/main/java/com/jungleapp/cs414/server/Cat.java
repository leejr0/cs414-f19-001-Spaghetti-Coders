package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Cat extends Piece{

    Cat(JungleBoard board, String color) {
        super(board, color);
        rank = 2;
        super.legalMoves = legalMoves();
    }

    //The cat uses regular legal moves
    public ArrayList<String> legalMoves() {
        return super.legalMoves();
    }
}
