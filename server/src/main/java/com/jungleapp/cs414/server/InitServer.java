package com.jungleapp.cs414.server;

public class InitServer {
    public static void main(String[] args) {
        MicroServer microServer = new MicroServer(getPort(args), getName(args));
    }

    private static String getName(String[] args) {
        if (args.length > 1) {
            String name = args[1];
            for (int i = 2; i < args.length; i++)
                name = name + " " + args[i];
            return name;
        }
        else
            return "Unknown";
    }

    private static int getPort(String[] args) {
        if (args.length > 0) {
            return Integer.parseInt(args[0]);
        } else {
            return 8090;
        }
    }
}