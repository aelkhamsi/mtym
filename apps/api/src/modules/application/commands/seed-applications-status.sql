INSERT INTO applications_status (applicationId)
SELECT id from applications;

UPDATE applications
SET statusId = (SELECT id FROM applications_status WHERE applications_status.applicationId = applications.id);
