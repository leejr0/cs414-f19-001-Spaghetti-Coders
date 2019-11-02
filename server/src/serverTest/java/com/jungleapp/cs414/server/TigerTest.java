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

        board.placePiece(new Tiger(board,"RED"),2, 2);
        board.placePiece(new Tiger(board,"RED"),2, 3);
        board.placePiece(new Tiger(board,"RED"),1, 2);

        try {
            assertTrue(board.getPiece(2, 2).legalMoves.containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}
