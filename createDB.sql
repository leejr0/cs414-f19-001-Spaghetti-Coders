DROP TABLE IF EXISTS Player, Game;

CREATE TABLE Player(
    nickname 		VARCHAR(20)				NOT NULL,
    email			VARCHAR(50)				NOT NULL,
    password		VARCHAR(20)				NOT NULL,
    wins			INT					    NOT NULL,
    losses			INT					    NOT NULL,
    PRIMARY KEY		(nickname)
);

CREATE TABLE Game(
    gameID			INT					    NOT NULL			AUTO_INCREMENT,
    board			JSON					NOT NULL,
    playerBlue		VARCHAR(20)				NOT NULL,
    playerRed       VARCHAR(20)             NOT NULL,
    status			VARCHAR(10)				NOT NULL,
    playerTurn      VARCHAR(20)             NOT NULL,
    winner			VARCHAR(20),
    startTime		datetime				NOT NULL,
    endTime			datetime,
    PRIMARY KEY 	(gameID)
);