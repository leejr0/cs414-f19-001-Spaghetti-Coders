package com.jungleapp.cs414.server;


import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;


public class PieceTest {
    @Test
    public void testGetColor() {
        JungleBoard board = new JungleBoard();
        Elephant redElephant1 = new Elephant(board, "RED");
        Elephant blueElephant1 = new Elephant(board, "BLUE");

        assertEquals("RED", redElephant1.getColor());
        assertEquals("BLUE", blueElephant1.getColor());

    }

    @Test
    public void testSetPosition() {
        JungleBoard board = new JungleBoard();
        Elephant redElephant1 = new Elephant(board, "RED");
        try {
            redElephant1.setPosition(2, 2);
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }

        assertEquals("22", redElephant1.getPosition());
    }

    @Test
    public void testIllegalPositions() {
        JungleBoard board = new JungleBoard();
        Elephant redElephant1 = new Elephant(board, "RED");

        assertThrows(IllegalPositionException.class, ()->redElephant1.setPosition(1, 9));
        assertThrows(IllegalPositionException.class, ()->redElephant1.setPosition(-10, 2));
        assertThrows(IllegalPositionException.class, ()->redElephant1.setPosition(-1, 2));
        assertThrows(IllegalPositionException.class, ()->redElephant1.setPosition(-1, -1));

    }

    @Test
    public void testGetPosition() {
        JungleBoard board = new JungleBoard();
        Elephant redElephant1 = new Elephant(board, "RED");
        board.placePiece(redElephant1, 1, 1);

        assertEquals("11", redElephant1.getPosition());
    }

    @Test
    public void testGetPositionByIndex() {
        JungleBoard board = new JungleBoard();

        Piece piece = new Piece(new Elephant(board, "RED"));
        assertTrue(piece.getPosition(0, 0).equals("00"));
        assertTrue(piece.getPosition(6, 2).equals("62"));
        assertTrue(piece.getPosition(8, 6).equals("86"));
    }

    @Test
    public void testCheckTrapped() throws IllegalPositionException {
        JungleBoard board = new JungleBoard();

        board.placePiece(new Rat(board, "BLUE"), 0, 2);
        board.placePiece(new Rat(board, "RED"), 0, 4);
        board.placePiece(new Rat(board, "BLUE"), 2, 2);
        assertTrue(board.getPiece(0, 2).isTrapped);
        assertFalse(board.getPiece(0, 4).isTrapped);
        assertFalse(board.getPiece(2, 2).isTrapped);
    }

    @Test
    public void testCheckSpace() throws IllegalPositionException {
        JungleBoard board = new JungleBoard();
        Piece lion = new Lion(board, "RED");
        assertNull(board.getPiece(0,5));
        assertFalse(lion.checkSpace(0,0));
    }
}

