CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    player_name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE game_rounds (
    round_id SERIAL PRIMARY KEY,
    player1_id INT REFERENCES players(player_id),
    player2_id INT REFERENCES players(player_id),
    player1_move VARCHAR(10) NOT NULL,
    player2_move VARCHAR(10) NOT NULL,
    winner_id INT REFERENCES players(player_id),
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

UPDATE game_rounds
SET winner_id = CASE
    WHEN player1_move = 'stone' AND player2_move = 'scissors' THEN player1_id
    WHEN player1_move = 'scissors' AND player2_move = 'paper' THEN player1_id
    WHEN player1_move = 'paper' AND player2_move = 'stone' THEN player1_id
    ELSE player2_id
END
WHERE round_id = ?;


SELECT g.round_id, p1.player_name AS player1, p2.player_name AS player2, 
       g.player1_move, g.player2_move, p_winner.player_name AS winner, g.played_at
FROM game_rounds g
JOIN players p1 ON g.player1_id = p1.player_id
JOIN players p2 ON g.player2_id = p2.player_id
LEFT JOIN players p_winner ON g.winner_id = p_winner.player_id
WHERE p1.player_id = ? OR p2.player_id = ?
ORDER BY g.played_at DESC;
