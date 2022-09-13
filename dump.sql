--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."like" (
    like_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public."like" OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    post_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying(300) NOT NULL,
    image character varying(300),
    created_at date NOT NULL,
    updated_at date,
    user_id uuid NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id uuid DEFAULT public.uuid_generate_v1() NOT NULL,
    pseudo character varying(150) NOT NULL,
    email character varying(250) NOT NULL,
    password character varying(300) NOT NULL,
    is_admin boolean NOT NULL,
    profile_picture character varying(300),
    created_at date NOT NULL,
    updated_at date
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Data for Name: like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."like" (like_id, post_id, user_id) FROM stdin;
d0c37e8f-029f-49be-9413-0ff3b6db93d0    eb882192-2844-4fc2-94a2-7a0dd98db9d4    bab146fc-127c-11ed-9a72-00d8612e53a4
1167f54e-7f5a-4a88-9f07-efe3bcb2b32e    dac5ed21-74ae-401b-8572-3782f7fcea73    bab146fc-127c-11ed-9a72-00d8612e53a4
8d0790f5-bc25-4f54-9c53-5fb58981085f    f2762dae-2e09-4409-a7fb-496e2a70ceed    bab146fc-127c-11ed-9a72-00d8612e53a4
41eed2e8-8af1-44a2-859c-97c159b2c3f3    b80a7691-a697-4c4e-b47d-a9276d695060    bab146fc-127c-11ed-9a72-00d8612e53a4
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (post_id, content, image, created_at, updated_at, user_id) FROM stdin;
f2762dae-2e09-4409-a7fb-496e2a70ceed    J'ai Ã©tÃ© en NorvÃ¨ge pendant les vacances prÃ©cÃ©dentes regardez ce que j'y ai vu ! :o        http://localhost:3001/images/1662717497585.jpg  2022-09-09      \N      44c2229f-b69d-4d7c-89c2-2d25604f29b5
b80a7691-a697-4c4e-b47d-a9276d695060    Je dessine depuis pas mal d'annÃ©es maintenant voici une de mes Å"uvres ! Soyez indulgents.     http://localhost:3001/images/1662717664758.jpg  2022-09-09      \N      1276e401-9676-4ab6-92e2-57b35a2ce506
eb882192-2844-4fc2-94a2-7a0dd98db9d4    Moi quand je corrige un bug et qu'il y en a 30 autres qui apparaissent haha !  http://localhost:3001/images/1663001183157.png   2022-09-12      \N      1276e401-9676-4ab6-92e2-57b35a2ce506
dac5ed21-74ae-401b-8572-3782f7fcea73    Besoin d'une pause cafÃ© !      http://localhost:3001/images/1663001402487.webp
2022-09-12      \N      bab146fc-127c-11ed-9a72-00d8612e53a4
55aaaf0f-3206-4c6b-a3ec-1e057390dccd    Mon mood pendant les vacances   http://localhost:3001/images/1663001648378.png 2022-09-12       \N      bab146fc-127c-11ed-9a72-00d8612e53a4
51e05509-40a8-45fa-b028-3d15010ac92c    rien de mieux que des memes pour se changer les idÃ©es  http://localhost:3001/images/1663003653091.jpg  2022-09-12      \N      52fdd7cb-3116-4132-8e3f-a50d5e030fa7
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, pseudo, email, password, is_admin, profile_picture, created_at, updated_at) FROM stdin;
1276e401-9676-4ab6-92e2-57b35a2ce506    titi    titi@test.fr    $2b$10$1Kh6ICaDjGAyCp79DjMmXOBQE1HMZDEiSkqHl8WXFL9SfkIYd/Heq    f       \N      2022-06-12      \N
bab146fc-127c-11ed-9a72-00d8612e53a4    bibi    bibi@test.fr    $2b$10$hwHYZ74zDrLn1RqH3L84t.CjaubyBrFFQlgzIwLQArJFs.Xu7PABW    f       \N      2022-08-02      \N
44c2229f-b69d-4d7c-89c2-2d25604f29b5    tata    tata@test.fr    $2b$10$t6VuCEWwomYe0JLmu79WkOw8g06ln6HJg8.zIhiAgXs0D1JBXyLz6    f       \N      2022-06-06      \N
52fdd7cb-3116-4132-8e3f-a50d5e030fa7    toto    toto@test.fr    $2b$10$biWJbBOH2DjcQsvHWCQ98.cna4Dp9Oi9az4ATvbZZlA6TB8/jl5wS    t       \N      2022-06-06      \N
\.


--
-- Name: user email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email UNIQUE (email) INCLUDE (email);


--
-- Name: like like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT like_pkey PRIMARY KEY (like_id) INCLUDE (like_id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id) INCLUDE (post_id);


--
-- Name: user pseudo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT pseudo UNIQUE (pseudo) INCLUDE (pseudo);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id) INCLUDE (user_id);


--
-- Name: fki_post_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_post_id ON public."like" USING btree (post_id);


--
-- Name: fki_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_user_id ON public.post USING btree (user_id);


--
-- Name: like post_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.post(post_id) ON DELETE CASCADE NOT VALID;


--
-- Name: like user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE NOT VALID;


--
-- Name: post user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--