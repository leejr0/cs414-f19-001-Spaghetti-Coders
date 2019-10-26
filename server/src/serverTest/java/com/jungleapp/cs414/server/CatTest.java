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
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Cat(board,"RED"),"22");
        board.placePiece(new Cat(board,"RED"),"23");
        board.placePiece(new Cat(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}