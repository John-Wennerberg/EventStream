CREATE TABLE events (
  eventID INT PRIMARY KEY AUTO_INCREMENT,
  eventTitle VARCHAR(255),
  eventDate DATE,
  eventSalesDate DATETIME,
  eventOrganizer VARCHAR(255),
  eventTicketLimit INT(255),
  eventDescription VARCHAR(255),
  eventImage LONGBLOB 
);

CREATE TABLE images (
  id int PRIMARY KEY AUTO_INCREMENT,
  filename VARCHAR(255),
  content LONGBLOB NOT NULL 
);

INSERT INTO events (eventTitle, eventDate, eventSalesDate, eventOrganizer, eventTicketLimit, eventDescription, eventImage ) VALUES 
("Festival 1", "2023-01-31", "2023-01-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "/Users/alfred/Documents/GitHub/webdevadv-project/frontend/public/event-image.jpg"),
("Festival 2", "2023-03-31", "2023-01-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", NULL),
("Festival 3", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", NULL),
("Festival 4", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", NULL),
("Festival 5", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", NULL),
("Festival 6", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", NULL);



