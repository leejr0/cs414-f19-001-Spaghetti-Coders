package com.jungleapp.cs414.server;

public class InitServer {
    public static void main(String[] args) {
        HTTPRestful restfulClient = new HTTPRestful(getPort(args));
    }

    private static int getPort(String[] args) {
        if (args.length > 0) {
            return Integer.parseInt(args[0]);
        } else {
            return 30631;
        }
    }
}