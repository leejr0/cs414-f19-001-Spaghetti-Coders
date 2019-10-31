package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JungleBoardTest {

    @Test
    public void initialize() {
        JungleBoard board = new JungleBoard();
        board.initialize();
        try {
            assertTrue(board.getPiece("00").getRank() == 7 && board.getPiece("00").getColor().equals("RED"));
            assertTrue(board.getPiece("06").getRank() == 6 && board.getPiece("06").getColor().equals("RED"));
            assertTrue(board.getPiece("11").getRank() == 4 && board.getPiece("11").getColor().equals("RED"));
            assertTrue(board.getPiece("15").getRank() == 2 && board.getPiece("15").getColor().equals("RED"));
            assertTrue(board.getPiece("20").getRank() == 1 && board.getPiece("20").getColor().equals("RED"));
            assertTrue(board.getPiece("22").getRank() == 5 && board.getPiece("22").getColor().equals("RED"));
            assertTrue(board.getPiece("24").getRank() == 3 && board.getPiece("24").getColor().equals("RED"));
            assertTrue(board.getPiece("26").getRank() == 8 && board.getPiece("26").getColor().equals("RED"));


            assertTrue(board.getPiece("60").getRank() == 8 && board.getPiece("60").getColor().equals("BLUE"));
            assertTrue(board.getPiece("62").getRank() == 3 && board.getPiece("62").getColor().equals("BLUE"));
            assertTrue(board.getPiece("64").getRank() == 5 && board.getPiece("64").getColor().equals("BLUE"));
            assertTrue(board.getPiece("66").getRank() == 1 && board.getPiece("66").getColor().equals("BLUE"));
            assertTrue(board.getPiece("71").getRank() == 2 && board.getPiece("71").getColor().equals("BLUE"));
            assertTrue(board.getPiece("75").getRank() == 4 && board.getPiece("75").getColor().equals("BLUE"));
            assertTrue(board.getPiece("80").getRank() == 6 && board.getPiece("80").getColor().equals("BLUE"));
            assertTrue(board.getPiece("86").getRank() == 7 && board.getPiece("86").getColor().equals("BLUE"));

        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void placePiece() {
        JungleBoard board = new JungleBoard();
        assertFalse(board.placePiece(new Elephant(board, "RED"),"Position"));
        assertFalse(board.placePiece(new Elephant(board, "RED"),"97"));
        assertFalse(board.placePiece(new Elephant(board, "RED"),":0"));
        assertFalse(board.placePiece(new Elephant(board, "RED"),"/2"));
        assertFalse(board.placePiece(new Elephant(board, "RED"),"2/"));
        assertTrue(board.placePiece(new Elephant(board,"RED"),"22"));

    }

    @Test
    public void getPiece() {
        JungleBoard board = new JungleBoard();
        Elephant redElephant1 = new Elephant(board,"RED");
        board.placePiece(redElephant1,"22");

        try {
            assertEquals(redElephant1,board.getPiece("22"));
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void TestMakeMove() {
        JungleBoard board = new JungleBoard();
        board.initialize();
        board.player1 = "TestPlayer1";
        board.player2 = "TestPlayer2";
        board.whoseTurn = board.player1;
        assertEquals("TestPlayer1", board.whoseTurn);
        try {
            board.makeMove("60","50");
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }

        try {
            assertTrue(board.getPiece("60") == null);
            assertTrue(board.getPiece("50").getColor() == "BLUE" && board.getPiece("50").getRank() == 8);
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
        assertEquals("TestPlayer2", board.whoseTurn);


        try {
            board.makeMove("50","40");
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        try {
            assertTrue(board.getPiece("50") == null);
            assertTrue(board.getPiece("40").getColor() == "BLUE" && board.getPiece("40").getRank() == 8);
        } catch (IllegalPositionException e) {
            e.printStackTrace();
        }
        assertEquals("TestPlayer1", board.whoseTurn);

        assertThrows(IllegalMoveException.class, ()->board.makeMove("60","70"));
        assertThrows(IllegalMoveException.class, ()->board.makeMove("90","70"));
        assertThrows(IllegalMoveException.class, ()->board.makeMove("69","70"));
        assertThrows(IllegalMoveException.class, ()->board.makeMove("60","90"));
        assertThrows(IllegalMoveException.class, ()->board.makeMove("60","09"));
    }
}
