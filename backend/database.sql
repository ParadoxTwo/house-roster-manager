CREATE DATABASE house_roster_manager;

CREATE TABLE users(
    email_id VARCHAR(255) PRIMARY KEY,
    email_id_visible BOOLEAN,
    full_name VARCHAR(255),
    dob DATE,
    dob_visible BOOLEAN,
    full_address VARCHAR(1023),
    full_address_visible BOOLEAN,
    bio VARCHAR(2047)
);