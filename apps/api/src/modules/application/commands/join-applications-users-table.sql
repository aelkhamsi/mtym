UPDATE applications
SET userId = (SELECT id FROM users WHERE users.applicationId = applications.id);