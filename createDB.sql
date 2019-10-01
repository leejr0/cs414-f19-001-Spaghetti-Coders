DROP TABLE IF EXISTS Played_By, Player, Game;

CREATE TABLE Player(
	nickname 		VARCHAR(20)				NOT NULL,
	email				VARCHAR(50)				NOT NULL,
	password			VARCHAR(20)				NOT NULL,
	wins				INT						NOT NULL,
	losses			INT						NOT NULL,
	PRIMARY KEY		(nickname)
);

CREATE TABLE Game(
	gameID			INT						NOT NULL			AUTO_INCREMENT,
	board				JSON						NOT NULL,
	status			VARCHAR(10)				NOT NULL,
	winner			VARCHAR(20),
	startTime		datetime					NOT NULL,
	endTime			datetime,
	PRIMARY KEY 	(gameID)
);

CREATE TABLE Played_By(
	gameID			INT						NOT NULL,
	nickname			VARCHAR(20)				NOT NULL,
	FOREIGN KEY		(gameID)					REFERENCES		Game (gameID)		ON DELETE CASCADE,
	FOREIGN KEY		(nickname)				REFERENCES		Player (nickname)	ON DELETE CASCADE,
	PRIMARY KEY 	(gameID, nickname)	
);

