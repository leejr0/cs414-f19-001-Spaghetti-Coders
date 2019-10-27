package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class RatTest {

    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Rat ratTest = new Rat(board, "RED");
        assertEquals(1, ratTest.getRank());
        assertEquals("RED", ratTest.getColor());
    }

    @Test
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Rat(board,"RED"),"22");
        board.placePiece(new Rat(board,"RED"),"23");
        board.placePiece(new Rat(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}