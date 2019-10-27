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
    public void testMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Elephant(board,"RED"),"22");
        board.placePiece(new Elephant(board,"RED"),"23");
        board.placePiece(new Elephant(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

}