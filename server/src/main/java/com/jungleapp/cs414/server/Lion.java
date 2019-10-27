package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Lion extends BigCat {

    Lion(JungleBoard board, String color){
        super(board, color);
        rank = 7;
    }

    public ArrayList<String> legalMoves() {
        return super.legalMoves();
    }

}
