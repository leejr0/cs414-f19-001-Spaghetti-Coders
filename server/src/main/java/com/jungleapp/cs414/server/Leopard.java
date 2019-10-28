package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Leopard extends Piece {

    Leopard(JungleBoard board, String color) {
        super(board, color);
        rank = 5;
    }

    public ArrayList<String> legalMoves() {
        return super.legalMoves();
        //TODO Implement Special Set of Moves for leopard

    }
}
