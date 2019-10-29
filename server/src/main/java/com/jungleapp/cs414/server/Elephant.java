package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Elephant extends Piece {

    Elephant(JungleBoard board, String color){
        super(board, color);
        rank = 8;
    }

    //The elephant uses regular legal moves
    public ArrayList<String> legalMoves() {
        return super.legalMoves();
    }

}
