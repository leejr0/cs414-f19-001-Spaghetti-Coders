package com.jungleapp.cs414.server;


import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


public class PieceTest {
    @Test
    public void testGetColor() {
        Piece[][] board = new Piece[9][7];
        Elephant redElephant1 = new Elephant(board, "RED");
        Elephant blueElephant1 = new Elephant(board, "BLUE");

        assertTrue(redElephant1.getColor() == "RED");
        assertTrue(blueElephant1.getColor() == "BLUE");

    }

    @Test
    public void testSetPosition() {
        Piece[][] board = new Piece[9][7];
        Elephant redElephant1 = new Elephant(board, "RED");
        redElephant1.setPosition("22");

        assertEquals("22", redElephant1.getPosition());
    }
}

