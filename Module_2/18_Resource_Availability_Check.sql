SELECT Events.title FROM Events LEFT JOIN Resources ON Events.event_id = Resources.event_id WHERE Resources.resource_id IS NULL;
