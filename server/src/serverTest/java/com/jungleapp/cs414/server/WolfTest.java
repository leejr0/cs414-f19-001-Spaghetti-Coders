package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class WolfTest {

    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Wolf testWolf = new Wolf(board, "RED");
        assertEquals(3, testWolf.getRank());
        assertEquals("RED", testWolf.getColor());
    }


    @Test
    public void testInitialMoves() {
        JungleBoard board = new JungleBoard();
        board.initialize();

        try {
            assertTrue(board.getPiece(2, 4).legalMoves.containsAll(Arrays.asList("14","23","25")));
            assertTrue(board.getPiece(6, 2).legalMoves.containsAll(Arrays.asList("61","63","72")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Wolf(board,"RED"),2, 2);
        board.placePiece(new Wolf(board,"RED"),2, 3);
        board.placePiece(new Wolf(board,"RED"),1, 2);

        try {
            assertTrue(board.getPiece(2, 2).legalMoves.containsAll(Arrays.asList("21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}