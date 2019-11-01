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
}

