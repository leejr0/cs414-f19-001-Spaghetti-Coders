package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Tiger extends BigCat{

    Tiger(JungleBoard board, String color){
        super(board, color);
        rank = 6;
    }

    public ArrayList<String> legalMoves() {
        return super.legalMoves();
    }
}
