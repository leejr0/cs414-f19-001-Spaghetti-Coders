package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JungleBoardTest {

    @Test
    public void initialize() {
        JungleBoard board = new JungleBoard();
        board.initialize();
        try {
            assertTrue(board.getPiece(0, 0 ).getRank() == 7 && board.getPiece(0, 0).getColor().equals("RED"));
            assertTrue(board.getPiece(0, 6).getRank() == 6 && board.getPiece(0, 6).getColor().equals("RED"));
            assertTrue(board.getPiece(1, 1).getRank() == 4 && board.getPiece(1, 1).getColor().equals("RED"));
            assertTrue(board.getPiece(1, 5).getRank() == 2 && board.getPiece(1, 5).getColor().equals("RED"));
            assertTrue(board.getPiece(2, 0).getRank() == 1 && board.getPiece(2, 0).getColor().equals("RED"));
            assertTrue(board.getPiece(2, 2).getRank() == 5 && board.getPiece(2, 2).getColor().equals("RED"));
            assertTrue(board.getPiece(2, 4).getRank() == 3 && board.getPiece(2, 4).getColor().equals("RED"));
            assertTrue(board.getPiece(2, 6).getRank() == 8 && board.getPiece(2, 6).getColor().equals("RED"));


            assertTrue(board.getPiece(6, 0).getRank() == 8 && board.getPiece(6, 0).getColor().equals("BLUE"));
            assertTrue(board.getPiece(6, 2).getRank() == 3 && board.getPiece(6, 2).getColor().equals("BLUE"));
            assertTrue(board.getPiece(6, 4).getRank() == 5 && board.getPiece(6, 4).getColor().equals("BLUE"));
            assertTrue(board.getPiece(6, 6).getRank() == 1 && board.getPiece(6, 6).getColor().equals("BLUE"));
            assertTrue(board.getPiece(7, 1).getRank() == 2 && board.getPiece(7, 1).getColor().equals("BLUE"));
            assertTrue(board.getPiece(7, 5).getRank() == 4 && board.getPiece(7, 5).getColor().equals("BLUE"));
            assertTrue(board.getPiece(8, 0).getRank() == 6 && board.getPiece(8, 0).getColor().equals("BLUE"));
            assertTrue(board.getPiece(8, 6).getRank() == 7 && board.getPiece(8, 6).getColor().equals("BLUE"));

        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void placePiece() {
        JungleBoard board = new JungleBoard();
        assertFalse(board.placePiece(new Elephant(board, "RED"),9, 7));
        assertFalse(board.placePiece(new Elephant(board, "RED"),-3, 5));
        assertFalse(board.placePiece(new Elephant(board, "RED"),200415, 2));
        assertFalse(board.placePiece(new Elephant(board, "RED"),2, -312));
        assertTrue(board.placePiece(new Elephant(board,"RED"),2, 2));

    }

    @Test
    public void getPiece() {
        JungleBoard board = new JungleBoard();
        Elephant redElephant1 = new Elephant(board,"RED");
        board.placePiece(redElephant1,2, 2);

        try {
            assertEquals(redElephant1,board.getPiece(2, 2));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void move() {
    }
}
