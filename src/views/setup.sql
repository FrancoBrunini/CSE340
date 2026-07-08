CREATE TABLE ORGANIZATION(
organization_id SERIAL PRIMARY KEY,
name varchar(150) NOT NULL,
description TEXT NOT NULL,
contact_email varchar (255) NOT NULL,
logo_filename varchar(255) NOT NULL
)
