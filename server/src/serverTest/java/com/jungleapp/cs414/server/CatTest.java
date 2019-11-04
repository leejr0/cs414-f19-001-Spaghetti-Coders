package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class CatTest {

    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Cat catTest = new Cat(board, "RED");
        assertEquals(2, catTest.getRank());
        assertEquals("RED", catTest.getColor());
    }

    @Test
    public void testInitialMoves() {
        JungleBoard board = new JungleBoard();
        board.initialize();

        try {
            assertTrue(board.getPiece(1, 5).legalMoves().containsAll(Arrays.asList("05","25","14","16")));
            assertTrue(board.getPiece(1, 5).legalMoves().containsAll(Arrays.asList("05", "25", "14", "16")));
            assertTrue(board.getPiece(7, 1).legalMoves().containsAll(Arrays.asList("81","61","72","70")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Cat(board,"RED"),2, 2);
        board.placePiece(new Cat(board,"RED"),2, 3);
        board.placePiece(new Cat(board,"RED"),1, 2);

        try {
            assertTrue(board.getPiece(2, 2).legalMoves().containsAll(Arrays.asList("21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}