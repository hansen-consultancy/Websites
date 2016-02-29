CREATE USER [loginname]
	FOR LOGIN [loginname]
	WITH DEFAULT_SCHEMA = [loginname]
GO

ALTER AUTHORIZATION ON SCHEMA::[loginname] TO [loginname]
GO
 
GRANT CREATE TABLE TO [loginname] 
GO 

GRANT CREATE VIEW TO [loginname] 
GO 

GRANT CREATE PROCEDURE TO [loginname] 
GO