package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Tiger extends BigCat{

    Tiger(JungleBoard board, String color){
        super(board, color);
        rank = 6;
        name = "tiger";
    }

    Tiger(Piece piece) {
        super(piece);
    }

    //The tiger uses the legal moves method in BigCat
    public ArrayList<String> legalMoves() {
        return super.legalMoves();
    }
}
