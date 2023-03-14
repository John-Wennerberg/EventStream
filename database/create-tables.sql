CREATE TABLE events (
  eventID INT PRIMARY KEY AUTO_INCREMENT,
  eventTitle VARCHAR(255),
  eventDate DATE,
  eventSalesDate DATETIME,
  eventOrganizer VARCHAR(255),
  eventTicketLimit INT,
  eventDescription VARCHAR(255)
);

INSERT INTO events (eventTitle, eventDate, eventSalesDate, eventOrganizer, eventTicketLimit, eventDescription)VALUES ("Festival 1", "2023-01-31", "2023-01-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?"),
("Festival 2", "2023-03-31", "2023-01-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?"),
("Festival 3", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?"),
("Festival 4", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?"),
("Festival 5", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?"),
("Festival 6", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?"),
("Festival 7", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?");



