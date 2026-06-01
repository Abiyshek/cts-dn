SELECT Events.title FROM Events JOIN Registrations ON Events.event_id = Registrations.event_id LEFT JOIN Feedback ON Events.event_id = Feedback.event_id WHERE Feedback.feedback_id IS NULL;
