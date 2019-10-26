package com.jungleapp.cs414.server;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JungleBoardTest {

    @Test
    public void initialize() {
        JungleBoard board = new JungleBoard();
        board.initialize();
        try {
            assertEquals(8,board.getPiece("60").getRank());
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
    public void move() {
    }
}
