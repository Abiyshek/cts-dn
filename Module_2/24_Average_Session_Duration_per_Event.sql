SELECT event_id, AVG(TIMESTAMPDIFF(MINUTE,start_time,end_time)) AS avg_duration FROM Sessions GROUP BY event_id;
