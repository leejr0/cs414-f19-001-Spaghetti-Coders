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
    public void testInitialMoves() {
        JungleBoard board = new JungleBoard();
        board.initialize();

        try {
            assertTrue(board.getPiece(1, 1).legalMoves.containsAll(Arrays.asList("01","21","10","12")));
            assertTrue(board.getPiece(7, 5).legalMoves.containsAll(Arrays.asList("74","76","65","85")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Dog(board,"RED"),2, 2);
        board.placePiece(new Dog(board,"RED"),2, 3);
        board.placePiece(new Dog(board,"RED"),1, 2);

        try {
            assertTrue(board.getPiece(2, 2).legalMoves.containsAll(Arrays.asList("32","21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

}