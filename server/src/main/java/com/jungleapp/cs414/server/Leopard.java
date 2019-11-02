package com.jungleapp.cs414.server;

import java.util.ArrayList;

public class Leopard extends Piece {

    Leopard(JungleBoard board, String color) {
        super(board, color);
        rank = 5;
        name = "panther";
    }

    Leopard(Piece piece) {
        super(piece);
    }
    //The leopard uses regular legal moves
    public ArrayList<String> legalMoves() {
        return super.legalMoves();
    }
}
