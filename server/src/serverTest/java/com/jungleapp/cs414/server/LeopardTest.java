package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class LeopardTest {

    @Test
    public void testConstructor() {
        JungleBoard board = new JungleBoard();
        Leopard testLeopard = new Leopard(board, "RED");
        assertEquals(5, testLeopard.getRank());
        assertEquals("RED", testLeopard.getColor());
    }


    @Test
    public void testInitialMoves() {
        JungleBoard board = new JungleBoard();
        board.initialize();

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("12","21","23")));
            assertTrue(board.getPiece("64").legalMoves().containsAll(Arrays.asList("63","65","74")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
    @Test
    void legalMoves() {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Leopard(board,"RED"),"22");
        board.placePiece(new Leopard(board,"RED"),"23");
        board.placePiece(new Leopard(board,"RED"),"12");

        try {
            assertTrue(board.getPiece("22").legalMoves().containsAll(Arrays.asList("21")));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }
}