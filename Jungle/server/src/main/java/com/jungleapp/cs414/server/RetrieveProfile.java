package com.jungleapp.cs414.server;

public class RetrieveProfile {
    public String nickname;
    public String password;
    public String email;

    RetrieveProfile(String nickname, String password, String email) {
        this.nickname = nickname;
        this.password = password;
        this.email = email;
    }
}
