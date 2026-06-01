SELECT Users.full_name, Events.title, Feedback.comments FROM Feedback JOIN Users ON Feedback.user_id = Users.user_id JOIN Events ON Feedback.event_id = Events.event_id WHERE Feedback.rating < 3;
