package com.jungleapp.cs414.server;

import com.jungleapp.cs414.server.Elephant;
import com.jungleapp.cs414.server.Piece;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ElephantTest {

    @Test
    public void testMoves() {

        Piece[][] board = new Piece[9][7];

        Elephant elephant = new Elephant(board,"RED");

        board[2][3] = elephant;

        assertEquals("RED", board[2][3].getColor());
    }

}
