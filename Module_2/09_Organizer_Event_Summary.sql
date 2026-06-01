SELECT organizer_id, status, COUNT(*) AS total_events FROM Events GROUP BY organizer_id, status;
