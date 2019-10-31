package com.jungleapp.cs414.server;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class ElephantTest {

    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Elephant testElephant = new Elephant(board, "RED");
        assertEquals(8, testElephant.getRank());
        assertEquals("RED", testElephant.getColor());
    }

    @Test
    public void testInitialMoves() {
        JungleBoard board = new JungleBoard();
        board.initialize();

        try {
            assertTrue(board.getPiece("26").legalMoves().containsAll(Arrays.asList("16","25","36")));
            assertTrue(board.getPiece("60").legalMoves().containsAll(Arrays.asList("50","61","70")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
    @Test
    public void testMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Elephant(board,"RED"),"22");
        board.placePiece(new Elephant(board,"RED"),"23");
        board.placePiece(new Elephant(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

}
