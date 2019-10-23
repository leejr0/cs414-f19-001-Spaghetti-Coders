package com.jungleapp.cs414.server;

import com.jungleapp.cs414.server.Elephant;
import com.jungleapp.cs414.server.Piece;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ElephantTest {

    @Test
    public void testMoves() {

        Piece[][] board = new Piece[9][7];

        Elephant elephant1 = new Elephant(board,"RED");
        Elephant elephant2 = new Elephant(board,"RED");
        Elephant elephant3 = new Elephant(board,"RED");

        elephant1.setPosition("22");
        elephant1.setPosition("23");
        elephant1.setPosition("12");

        //assertTrue(elephant1.legalMoves().containsAll(Arrays.asList("")));
        //assertEquals(Arrays.asList("32","21"),elephant1.legalMoves());
    }

}
