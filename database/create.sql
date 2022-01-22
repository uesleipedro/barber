CREATE schema barber;

CREATE TABLE barber.user(
    id serial PRIMARY KEY,
    name character varying NOT NULL,
    email character varying NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE barber.client(
    id serial PRIMARY KEY,
    name character varying NOT NULL,
    email character varying NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE barber.company(
    id serial PRIMARY KEY,
    corporate_name character varying NOT NULL,
    fancy_name character varying NOT NULL,
    cnpj_cpf character varying,
    id_address INTEGER,
    id_user INTEGER NOT NULL,
    updated_at TIMESTAMP,
    CONSTRAINT company_pkey PRIMARY KEY (id),
    CONSTRAINT user_fkey FOREIGN KEY (id_user)
        REFERENCES barber."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);