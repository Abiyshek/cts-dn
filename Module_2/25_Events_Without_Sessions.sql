SELECT Events.title FROM Events LEFT JOIN Sessions ON Events.event_id = Sessions.event_id WHERE Sessions.session_id IS NULL;
