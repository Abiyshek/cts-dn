SELECT event_id, COUNT(*) AS total_sessions FROM Sessions GROUP BY event_id ORDER BY total_sessions DESC LIMIT 1;
