CREATE TABLE ORGANIZATION(
organization_id SERIAL PRIMARY KEY,
name varchar(150) NOT NULL,
description TEXT NOT NULL,
contact_email varchar (255) NOT NULL,
logo_filename varchar(255) NOT NULL
)

INSERT INTO ORGANIZATION (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.','info@brightfuturebuilders.org','brightfuture-logo.png'),
('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers','A volunteer coordination group supporting local charities and service initiatives.','hello@unityserve.org','unityserve-logo.png')




CREATE TABLE PROJECTS(
project_id SERIAL PRIMARY KEY,
organization_id INTEGER NOT NULL,
title varchar (100) NOT NULL,
description varchar(255) NOT NULL,
location varchar (150) NOT NULL,
date DATE not null,

FOREIGN KEY (organization_id)
        REFERENCES ORGANIZATION(organization_id)
)

INSERT INTO PROJECTS (project_id, organization_id, title, description, location, date)
VALUES
(1, 1, 'Community Center Renovation', 'Renovation of a local community center to provide a safer space for residents.', 'Downtown', '2026-08-15'),

(2, 1, 'Neighborhood Playground Build', 'Building a new playground area for children in the community.', 'Riverside Park', '2026-09-10'),

(3, 1, 'Affordable Housing Project', 'Construction support for affordable housing units for local families.', 'West District', '2026-10-05'),

(4, 1, 'School Repair Initiative', 'Repairing classrooms and improving facilities at a local school.', 'Lincoln Elementary School', '2026-08-25'),

(5, 1, 'Community Garden Construction', 'Creating a shared garden space with sustainable construction methods.', 'Green Valley Area', '2026-11-12'),

(6,2, 'Urban Farming Workshop', 'Teaching residents how to grow sustainable food in urban environments.', 'Central Community Center', '2026-08-20'),

(7,2, 'Local Food Distribution', 'Providing fresh produce to families in need.', 'North Neighborhood', '2026-09-18'),

(8,2, 'School Garden Program', 'Creating gardens in schools to teach children about agriculture.', 'Jefferson School', '2026-10-15'),

(9,2, 'Sustainable Farming Training', 'Training volunteers in sustainable farming techniques.', 'GreenHarvest Farm', '2026-11-01'),

(10,2, 'Community Compost Project', 'Developing a composting program to reduce food waste.', 'City Garden Area', '2026-12-03'),

(11,3, 'Food Donation Drive', 'Collecting and distributing food donations to local families.', 'Unity Center', '2026-08-12'),

(12,3, 'Senior Support Program', 'Helping elderly community members with daily tasks.', 'East Neighborhood', '2026-09-22'),

(13,3, 'Clothing Donation Event', 'Collecting clothes and distributing them to people in need.', 'Volunteer Hall', '2026-10-08'),

(14,3, 'Community Cleanup Day', 'Organizing volunteers to clean public areas.', 'City Park', '2026-11-20'),

(15,3, 'Youth Mentoring Program', 'Connecting volunteers with young people for educational support.', 'Community Library', '2026-12-10');


select * from PROJECTS


CREATE TABLE CATEGORY (
category_id SERIAL PRIMARY KEY,
NAME varchar (150) NOT NULL UNIQUE
);


INSERT INTO category (name)
VALUES
('Environment'),
('Education'),
('Community');

SELECT * FROM CATEGORY;

CREATE TABLE PROJECT_CATEGORY (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
	PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES PROJECTS(project_id),

    FOREIGN KEY (category_id)
        REFERENCES CATEGORY(category_id));

select * FROM PROJECT_CATEGORY;

INSERT INTO PROJECT_CATEGORY (project_id, category_id)
VALUES
(1, 3),
(2, 3),
(3, 1),
(4, 2),
(5, 1),

(6, 2),
(7, 3),
(8, 2),
(9, 1),
(10, 1),

(11, 3),
(12, 2),
(13, 3),
(14, 1),
(15, 2);