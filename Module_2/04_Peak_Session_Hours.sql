SELECT event_id, COUNT(*) AS total_sessions FROM Sessions WHERE HOUR(start_time) BETWEEN 10 AND 12 GROUP BY event_id;
