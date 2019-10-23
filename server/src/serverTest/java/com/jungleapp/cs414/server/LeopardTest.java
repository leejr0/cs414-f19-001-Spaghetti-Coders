package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class LeopardTest {

    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Leopard testLeopard = new Leopard(board, "RED");
        assertEquals(5, testLeopard.getRank());
        assertEquals("RED", testLeopard.getColor());
    }

    @Test
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Leopard(board,"RED"),"22");
        board.placePiece(new Leopard(board,"RED"),"23");
        board.placePiece(new Leopard(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}