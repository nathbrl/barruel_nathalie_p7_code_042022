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
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
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
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Data for Name: like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."like" (like_id, post_id, user_id) FROM stdin;
8d0790f5-bc25-4f54-9c53-5fb58981085f    f2762dae-2e09-4409-a7fb-496e2a70ceed    bab146fc-127c-11ed-9a72-00d8612e53a4
41eed2e8-8af1-44a2-859c-97c159b2c3f3    b80a7691-a697-4c4e-b47d-a9276d695060    bab146fc-127c-11ed-9a72-00d8612e53a4
a6e000a0-7467-48bb-ac74-53d6b7dc289b    51e05509-40a8-45fa-b028-3d15010ac92c    44c2229f-b69d-4d7c-89c2-2d25604f29b5
e5732d3a-5a0e-4099-b723-4aa7a784f533    55aaaf0f-3206-4c6b-a3ec-1e057390dccd    44c2229f-b69d-4d7c-89c2-2d25604f29b5
0c05094a-6d39-4cd5-8e38-1161088ac27c    b80a7691-a697-4c4e-b47d-a9276d695060    44c2229f-b69d-4d7c-89c2-2d25604f29b5
6473ce43-20a1-4776-b589-bbaae7f33179    f2762dae-2e09-4409-a7fb-496e2a70ceed    44c2229f-b69d-4d7c-89c2-2d25604f29b5
9a525a2c-eebb-4aa3-ba3f-578672c37e7b    55aaaf0f-3206-4c6b-a3ec-1e057390dccd    1276e401-9676-4ab6-92e2-57b35a2ce506
a9b35466-b86a-43bb-a552-47c4405279e8    51e05509-40a8-45fa-b028-3d15010ac92c    1276e401-9676-4ab6-92e2-57b35a2ce506
adec9544-1cf7-4145-b35c-c78abeb78e60    f2762dae-2e09-4409-a7fb-496e2a70ceed    1276e401-9676-4ab6-92e2-57b35a2ce506
a193fa82-aab6-4fc1-b19b-9f3a87303350    b80a7691-a697-4c4e-b47d-a9276d695060    1276e401-9676-4ab6-92e2-57b35a2ce506
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (post_id, content, image, created_at, updated_at, user_id) FROM stdin;
f2762dae-2e09-4409-a7fb-496e2a70ceed    J'ai Ã©tÃ© en NorvÃ¨ge pendant les vacances prÃ©cÃ©dentes regardez ce que j'y ai vu ! :o        http://localhost:3001/images/1662717497585.jpg  2022-09-09 00:00:00+02  \N      44c2229f-b69d-4d7c-89c2-2d25604f29b5
b80a7691-a697-4c4e-b47d-a9276d695060    Je dessine depuis pas mal d'annÃ©es maintenant voici une de mes Å"uvres ! Soyez indulgents.     http://localhost:3001/images/1662717664758.jpg  2022-09-09 00:00:00+02  \N      1276e401-9676-4ab6-92e2-57b35a2ce506
51e05509-40a8-45fa-b028-3d15010ac92c    rien de mieux que des memes pour se changer les idÃ©es  http://localhost:3001/images/1663003653091.jpg  2022-09-12 00:00:00+02  \N      52fdd7cb-3116-4132-8e3f-a50d5e030fa7
793af99d-84c1-4777-bc5f-e69b3cf428bc    Besoin d'un petit cafÃ© ?       http://localhost:3001/images/1663434826268.webp
2022-09-17 19:13:46.27+02       \N      1276e401-9676-4ab6-92e2-57b35a2ce506
17ec40fe-7c4a-41c8-9918-7b966cf678a8    lol     http://localhost:3001/images/1663686727863.jpg  2022-09-20 17:12:07.871+02      \N      bab146fc-127c-11ed-9a72-00d8612e53a4
71a6c225-b7ce-4da3-8e11-0508dfd8a5d1    coucou !        \N      2022-09-19 17:37:30.416+02      2022-09-20 14:46:23.764+02      44c2229f-b69d-4d7c-89c2-2d25604f29b5
55aaaf0f-3206-4c6b-a3ec-1e057390dccd    Mon mood pendant les vacances   http://localhost:3001/images/1663678553307.png 2022-09-12 00:00:00+02   2022-09-20 14:55:53.398+02      bab146fc-127c-11ed-9a72-00d8612e53a4
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, pseudo, email, password, is_admin, profile_picture, created_at, updated_at) FROM stdin;
1276e401-9676-4ab6-92e2-57b35a2ce506    titi    titi@test.fr    $2b$10$1Kh6ICaDjGAyCp79DjMmXOBQE1HMZDEiSkqHl8WXFL9SfkIYd/Heq    f       \N      2022-06-12 00:00:00+02  \N
bab146fc-127c-11ed-9a72-00d8612e53a4    bibi    bibi@test.fr    $2b$10$hwHYZ74zDrLn1RqH3L84t.CjaubyBrFFQlgzIwLQArJFs.Xu7PABW    f       \N      2022-08-02 00:00:00+02  \N
44c2229f-b69d-4d7c-89c2-2d25604f29b5    tata    tata@test.fr    $2b$10$t6VuCEWwomYe0JLmu79WkOw8g06ln6HJg8.zIhiAgXs0D1JBXyLz6    f       \N      2022-06-06 00:00:00+02  \N
52fdd7cb-3116-4132-8e3f-a50d5e030fa7    toto    toto@test.fr    $2b$10$biWJbBOH2DjcQsvHWCQ98.cna4Dp9Oi9az4ATvbZZlA6TB8/jl5wS    t       \N      2022-06-06 00:00:00+02  \N
f739abae-3398-11ed-b1cb-00d8612e53a4    lola    lola@test.fr    $2b$10$KDHhnfSNWgoFrcN23tfn8e1TmNdnSLhDCySpxy7lXc9hQVFGYZ6pO    f       \N      2022-09-13 00:00:00+02  \N
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