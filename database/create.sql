CREATE schema barber;

CREATE TABLE barber.user(
    id serial PRIMARY KEY NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE barber.client(
    id serial PRIMARY KEY,
    name character varying NOT NULL NOT NULL,
    email character varying NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);

CREATE TABLE barber.company(
    id serial PRIMARY KEY NOT NULL,
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

CREATE TABLE barber.schedule (
	id serial NOT NULL,
	id_client INTEGER NOT NULL,
	id_company INTEGER NOT NULL,
	start_date_time TIMESTAMP,
	end_date_time TIMESTAMP,
	id_service INTEGER NOT NULL,
	id_barber INTEGER NOT NULL,
	id_payment_method INTEGER NOT NULL,
	total_payment_service float NOT NULL,
	id_status INTEGER NOT NULL,
	CONSTRAINT id_schedule_company PRIMARY KEY (id, id_company),
    CONSTRAINT id_client_fkey FOREIGN KEY (id_client)
        REFERENCES barber."client" (id) MATCH SIMPLE,
    CONSTRAINT id_company_fkey FOREIGN KEY (id_company)
        REFERENCES barber."company" (id) MATCH SIMPLE  
);