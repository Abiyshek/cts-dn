SELECT user_id, COUNT(*) AS total_feedback FROM Feedback GROUP BY user_id ORDER BY total_feedback DESC LIMIT 5;
