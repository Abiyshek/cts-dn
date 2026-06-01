SELECT Events.city, AVG(Feedback.rating) AS avg_rating FROM Events JOIN Feedback ON Events.event_id = Feedback.event_id GROUP BY Events.city;
