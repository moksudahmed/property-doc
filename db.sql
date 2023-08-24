-- Table: Users
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    Role ENUM('Landlord', 'Property Manager', 'Tenant', 'Agent', 'Accountant')
);

-- Table: Properties
CREATE TABLE Properties (
    PropertyID INT PRIMARY KEY,
    Title VARCHAR(255),
    Description TEXT,
    Type VARCHAR(100),
    Location POINT,
    Price DECIMAL(10, 2),
    LandlordID INT,
    AgentID INT,
    FOREIGN KEY (LandlordID) REFERENCES Users(UserID),
    FOREIGN KEY (AgentID) REFERENCES Users(UserID)
);

-- Table: RentalAgreements
CREATE TABLE RentalAgreements (
    AgreementID INT PRIMARY KEY,
    TenantID INT,
    PropertyID INT,
    LeaseDuration INT,
    RentAmount DECIMAL(10, 2),
    MoveInDate DATE,
    Status ENUM('Accepted', 'Rejected', 'Pending'),
    FOREIGN KEY (TenantID) REFERENCES Users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID)
);

-- Table: MaintenanceRequests
CREATE TABLE MaintenanceRequests (
    RequestID INT PRIMARY KEY,
    TenantID INT,
    PropertyID INT,
    Description TEXT,
    RequestDate DATE,
    Status ENUM('Pending', 'In Progress', 'Completed'),
    FOREIGN KEY (TenantID) REFERENCES Users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID)
);

-- Table: Repairs
CREATE TABLE Repairs (
    RepairID INT PRIMARY KEY,
    PropertyID INT,
    TechnicianID INT,
    Description TEXT,
    ScheduledDate DATE,
    CompletionDate DATE,
    Status ENUM('Scheduled', 'In Progress', 'Completed'),
    FOREIGN KEY (PropertyID) REFERENCES Properties(PropertyID),
    FOREIGN KEY (TechnicianID) REFERENCES Users(UserID)
);

-- Table: FinancialTransactions
CREATE TABLE FinancialTransactions (
    TransactionID INT PRIMARY KEY,
    UserID INT,
    Type ENUM('Income', 'Expense'),
    Amount DECIMAL(10, 2),
    TransactionDate DATE,
    Description TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table: Messages
CREATE TABLE Messages (
    MessageID INT PRIMARY KEY,
    SenderID INT,
    ReceiverID INT,
    Content TEXT,
    Timestamp DATETIME,
    Status ENUM('Read', 'Unread'),
    FOREIGN KEY (SenderID) REFERENCES Users(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES Users(UserID)
);

-- Table: Notifications
CREATE TABLE Notifications (
    NotificationID INT PRIMARY KEY,
    UserID INT,
    Content TEXT,
    Timestamp DATETIME,
    Type VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
