WARNING:  database "guardiandb" has a collation version mismatch
DETAIL:  The database was created using collation version 2.36, but the operating system provides version 2.41.
HINT:  Rebuild all objects in this database that use the default collation and run ALTER DATABASE guardiandb REFRESH COLLATION VERSION, or build PostgreSQL with the right library version.
--
-- PostgreSQL database dump
--

\restrict gfsSpTigEWZy7ROYFY4iCmrQayyHfPU8kIzzpUKctsnW9eCMhBrepYQFgHSNYJn

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

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
-- Name: t_cabang; Type: TABLE; Schema: public; Owner: guardian
--

CREATE TABLE public.t_cabang (
    id_cabang uuid DEFAULT gen_random_uuid() NOT NULL,
    nama_cabang text NOT NULL
);


ALTER TABLE public.t_cabang OWNER TO guardian;

--
-- Name: t_customer; Type: TABLE; Schema: public; Owner: guardian
--

CREATE TABLE public.t_customer (
    id_customer uuid DEFAULT gen_random_uuid() NOT NULL,
    nama text NOT NULL,
    nohp text NOT NULL,
    tgl_lahir date
);


ALTER TABLE public.t_customer OWNER TO guardian;

--
-- Name: t_customer_card; Type: TABLE; Schema: public; Owner: guardian
--

CREATE TABLE public.t_customer_card (
    id_customer_card uuid DEFAULT gen_random_uuid() NOT NULL,
    gula real NOT NULL,
    kolesterol real NOT NULL,
    hb real NOT NULL,
    id_pegawai uuid NOT NULL,
    id_cabang uuid NOT NULL,
    id_customer uuid NOT NULL,
    asam_urat real NOT NULL,
    tgl_kunjungan timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.t_customer_card OWNER TO guardian;

--
-- Name: t_pegawai; Type: TABLE; Schema: public; Owner: guardian
--

CREATE TABLE public.t_pegawai (
    id_pegawai uuid DEFAULT gen_random_uuid() NOT NULL,
    nama text NOT NULL,
    id_cabang uuid NOT NULL
);


ALTER TABLE public.t_pegawai OWNER TO guardian;

--
-- Data for Name: t_cabang; Type: TABLE DATA; Schema: public; Owner: guardian
--

COPY public.t_cabang (id_cabang, nama_cabang) FROM stdin;
0e8d8321-f497-40ab-9684-a8b59ad75f94	Cabang Jakarta
a0c7c3e1-181b-4e47-9e53-88652fce62e3	Cabang Bandung
\.


--
-- Data for Name: t_customer; Type: TABLE DATA; Schema: public; Owner: guardian
--

COPY public.t_customer (id_customer, nama, nohp, tgl_lahir) FROM stdin;
ccb281d8-56d2-4e4e-8d05-ce651f546d79	Rina	0811111111	1990-01-01
7644367b-06ad-4e7f-a984-c585498d56c3	Dedi	0822222222	1985-02-15
d77ae7b2-271e-4ae0-9567-93d14cb05be9	Sari	0833333333	1992-03-20
75a6b0d4-9541-41cf-81fd-f64d037b5bb6	Fajar	0844444444	1995-04-10
4f1f69cd-f3a8-495e-846a-88e8a20a9179	Maya	0855555555	1988-05-05
\.


--
-- Data for Name: t_customer_card; Type: TABLE DATA; Schema: public; Owner: guardian
--

COPY public.t_customer_card (id_customer_card, gula, kolesterol, hb, id_pegawai, id_cabang, id_customer, asam_urat, tgl_kunjungan) FROM stdin;
192ab5dd-d43d-4e1e-a554-662c8e85d978	120	180	14	c6354877-c3fe-490c-ad56-d64cd3ba8574	0e8d8321-f497-40ab-9684-a8b59ad75f94	ccb281d8-56d2-4e4e-8d05-ce651f546d79	6	2025-09-01 09:00:00
c3387091-09c9-4d04-8f06-7318369cd1c4	150	200	13	4fec4375-7332-4272-8496-e51f8e95dd3b	0e8d8321-f497-40ab-9684-a8b59ad75f94	7644367b-06ad-4e7f-a984-c585498d56c3	7	2025-09-02 10:30:00
a7da3753-539a-4de4-a5dd-2bf48a9ee3a4	110	170	15	4533b60b-9cf4-403a-a284-13eff25c4d0d	a0c7c3e1-181b-4e47-9e53-88652fce62e3	d77ae7b2-271e-4ae0-9567-93d14cb05be9	5	2025-09-03 11:15:00
e942851b-e39e-43bd-8380-5469ccfeb48b	130	190	12	c6354877-c3fe-490c-ad56-d64cd3ba8574	0e8d8321-f497-40ab-9684-a8b59ad75f94	75a6b0d4-9541-41cf-81fd-f64d037b5bb6	8	2025-09-04 09:45:00
05b9efe2-1f40-4ccc-8754-da93dcb03fe4	140	210	16	4fec4375-7332-4272-8496-e51f8e95dd3b	0e8d8321-f497-40ab-9684-a8b59ad75f94	4f1f69cd-f3a8-495e-846a-88e8a20a9179	6	2025-09-05 08:50:00
802d3aea-0130-436f-b267-2c3617108cfb	125	185	14	4533b60b-9cf4-403a-a284-13eff25c4d0d	a0c7c3e1-181b-4e47-9e53-88652fce62e3	ccb281d8-56d2-4e4e-8d05-ce651f546d79	7	2025-09-06 14:20:00
df3142e8-44fe-4558-9706-449b286c1d5a	135	195	13	c6354877-c3fe-490c-ad56-d64cd3ba8574	0e8d8321-f497-40ab-9684-a8b59ad75f94	7644367b-06ad-4e7f-a984-c585498d56c3	5	2025-09-07 15:00:00
92d938b5-5599-4904-9f61-06ec15fbee9a	145	205	12	4fec4375-7332-4272-8496-e51f8e95dd3b	0e8d8321-f497-40ab-9684-a8b59ad75f94	d77ae7b2-271e-4ae0-9567-93d14cb05be9	9	2025-09-08 16:40:00
0e4f2d92-671a-47e1-880d-15a943950960	155	215	15	4533b60b-9cf4-403a-a284-13eff25c4d0d	a0c7c3e1-181b-4e47-9e53-88652fce62e3	75a6b0d4-9541-41cf-81fd-f64d037b5bb6	6	2025-09-09 10:10:00
d258fbd1-7c73-44f5-8780-26090a19e79d	160	220	14	c6354877-c3fe-490c-ad56-d64cd3ba8574	0e8d8321-f497-40ab-9684-a8b59ad75f94	4f1f69cd-f3a8-495e-846a-88e8a20a9179	8	2025-09-10 09:30:00
\.


--
-- Data for Name: t_pegawai; Type: TABLE DATA; Schema: public; Owner: guardian
--

COPY public.t_pegawai (id_pegawai, nama, id_cabang) FROM stdin;
4fec4375-7332-4272-8496-e51f8e95dd3b	Budi	0e8d8321-f497-40ab-9684-a8b59ad75f94
4533b60b-9cf4-403a-a284-13eff25c4d0d	Citra	a0c7c3e1-181b-4e47-9e53-88652fce62e3
c6354877-c3fe-490c-ad56-d64cd3ba8574	Adellena	0e8d8321-f497-40ab-9684-a8b59ad75f94
\.


--
-- Name: t_cabang t_cabang_pkey; Type: CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_cabang
    ADD CONSTRAINT t_cabang_pkey PRIMARY KEY (id_cabang);


--
-- Name: t_customer_card t_customer_card_pkey; Type: CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_customer_card
    ADD CONSTRAINT t_customer_card_pkey PRIMARY KEY (id_customer_card);


--
-- Name: t_customer t_customer_nohp_unique; Type: CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_customer
    ADD CONSTRAINT t_customer_nohp_unique UNIQUE (nohp);


--
-- Name: t_pegawai t_pegawai_pkey; Type: CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_pegawai
    ADD CONSTRAINT t_pegawai_pkey PRIMARY KEY (id_pegawai);


--
-- Name: t_customer t_user_pkey; Type: CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_customer
    ADD CONSTRAINT t_user_pkey PRIMARY KEY (id_customer);


--
-- Name: t_customer_card t_customer_card_id_cabang_t_cabang_id_cabang_fk; Type: FK CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_customer_card
    ADD CONSTRAINT t_customer_card_id_cabang_t_cabang_id_cabang_fk FOREIGN KEY (id_cabang) REFERENCES public.t_cabang(id_cabang) ON DELETE CASCADE;


--
-- Name: t_customer_card t_customer_card_id_customer_t_customer_id_customer_fk; Type: FK CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_customer_card
    ADD CONSTRAINT t_customer_card_id_customer_t_customer_id_customer_fk FOREIGN KEY (id_customer) REFERENCES public.t_customer(id_customer) ON DELETE CASCADE;


--
-- Name: t_customer_card t_customer_card_id_pegawai_t_pegawai_id_pegawai_fk; Type: FK CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_customer_card
    ADD CONSTRAINT t_customer_card_id_pegawai_t_pegawai_id_pegawai_fk FOREIGN KEY (id_pegawai) REFERENCES public.t_pegawai(id_pegawai) ON DELETE CASCADE;


--
-- Name: t_pegawai t_pegawai_id_cabang_t_cabang_id_cabang_fk; Type: FK CONSTRAINT; Schema: public; Owner: guardian
--

ALTER TABLE ONLY public.t_pegawai
    ADD CONSTRAINT t_pegawai_id_cabang_t_cabang_id_cabang_fk FOREIGN KEY (id_cabang) REFERENCES public.t_cabang(id_cabang) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict gfsSpTigEWZy7ROYFY4iCmrQayyHfPU8kIzzpUKctsnW9eCMhBrepYQFgHSNYJn

