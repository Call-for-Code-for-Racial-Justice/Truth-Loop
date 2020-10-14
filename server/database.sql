-- Next line prevents an inspection in IntelliJ
-- noinspection SqlNoDataSourceInspectionForFile

-- --------------------------------------------------------------------------------------------------------
-- Make sure you have a SQL window open in the schema you want to be in, logged in as
-- the ID that will have full owership and grants on the tables
-- (in our case originally it was the "policydb" database in Postgres on OpenShift,
-- in the "public" schema, logged in as "devtruthuser").

-- DROP TABLE artifact_advocacy_group CASCADE;
-- DROP TABLE artifact_category CASCADE;
-- DROP TABLE artifact_official CASCADE;
-- DROP TABLE artifact_publication CASCADE;
-- DROP TABLE artifact_related_artifact CASCADE;
-- DROP TABLE artifact_video_testimonial CASCADE;
-- DROP TABLE artifact_geospatial_definition CASCADE;
-- DROP TABLE legislative_artifact CASCADE;
-- DROP TABLE advocacy_group CASCADE;
-- DROP TABLE official CASCADE;
-- DROP TABLE category CASCADE;
-- DROP TABLE geospatial_definition CASCADE;
-- DROP TABLE level CASCADE;
-- DROP TABLE "publication" CASCADE;
-- DROP TABLE video_testimonial CASCADE;

CREATE TABLE category (
	id serial NOT NULL,
	name varchar NOT NULL,
	description varchar NULL,
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	CONSTRAINT category_pk PRIMARY KEY (id),
	CONSTRAINT category_uniq_name UNIQUE (name)
);

CREATE TABLE geospatial_definition (
	id serial NOT NULL,
	name varchar NOT NULL,
	short_name_ui varchar NOT NULL,
	description varchar NULL,
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	CONSTRAINT geospatial_definition_pk PRIMARY KEY (id),
	CONSTRAINT geodef_uniq_name UNIQUE (name)
);

CREATE TABLE "publication" (
	id serial NOT NULL,
	title varchar NOT NULL,
	description varchar NOT NULL,
	link varchar NOT NULL,
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	CONSTRAINT publication_pk PRIMARY KEY (id)
);

CREATE TABLE video_testimonial (
	id serial NOT NULL,
	subject varchar NOT NULL,
	"comment" varchar NULL,
	video_cms_id varchar NOT NULL, -- Watson Video ID
	privacy_stmt_ack bool NOT NULL, -- Submitter has acknowledged privacy statement
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	CONSTRAINT video_testimonial_pk PRIMARY KEY (id)
);

CREATE TABLE advocacy_group (
	id serial NOT NULL,
	name varchar NOT NULL,
	description varchar NOT NULL,
	email_address varchar NULL,
	phone_number varchar NULL,
	website_url varchar NULL,
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	CONSTRAINT advocacy_group_pk PRIMARY KEY (id)
);

CREATE TABLE level (
    id serial NOT NULL,
    name varchar NOT NULL,
    description varchar NULL,
    CONSTRAINT level_pk PRIMARY KEY (id),
    CONSTRAINT level_uniq_name UNIQUE (name)
);

CREATE TABLE legislative_artifact (
	id serial NOT NULL,
	title varchar NOT NULL,
	summary varchar NOT NULL,
	link_to_full_text varchar NULL,
	date_introduced date NULL,
    status varchar NULL,
	video_cms_channel_id varchar NULL, -- Watson Video Channel ID
	level_id int4 NULL,
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	CONSTRAINT legislative_artifact_pk PRIMARY KEY (id),
    CONSTRAINT legislative_artifact_fk_level FOREIGN KEY (level_id) REFERENCES level(id)
);

CREATE TABLE official (
	id serial NOT NULL,
	name varchar NOT NULL,
	title varchar NOT NULL,
	email_address varchar NULL,
	phone_number varchar NULL,
	website_url varchar NULL,
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	CONSTRAINT official_pk PRIMARY KEY (id)
);

CREATE TABLE artifact_advocacy_group (
	artifact_id int4 NOT NULL,
	advocacy_group_id int4 NOT NULL,
	CONSTRAINT artifact_advocacy_group_pk PRIMARY KEY (artifact_id, advocacy_group_id),
	CONSTRAINT artifact_advocacy_group_fk_advocacy_group FOREIGN KEY (advocacy_group_id) REFERENCES advocacy_group(id),
	CONSTRAINT artifact_advocacy_group_fk_artifact FOREIGN KEY (artifact_id) REFERENCES legislative_artifact(id)
);

CREATE TABLE artifact_category (
	artifact_id int4 NOT NULL,
	category_id int4 NOT NULL,
	CONSTRAINT artifact_category_pk PRIMARY KEY (artifact_id, category_id),
	CONSTRAINT artifact_category_fk_artifact FOREIGN KEY (artifact_id) REFERENCES legislative_artifact(id),
	CONSTRAINT artifact_category_fk_category FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE artifact_geospatial_definition (
	artifact_id int4 NOT NULL,
	geospatial_definition_id int4 NOT NULL,
	CONSTRAINT artifact_geospatial_definition_pk PRIMARY KEY (artifact_id, geospatial_definition_id),
	CONSTRAINT artifact_geospatial_definition_fk_artifact FOREIGN KEY (artifact_id) REFERENCES legislative_artifact(id),
	CONSTRAINT artifact_geospatial_definition_fk_geo_def FOREIGN KEY (geospatial_definition_id) REFERENCES geospatial_definition(id)
);

CREATE TABLE artifact_official (
	artifact_id int4 NOT NULL,
	official_id int4 NOT NULL,
	role_in_artifact varchar NOT NULL,
    show_in_list bool NOT NULL DEFAULT false,
	CONSTRAINT artifact_official_pk PRIMARY KEY (artifact_id, official_id),
	CONSTRAINT artifact_official_fk_artifact FOREIGN KEY (artifact_id) REFERENCES legislative_artifact(id),
	CONSTRAINT artifact_official_fk_official FOREIGN KEY (official_id) REFERENCES official(id)
);

CREATE TABLE artifact_publication (
	artifact_id int4 NOT NULL,
	publication_id int4 NOT NULL,
	CONSTRAINT artifact_publication_pk PRIMARY KEY (artifact_id, publication_id),
	CONSTRAINT artifact_publication_fk_artifact FOREIGN KEY (artifact_id) REFERENCES legislative_artifact(id),
	CONSTRAINT artifact_publication_fk_publication FOREIGN KEY (publication_id) REFERENCES publication(id)
);

CREATE TABLE artifact_related_artifact (
	artifact_id_1 int4 NOT NULL,
	artifact_id_2 int4 NOT NULL,
	CONSTRAINT artifact_artifact_pk PRIMARY KEY (artifact_id_1, artifact_id_2),
	CONSTRAINT artifact_related_artifact_check CHECK ((artifact_id_1 <> artifact_id_2)),
	CONSTRAINT artifact_artifact_fk FOREIGN KEY (artifact_id_1) REFERENCES legislative_artifact(id),
	CONSTRAINT artifact_artifact_fk_1 FOREIGN KEY (artifact_id_2) REFERENCES legislative_artifact(id)
);

CREATE TABLE artifact_video_testimonial (
	artifact_id int4 NOT NULL,
	video_testimonial_id int4 NOT NULL,
	CONSTRAINT artifact_video_testimonial_pk PRIMARY KEY (artifact_id, video_testimonial_id),
	CONSTRAINT artifact_video_testimonial_fk_artifact FOREIGN KEY (artifact_id) REFERENCES legislative_artifact(id),
	CONSTRAINT artifact_video_testimonial_fk_video_testimonial FOREIGN KEY (video_testimonial_id) REFERENCES video_testimonial(id)
);
