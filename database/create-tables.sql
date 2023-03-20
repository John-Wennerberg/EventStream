CREATE TABLE events (
  eventID INT PRIMARY KEY AUTO_INCREMENT,
  eventTitle VARCHAR(255),
  eventDate DATE,
  eventSalesDate DATETIME,
  eventOrganizer VARCHAR(255),
  eventTicketLimit INT,
  eventDescription VARCHAR(255),
  eventImage LONGBLOB
);

CREATE TABLE accounts (
  accountID INT PRIMARY KEY AUTO_INCREMENT,
  accountUsername VARCHAR(50),
  accountHash VARCHAR(255)
);

INSERT INTO accounts(accountUsername, accountHash) VALUES
("John", ""),
("Affe", "");

 INSERT INTO events (eventTitle, eventDate, eventSalesDate, eventOrganizer, eventTicketLimit, eventDescription, eventImage ) VALUES 
 ("Festival 1", "2023-01-31", "2023-01-30 16:00:00", "John",  4, "Eddie Meduzas Greatest Hits", "./public/image/event-image.jpg"),
 ("Festival 2", "2023-03-31", "2023-01-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "./public/image/event-image.jpg"),
 ("Festival 3", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "./public/image/event-image.jpg"),
 ("Festival 4", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "./public/image/event-image.jpg"), 
 ("Festival 5", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "./public/image/event-image.jpg"),
 ("Festival 6", "2023-03-31", "2023-03-30 16:00:00", "John",  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "./public/image/event-image.jpg");



