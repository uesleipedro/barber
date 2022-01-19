CREATE schema barber;

CREATE TABLE barber.user(
    id serial PRIMARY KEY,
    name character varying NOT NULL,
    email character varying NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE barber.company(
    id serial PRIMARY KEY,
    corporate_name character varying NOT NULL,
    fancy_name character varying NOT NULL,
    cnpj_cpf character varying,
    id_address INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
);