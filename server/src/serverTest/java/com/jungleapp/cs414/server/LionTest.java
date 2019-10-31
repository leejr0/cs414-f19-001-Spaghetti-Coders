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
            assertTrue(board.getPiece("00").legalMoves().containsAll(Arrays.asList("10","01")));
            assertTrue(board.getPiece("86").legalMoves().containsAll(Arrays.asList("85","76")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Lion(board,"RED"),"22");
        board.placePiece(new Lion(board,"RED"),"23");
        board.placePiece(new Lion(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}
