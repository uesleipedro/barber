CREATE schema barber;

CREATE TABLE barber.user(
    id serial PRIMARY KEY,
    name character varying NOT NULL,
    email character varying NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);