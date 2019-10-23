package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class DogTest {

    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Dog testDog = new Dog(board, "RED");
        assertEquals(4, testDog.getRank());
        assertEquals("RED", testDog.getColor());
    }

    @Test
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Dog(board,"RED"),"22");
        board.placePiece(new Dog(board,"RED"),"23");
        board.placePiece(new Dog(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

}