package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class LionTest {

    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Lion testLion = new Lion(board, "RED");
        assertEquals(7, testLion.getRank());
        assertEquals("RED", testLion.getColor());
    }

    @Test
    public void testInitialMoves() {
        JungleBoard board = new JungleBoard();
        board.initialize();

        try {
            assertTrue(board.getPiece(0, 0).legalMoves.containsAll(Arrays.asList("10","01")));
            assertTrue(board.getPiece(8, 6).legalMoves.containsAll(Arrays.asList("85","76")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Lion(board,"RED"),2, 2);
        board.placePiece(new Lion(board,"RED"),2, 3);
        board.placePiece(new Lion(board,"RED"),1, 2);

        try {
            assertTrue(board.getPiece(2, 2).legalMoves.containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}
