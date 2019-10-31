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
            assertTrue(board.getPiece("24").legalMoves().containsAll(Arrays.asList("14","23","25")));
            assertTrue(board.getPiece("62").legalMoves().containsAll(Arrays.asList("61","63","72")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Wolf(board,"RED"),"22");
        board.placePiece(new Wolf(board,"RED"),"23");
        board.placePiece(new Wolf(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}