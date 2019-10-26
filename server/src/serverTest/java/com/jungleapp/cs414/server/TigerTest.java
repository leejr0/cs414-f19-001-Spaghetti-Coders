package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class TigerTest {


    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Tiger testTiger = new Tiger(board, "RED");
        assertEquals(6, testTiger.getRank());
        assertEquals("RED", testTiger.getColor());
    }
    @Test
    public void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Tiger(board,"RED"),"22");
        board.placePiece(new Tiger(board,"RED"),"23");
        board.placePiece(new Tiger(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}
