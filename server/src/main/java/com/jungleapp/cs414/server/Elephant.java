package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Elephant extends Piece {

    public Elephant(Piece board[][], String color){
        super(board, color);
        rank = 8;
    }

    //The elephant can move one spot in each direction as long as the spot is null or contains an enemy piece of equal or lesser rank
    public ArrayList<String> legalMoves() {
        return super.legalMoves();
    }

}
