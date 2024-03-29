CREATE TABLE accounts (
  accountID INT PRIMARY KEY AUTO_INCREMENT,
  accountUsername VARCHAR(50),
  accountHash VARCHAR(1024) CHARACTER SET utf8
);

CREATE TABLE events (
  eventID INT PRIMARY KEY AUTO_INCREMENT,
  eventTitle VARCHAR(255),
  eventDate DATE,
  eventSalesDate DATETIME,
  eventOrganizerID INT,
  eventTicketLimit INT,
  eventDescription VARCHAR(255),
  eventImage LONGBLOB,
  eventForms VARCHAR(255),
  FOREIGN KEY(eventOrganizerID) REFERENCES accounts(accountID)
);

CREATE TABLE comments (
  commentID INT PRIMARY KEY AUTO_INCREMENT,
  commentAuthor VARCHAR(50),
  commentBody VARCHAR(255),
  commentEventID INT,
  FOREIGN KEY(commentEventID) REFERENCES events(eventID)
);

INSERT INTO accounts(accountUsername, accountHash) VALUES
("admin", "2b$10$FTPi65.5QZqIzqLSZAHEPuo9sGPpJjAaaUjYlUd5SL79R2Xa28VGG");

INSERT INTO events (eventTitle, eventDate, eventSalesDate, eventOrganizerID, eventTicketLimit, eventDescription, eventImage, eventForms) VALUES 
("Festival 1", "2023-01-31", "2023-01-30 16:00:00", 1,  4, "Eddie Meduzas Greatest Hits", "", '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdKEqgyLrUpa6C68T5_7wuxaTpCs1TqQT_dIkcF4XmRjeESTg/viewform?embedded=true" width="640" height="694" frameborder="0" marginheight="0" marginwidth="0">Läser in …</iframe>'),
("Festival 2", "2023-03-31", "2023-01-30 16:00:00", 1,  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "", '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdKEqgyLrUpa6C68T5_7wuxaTpCs1TqQT_dIkcF4XmRjeESTg/viewform?embedded=true" width="640" height="694" frameborder="0" marginheight="0" marginwidth="0">Läser in …</iframe>'),
("Festival 3", "2023-03-31", "2023-03-30 16:00:00", 1,  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "", '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdKEqgyLrUpa6C68T5_7wuxaTpCs1TqQT_dIkcF4XmRjeESTg/viewform?embedded=true" width="640" height="694" frameborder="0" marginheight="0" marginwidth="0">Läser in …</iframe>'),
("Festival 4", "2023-03-31", "2023-03-30 16:00:00", 1,  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "", '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdKEqgyLrUpa6C68T5_7wuxaTpCs1TqQT_dIkcF4XmRjeESTg/viewform?embedded=true" width="640" height="694" frameborder="0" marginheight="0" marginwidth="0">Läser in …</iframe>'), 
("Festival 5", "2023-03-31", "2023-03-30 16:00:00", 1,  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "", '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdKEqgyLrUpa6C68T5_7wuxaTpCs1TqQT_dIkcF4XmRjeESTg/viewform?embedded=true" width="640" height="694" frameborder="0" marginheight="0" marginwidth="0">Läser in …</iframe>'),
("Festival 6", "2023-03-31", "2023-03-30 16:00:00", 1,  4, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta tenetur cum saepe?", "", '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdKEqgyLrUpa6C68T5_7wuxaTpCs1TqQT_dIkcF4XmRjeESTg/viewform?embedded=true" width="640" height="694" frameborder="0" marginheight="0" marginwidth="0">Läser in …</iframe>');

INSERT INTO comments(commentAuthor, commentBody, commentEventID) VALUES
("John", "This event was amazing", 4),
("User", "This event sucked man!!!!!!!", 4),
("User", "This event sucked man!!!!!!!", 1),
("User", "This event sucked man!!!!!!!", 2),
("User", "This event sucked man!!!!!!!", 3),
("User", "This event sucked man!!!!!!!", 4);

