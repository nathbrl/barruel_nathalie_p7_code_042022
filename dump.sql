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

INSERT INTO public."like" VALUES ('8d0790f5-bc25-4f54-9c53-5fb58981085f', 'f2762dae-2e09-4409-a7fb-496e2a70ceed', 'bab146fc-127c-11ed-9a72-00d8612e53a4');
INSERT INTO public."like" VALUES ('41eed2e8-8af1-44a2-859c-97c159b2c3f3', 'b80a7691-a697-4c4e-b47d-a9276d695060', 'bab146fc-127c-11ed-9a72-00d8612e53a4');
INSERT INTO public."like" VALUES ('a6e000a0-7467-48bb-ac74-53d6b7dc289b', '51e05509-40a8-45fa-b028-3d15010ac92c', '44c2229f-b69d-4d7c-89c2-2d25604f29b5');
INSERT INTO public."like" VALUES ('e5732d3a-5a0e-4099-b723-4aa7a784f533', '55aaaf0f-3206-4c6b-a3ec-1e057390dccd', '44c2229f-b69d-4d7c-89c2-2d25604f29b5');
INSERT INTO public."like" VALUES ('0c05094a-6d39-4cd5-8e38-1161088ac27c', 'b80a7691-a697-4c4e-b47d-a9276d695060', '44c2229f-b69d-4d7c-89c2-2d25604f29b5');
INSERT INTO public."like" VALUES ('6473ce43-20a1-4776-b589-bbaae7f33179', 'f2762dae-2e09-4409-a7fb-496e2a70ceed', '44c2229f-b69d-4d7c-89c2-2d25604f29b5');
INSERT INTO public."like" VALUES ('9a525a2c-eebb-4aa3-ba3f-578672c37e7b', '55aaaf0f-3206-4c6b-a3ec-1e057390dccd', '1276e401-9676-4ab6-92e2-57b35a2ce506');
INSERT INTO public."like" VALUES ('a9b35466-b86a-43bb-a552-47c4405279e8', '51e05509-40a8-45fa-b028-3d15010ac92c', '1276e401-9676-4ab6-92e2-57b35a2ce506');
INSERT INTO public."like" VALUES ('adec9544-1cf7-4145-b35c-c78abeb78e60', 'f2762dae-2e09-4409-a7fb-496e2a70ceed', '1276e401-9676-4ab6-92e2-57b35a2ce506');
INSERT INTO public."like" VALUES ('a193fa82-aab6-4fc1-b19b-9f3a87303350', 'b80a7691-a697-4c4e-b47d-a9276d695060', '1276e401-9676-4ab6-92e2-57b35a2ce506');
INSERT INTO public."like" VALUES ('f515ff41-1dda-46be-8354-511267d0a3d7', '17ec40fe-7c4a-41c8-9918-7b966cf678a8', 'f739abae-3398-11ed-b1cb-00d8612e53a4');
INSERT INTO public."like" VALUES ('ae2fc97b-410e-481b-adfe-e51af4080ceb', '793af99d-84c1-4777-bc5f-e69b3cf428bc', 'f739abae-3398-11ed-b1cb-00d8612e53a4');
INSERT INTO public."like" VALUES ('108c1ea6-c920-425d-b383-59bb76a872a8', '55aaaf0f-3206-4c6b-a3ec-1e057390dccd', 'f739abae-3398-11ed-b1cb-00d8612e53a4');
INSERT INTO public."like" VALUES ('46ad450e-59b2-45b2-bd76-0380669c726d', '51e05509-40a8-45fa-b028-3d15010ac92c', 'f739abae-3398-11ed-b1cb-00d8612e53a4');
INSERT INTO public."like" VALUES ('273a3277-750d-42b1-beb2-3f8b5b025b5c', 'f2762dae-2e09-4409-a7fb-496e2a70ceed', 'f739abae-3398-11ed-b1cb-00d8612e53a4');
INSERT INTO public."like" VALUES ('638f6d2e-6081-475b-9f4f-275f9d24a295', 'b80a7691-a697-4c4e-b47d-a9276d695060', 'f739abae-3398-11ed-b1cb-00d8612e53a4');
INSERT INTO public."like" VALUES ('abd86487-3df6-49b7-8394-03c8a9bb157b', 'b3821105-6d21-4ad6-a0df-797ae0331d57', 'f739abae-3398-11ed-b1cb-00d8612e53a4');


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.post VALUES ('f2762dae-2e09-4409-a7fb-496e2a70ceed', 'J''ai ├®t├® en Norv├¿ge pendant les vacances pr├®c├®dentes regardez ce que j''y ai vu ! :o', 'http://localhost:3001/images/1662717497585.jpg', '2022-09-09 00:00:00+02', NULL, '44c2229f-b69d-4d7c-89c2-2d25604f29b5');
INSERT INTO public.post VALUES ('b80a7691-a697-4c4e-b47d-a9276d695060', 'Je dessine depuis pas mal d''ann├®es maintenant voici une de mes ┼ôuvres ! Soyez indulgents.', 'http://localhost:3001/images/1662717664758.jpg', '2022-09-09 00:00:00+02', NULL, '1276e401-9676-4ab6-92e2-57b35a2ce506');
INSERT INTO public.post VALUES ('51e05509-40a8-45fa-b028-3d15010ac92c', 'rien de mieux que des memes pour se changer les id├®es', 'http://localhost:3001/images/1663003653091.jpg', '2022-09-12 00:00:00+02', NULL, '52fdd7cb-3116-4132-8e3f-a50d5e030fa7');
INSERT INTO public.post VALUES ('793af99d-84c1-4777-bc5f-e69b3cf428bc', 'Besoin d''un petit caf├® ?', 'http://localhost:3001/images/1663434826268.webp', '2022-09-17 19:13:46.27+02', NULL, '1276e401-9676-4ab6-92e2-57b35a2ce506');
INSERT INTO public.post VALUES ('17ec40fe-7c4a-41c8-9918-7b966cf678a8', 'lol', 'http://localhost:3001/images/1663686727863.jpg', '2022-09-20 17:12:07.871+02', NULL, 'bab146fc-127c-11ed-9a72-00d8612e53a4');
INSERT INTO public.post VALUES ('71a6c225-b7ce-4da3-8e11-0508dfd8a5d1', 'coucou !', NULL, '2022-09-19 17:37:30.416+02', '2022-09-20 14:46:23.764+02', '44c2229f-b69d-4d7c-89c2-2d25604f29b5');
INSERT INTO public.post VALUES ('55aaaf0f-3206-4c6b-a3ec-1e057390dccd', 'Mon mood pendant les vacances', 'http://localhost:3001/images/1663678553307.png', '2022-09-12 00:00:00+02', '2022-09-20 14:55:53.398+02', 'bab146fc-127c-11ed-9a72-00d8612e53a4');
INSERT INTO public.post VALUES ('4e3f94ba-6ef4-4837-9b55-63a296dd5340', 'hey', NULL, '2022-09-26 13:23:14.817+02', '2022-09-26 13:28:03.905+02', 'f739abae-3398-11ed-b1cb-00d8612e53a4');
INSERT INTO public.post VALUES ('b3821105-6d21-4ad6-a0df-797ae0331d57', 'lol', NULL, '2022-09-23 16:47:51.617+02', '2022-09-26 13:32:52.565+02', '44c2229f-b69d-4d7c-89c2-2d25604f29b5');
INSERT INTO public.post VALUES ('dba47029-00c9-47d6-9037-fb1d27b10bbe', 'lol', NULL, '2022-09-22 17:09:01.265+02', '2022-09-24 17:43:19.714+02', '1276e401-9676-4ab6-92e2-57b35a2ce506');


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES ('1276e401-9676-4ab6-92e2-57b35a2ce506', 'titi', 'titi@test.fr', '$2b$10$1Kh6ICaDjGAyCp79DjMmXOBQE1HMZDEiSkqHl8WXFL9SfkIYd/Heq', false, NULL, '2022-06-12 00:00:00+02', NULL);
INSERT INTO public."user" VALUES ('bab146fc-127c-11ed-9a72-00d8612e53a4', 'bibi', 'bibi@test.fr', '$2b$10$hwHYZ74zDrLn1RqH3L84t.CjaubyBrFFQlgzIwLQArJFs.Xu7PABW', false, NULL, '2022-08-02 00:00:00+02', NULL);
INSERT INTO public."user" VALUES ('44c2229f-b69d-4d7c-89c2-2d25604f29b5', 'tata', 'tata@test.fr', '$2b$10$t6VuCEWwomYe0JLmu79WkOw8g06ln6HJg8.zIhiAgXs0D1JBXyLz6', false, NULL, '2022-06-06 00:00:00+02', NULL);
INSERT INTO public."user" VALUES ('52fdd7cb-3116-4132-8e3f-a50d5e030fa7', 'toto', 'toto@test.fr', '$2b$10$biWJbBOH2DjcQsvHWCQ98.cna4Dp9Oi9az4ATvbZZlA6TB8/jl5wS', true, NULL, '2022-06-06 00:00:00+02', NULL);
INSERT INTO public."user" VALUES ('f739abae-3398-11ed-b1cb-00d8612e53a4', 'lola', 'lola@test.fr', '$2b$10$KDHhnfSNWgoFrcN23tfn8e1TmNdnSLhDCySpxy7lXc9hQVFGYZ6pO', false, NULL, '2022-09-13 00:00:00+02', NULL);
INSERT INTO public."user" VALUES ('d1f42b9e-3d8e-11ed-b508-00d8612e53a4', 'lolo', 'lolo@test.fr', '$2b$10$tv480ypzvxAaGMeSqaAMg.9owRFkl4nkVIH6sq9i597cu58SKD/SO', false, NULL, '2022-09-26 13:31:53.432+02', NULL);
INSERT INTO public."user" VALUES ('e65e152c-3d8e-11ed-8a60-00d8612e53a4', 'loli', 'loli@test.fr', '$2b$10$JT74XRf/donqVhaaDhRmwuVxEWSlUVVYGlh9uJXezuJ9Q.ynUy0/e', false, NULL, '2022-09-26 13:32:27.724+02', NULL);


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