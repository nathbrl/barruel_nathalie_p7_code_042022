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
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    comment_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying(300) NOT NULL,
    created_at date NOT NULL,
    updated_at date,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."like" (
    like_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    comment_id uuid NOT NULL
);


ALTER TABLE public."like" OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    post_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying(300) NOT NULL,
    atachment character varying(300),
    created_at date NOT NULL,
    updated_at date,
    user_id uuid NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
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
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (comment_id, content, created_at, updated_at, post_id, user_id) FROM stdin;
\.


--
-- Data for Name: like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."like" (like_id, post_id, user_id, comment_id) FROM stdin;
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (post_id, content, atachment, created_at, updated_at, user_id) FROM stdin;
bdffc546-0d96-4cda-9d71-5cd8391243c8	Ceci est un meme	https://www.journaldunet.fr/business/dictionnaire-du-marketing/1495775-meme-definition-traduction-exemples/	2022-06-08	\N	a0885037-f649-4eac-8d2a-f33466bcf5cc
b9f69325-1b0c-4c91-b58a-eb82dc635acf	Je suis une licorne	https://cdn.shopify.com/s/files/1/0033/9532/1901/articles/Licorne_arc_en_ciel_1600x.jpg?v=1571597769	2021-06-05	\N	48c10b9e-ff4e-4867-b7bc-6cba1d0f493b
3195968a-d9a6-4c24-8a43-62b8d36f70f7	J'aime la montagne	https://www.artmajeur.com/medias/standard/m/i/michelderuyck/artwork/9650860_montagne-enneigee.jpg	2022-09-03	\N	0da19134-0b77-42e2-8e50-a07c4bb56419
e0ab39d9-1e98-426f-9842-cd6854a34e89	Le petit poucet	http://www.infobassin.com/wp-content/uploads/2018/05/Daney-Le-petit-Poucet-273x300.jpg	2022-06-20	\N	8270f9d4-de30-4ae5-a66a-e2229ee993f8
d67e8633-1d14-4d1e-ac75-263f29e60f8a	Je suis Franckie !	https://e-nautia.com/francois.durand/disk/Profil/avatar-gratuit.png	2022-06-21	2022-06-21	0da19134-0b77-42e2-8e50-a07c4bb56419
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, pseudo, email, password, is_admin, profile_picture, created_at, updated_at) FROM stdin;
4800ec5c-b616-4493-8084-cfcae4b56a55	toto	toto@test.fr	$2b$10$N5pQ5vT3He.HWK2Z/RPiOunEK251.kvJWMTQlh9KIeTztlHKAIEPy	f	\N	2022-06-07	\N
a0885037-f649-4eac-8d2a-f33466bcf5cc	tata	tata@test.fr	$2b$10$3yP9ieF7s.F3YOiu3aWgTundNG2eMfnnDYCdYQVBcnlnvhRS.hjqK	f	\N	2022-06-07	\N
0da19134-0b77-42e2-8e50-a07c4bb56419	titi	titi@test.fr	$2b$10$nBtn4T7.t7HlIyA0lz0TsepF4Ny41JI4BwwpP3JiIIFndB/V6pXVK	f	\N	2022-06-07	\N
48c10b9e-ff4e-4867-b7bc-6cba1d0f493b	tutu	tutu@test.fr	$2b$10$Q.kuplsA6MDR4APPJXiWWuOeD24Ct8FEA81jMNhbRF/sDI6dtcqEe	f	\N	2022-06-08	\N
8270f9d4-de30-4ae5-a66a-e2229ee993f8	baba	baba@test.fr	$2b$10$5Uo0KBP6KK1.xwElrHqGkuGMcaF6I7r8kikntcXW//Zu1OChWSYYi	f	\N	2022-06-20	\N
be26c6d6-6f45-4cd0-9f2b-677b600d725e	saucisson sec	bibi@test.fr	$2b$10$gLdiJoYSR/HZOonVolBeUOKcpTjUT3HKkgk9PBZgp1lZivIQ94M3m	f	https://cdn.radiofrance.fr/s3/cruiser-production/2019/12/c3c28d4a-f776-4924-99cb-b53a4023e247/1200x680_avatar.jpg	2022-06-20	2022-06-21
\.


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- Name: user email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email UNIQUE (email) INCLUDE (email);


--
-- Name: like like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT like_pkey PRIMARY KEY (like_id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- Name: user pseudo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT pseudo UNIQUE (pseudo) INCLUDE (pseudo);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: fki_comment_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_comment_id ON public."like" USING btree (comment_id);


--
-- Name: fki_post_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_post_id ON public."like" USING btree (post_id);


--
-- Name: fki_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_user_id ON public.post USING btree (user_id);


--
-- Name: like comment_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT comment_id FOREIGN KEY (comment_id) REFERENCES public.comment(comment_id) ON DELETE CASCADE;


--
-- Name: comment post_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.post(post_id) ON DELETE CASCADE;


--
-- Name: like post_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES public.post(post_id) ON DELETE CASCADE;


--
-- Name: comment user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;


--
-- Name: like user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;


--
-- Name: post user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
