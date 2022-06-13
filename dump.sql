--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    comment_id uuid NOT NULL,
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
    like_id uuid NOT NULL,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    comment_id uuid NOT NULL
);


ALTER TABLE public."like" OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    post_id uuid NOT NULL,
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
    user_id uuid NOT NULL,
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