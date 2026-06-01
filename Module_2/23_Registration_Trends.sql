SELECT MONTH(registration_date) AS month, COUNT(*) AS total_registrations FROM Registrations GROUP BY MONTH(registration_date);
