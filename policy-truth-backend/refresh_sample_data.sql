-- Use this script to reset the data in the database back to a test state.
-- All data deleted, all sequences reset.
-- Tables filled with test data.

-- clear all intersection tables
truncate artifact_advocacy_group cascade;
truncate artifact_category cascade;
truncate artifact_geospatial_definition cascade;
truncate artifact_official cascade;
truncate artifact_publication cascade;
truncate artifact_related_artifact cascade;
truncate artifact_video_testimonial cascade;
-- clear all the other tables
truncate advocacy_group cascade;
truncate category cascade;
truncate geospatial_definition cascade;
truncate official cascade;
truncate publication cascade;
truncate video_testimonial cascade;
truncate legislative_artifact cascade;
-- reset all the sequences
alter sequence advocacy_group_id_seq restart with 1;
alter sequence category_id_seq restart with 1;
alter sequence geospatial_definition_id_seq restart with 1;
alter sequence legislative_artifact_id_seq restart with 1;
alter sequence official_id_seq restart with 1;
alter sequence publication_id_seq restart with 1;
alter sequence video_testimonial_id_seq restart with 1;

-- fill the data tables. 20 of everything except 10 officials and 10 legislative artifacts
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 01', 'Description of AdvocacyGroup 01', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/01');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 02', 'Description of AdvocacyGroup 02', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/02');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 03', 'Description of AdvocacyGroup 03', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/03');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 04', 'Description of AdvocacyGroup 04', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/04');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 05', 'Description of AdvocacyGroup 05', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/05');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 06', 'Description of AdvocacyGroup 06', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/06');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 07', 'Description of AdvocacyGroup 07', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/07');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 08', 'Description of AdvocacyGroup 08', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/08');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 09', 'Description of AdvocacyGroup 09', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/09');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 10', 'Description of AdvocacyGroup 10', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/10');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 11', 'Description of AdvocacyGroup 11', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/11');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 12', 'Description of AdvocacyGroup 12', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/12');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 13', 'Description of AdvocacyGroup 13', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/13');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 14', 'Description of AdvocacyGroup 14', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/14');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 15', 'Description of AdvocacyGroup 15', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/15');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 16', 'Description of AdvocacyGroup 16', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/16');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 17', 'Description of AdvocacyGroup 17', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/17');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 18', 'Description of AdvocacyGroup 18', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/18');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 19', 'Description of AdvocacyGroup 19', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/19');
insert into advocacy_group (name, description, email_address, phone_number, website_url) values ('Advocacy Group 20', 'Description of AdvocacyGroup 20', 'admin@advocacygroup01.com', '123-456-7890', 'https://www.advocacygroups.com/group/20');

insert into category (name, description) values ('Category 01', 'Description of Category 01');
insert into category (name, description) values ('Category 02', 'Description of Category 02');
insert into category (name, description) values ('Category 03', 'Description of Category 03');
insert into category (name, description) values ('Category 04', 'Description of Category 04');
insert into category (name, description) values ('Category 05', 'Description of Category 05');
insert into category (name, description) values ('Category 06', 'Description of Category 06');
insert into category (name, description) values ('Category 07', 'Description of Category 07');
insert into category (name, description) values ('Category 08', 'Description of Category 08');
insert into category (name, description) values ('Category 09', 'Description of Category 09');
insert into category (name, description) values ('Category 10', 'Description of Category 10');
insert into category (name, description) values ('Category 11', 'Description of Category 11');
insert into category (name, description) values ('Category 12', 'Description of Category 12');
insert into category (name, description) values ('Category 13', 'Description of Category 13');
insert into category (name, description) values ('Category 14', 'Description of Category 14');
insert into category (name, description) values ('Category 15', 'Description of Category 15');
insert into category (name, description) values ('Category 16', 'Description of Category 16');
insert into category (name, description) values ('Category 17', 'Description of Category 17');
insert into category (name, description) values ('Category 18', 'Description of Category 18');
insert into category (name, description) values ('Category 19', 'Description of Category 19');
insert into category (name, description) values ('Category 20', 'Description of Category 20');

insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 01', 'GeoDef 01', 'Description of GeoDef 01');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 02', 'GeoDef 02', 'Description of GeoDef 02');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 03', 'GeoDef 03', 'Description of GeoDef 03');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 04', 'GeoDef 04', 'Description of GeoDef 04');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 05', 'GeoDef 05', 'Description of GeoDef 05');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 06', 'GeoDef 06', 'Description of GeoDef 06');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 07', 'GeoDef 07', 'Description of GeoDef 07');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 08', 'GeoDef 08', 'Description of GeoDef 08');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 09', 'GeoDef 09', 'Description of GeoDef 09');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 10', 'GeoDef 10', 'Description of GeoDef 10');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 11', 'GeoDef 11', 'Description of GeoDef 11');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 12', 'GeoDef 12', 'Description of GeoDef 12');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 13', 'GeoDef 13', 'Description of GeoDef 13');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 14', 'GeoDef 14', 'Description of GeoDef 14');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 15', 'GeoDef 15', 'Description of GeoDef 15');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 16', 'GeoDef 16', 'Description of GeoDef 16');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 17', 'GeoDef 17', 'Description of GeoDef 17');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 18', 'GeoDef 18', 'Description of GeoDef 18');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 19', 'GeoDef 19', 'Description of GeoDef 19');
insert into geospatial_definition ("name", short_name_ui, description) values ('Geospatial Definition 20', 'GeoDef 20', 'Description of GeoDef 20');

insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 01', 'Summary of Legislative Artifact 01', 'https://fulltextlegislation.com/artifact/01', '2020-06-01', 'Artifact 01 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 02', 'Summary of Legislative Artifact 02', 'https://fulltextlegislation.com/artifact/02', '2020-06-01', 'Artifact 02 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 03', 'Summary of Legislative Artifact 03', 'https://fulltextlegislation.com/artifact/03', '2020-06-01', 'Artifact 03 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 04', 'Summary of Legislative Artifact 04', 'https://fulltextlegislation.com/artifact/04', '2020-06-01', 'Artifact 04 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 05', 'Summary of Legislative Artifact 05', 'https://fulltextlegislation.com/artifact/05', '2020-06-01', 'Artifact 05 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 06', 'Summary of Legislative Artifact 06', 'https://fulltextlegislation.com/artifact/06', '2020-06-01', 'Artifact 06 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 07', 'Summary of Legislative Artifact 07', 'https://fulltextlegislation.com/artifact/07', '2020-06-01', 'Artifact 07 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 08', 'Summary of Legislative Artifact 08', 'https://fulltextlegislation.com/artifact/08', '2020-06-01', 'Artifact 08 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 09', 'Summary of Legislative Artifact 09', 'https://fulltextlegislation.com/artifact/09', '2020-06-01', 'Artifact 09 Status');
insert into legislative_artifact (title, summary, link_to_full_text, date_introduced, status) values ('Legislative Artifact 10', 'Summary of Legislative Artifact 10', 'https://fulltextlegislation.com/artifact/10', '2020-06-01', 'Artifact 10 Status');

insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_01', 'Official Title_01', 'official_01@officials.com', '123-456-7890', 'https://www.officials.com/official/01');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_02', 'Official Title_02', 'official_02@officials.com', '123-456-7890', 'https://www.officials.com/official/02');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_03', 'Official Title_03', 'official_03@officials.com', '123-456-7890', 'https://www.officials.com/official/03');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_04', 'Official Title_04', 'official_04@officials.com', '123-456-7890', 'https://www.officials.com/official/04');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_05', 'Official Title_05', 'official_05@officials.com', '123-456-7890', 'https://www.officials.com/official/05');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_06', 'Official Title_06', 'official_06@officials.com', '123-456-7890', 'https://www.officials.com/official/06');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_07', 'Official Title_07', 'official_07@officials.com', '123-456-7890', 'https://www.officials.com/official/07');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_08', 'Official Title_08', 'official_08@officials.com', '123-456-7890', 'https://www.officials.com/official/08');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_09', 'Official Title_09', 'official_09@officials.com', '123-456-7890', 'https://www.officials.com/official/09');
insert into official ("name", title, email_address, phone_number, website_url) values ('Official Name_10', 'Official Title_10', 'official_10@officials.com', '123-456-7890', 'https://www.officials.com/official/10');

insert into "publication" (title, description, link) values ('Publication Title 01', 'Description for Publication 01', 'https://www.publications.com/publicartion/01');
insert into "publication" (title, description, link) values ('Publication Title 02', 'Description for Publication 02', 'https://www.publications.com/publicartion/02');
insert into "publication" (title, description, link) values ('Publication Title 03', 'Description for Publication 03', 'https://www.publications.com/publicartion/03');
insert into "publication" (title, description, link) values ('Publication Title 04', 'Description for Publication 04', 'https://www.publications.com/publicartion/04');
insert into "publication" (title, description, link) values ('Publication Title 05', 'Description for Publication 05', 'https://www.publications.com/publicartion/05');
insert into "publication" (title, description, link) values ('Publication Title 06', 'Description for Publication 06', 'https://www.publications.com/publicartion/06');
insert into "publication" (title, description, link) values ('Publication Title 07', 'Description for Publication 07', 'https://www.publications.com/publicartion/07');
insert into "publication" (title, description, link) values ('Publication Title 08', 'Description for Publication 08', 'https://www.publications.com/publicartion/08');
insert into "publication" (title, description, link) values ('Publication Title 09', 'Description for Publication 09', 'https://www.publications.com/publicartion/09');
insert into "publication" (title, description, link) values ('Publication Title 10', 'Description for Publication 10', 'https://www.publications.com/publicartion/10');
insert into "publication" (title, description, link) values ('Publication Title 11', 'Description for Publication 11', 'https://www.publications.com/publicartion/11');
insert into "publication" (title, description, link) values ('Publication Title 12', 'Description for Publication 12', 'https://www.publications.com/publicartion/12');
insert into "publication" (title, description, link) values ('Publication Title 13', 'Description for Publication 13', 'https://www.publications.com/publicartion/13');
insert into "publication" (title, description, link) values ('Publication Title 14', 'Description for Publication 14', 'https://www.publications.com/publicartion/14');
insert into "publication" (title, description, link) values ('Publication Title 15', 'Description for Publication 15', 'https://www.publications.com/publicartion/15');
insert into "publication" (title, description, link) values ('Publication Title 16', 'Description for Publication 16', 'https://www.publications.com/publicartion/16');
insert into "publication" (title, description, link) values ('Publication Title 17', 'Description for Publication 17', 'https://www.publications.com/publicartion/17');
insert into "publication" (title, description, link) values ('Publication Title 18', 'Description for Publication 18', 'https://www.publications.com/publicartion/18');
insert into "publication" (title, description, link) values ('Publication Title 19', 'Description for Publication 19', 'https://www.publications.com/publicartion/19');
insert into "publication" (title, description, link) values ('Publication Title 20', 'Description for Publication 20', 'https://www.publications.com/publicartion/20');

insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 01A', 'Testimonial Comment 01A', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 01B', 'Testimonial Comment 01B', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 03A', 'Testimonial Comment 03A', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 03B', 'Testimonial Comment 03B', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 05A', 'Testimonial Comment 05A', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 05B', 'Testimonial Comment 05B', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 07A', 'Testimonial Comment 07A', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 07B', 'Testimonial Comment 07B', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 09A', 'Testimonial Comment 09A', '1020304050', true);
insert into video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) values ('Testimonial Subject 09B', 'Testimonial Comment 09B', '1020304050', true);

-- create intersections between things.
-- Everybody gets 2 advocacy groups
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (1, 1);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (1, 2);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (2, 3);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (2, 4);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (3, 5);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (3, 6);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (4, 7);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (4, 8);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (5, 9);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (5, 10);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (6, 11);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (6, 12);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (7, 13);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (7, 14);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (8, 15);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (8, 16);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (9, 17);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (9, 18);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (10, 19);
insert into artifact_advocacy_group (artifact_id, advocacy_group_id) values (10, 20);
-- 2 categories
insert into artifact_category (artifact_id, category_id) values (1, 1);
insert into artifact_category (artifact_id, category_id) values (1, 2);
insert into artifact_category (artifact_id, category_id) values (2, 3);
insert into artifact_category (artifact_id, category_id) values (2, 4);
insert into artifact_category (artifact_id, category_id) values (3, 5);
insert into artifact_category (artifact_id, category_id) values (3, 6);
insert into artifact_category (artifact_id, category_id) values (4, 7);
insert into artifact_category (artifact_id, category_id) values (4, 8);
insert into artifact_category (artifact_id, category_id) values (5, 9);
insert into artifact_category (artifact_id, category_id) values (5, 10);
insert into artifact_category (artifact_id, category_id) values (6, 11);
insert into artifact_category (artifact_id, category_id) values (6, 12);
insert into artifact_category (artifact_id, category_id) values (7, 13);
insert into artifact_category (artifact_id, category_id) values (7, 14);
insert into artifact_category (artifact_id, category_id) values (8, 15);
insert into artifact_category (artifact_id, category_id) values (8, 16);
insert into artifact_category (artifact_id, category_id) values (9, 17);
insert into artifact_category (artifact_id, category_id) values (9, 18);
insert into artifact_category (artifact_id, category_id) values (10, 19);
insert into artifact_category (artifact_id, category_id) values (10, 20);
-- 2 geodefs
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (1, 1);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (1, 2);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (2, 3);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (2, 4);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (3, 5);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (3, 6);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (4, 7);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (4, 8);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (5, 9);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (5, 10);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (6, 11);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (6, 12);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (7, 13);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (7, 14);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (8, 15);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (8, 16);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (9, 17);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (9, 18);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (10, 19);
insert into artifact_geospatial_definition (artifact_id, geospatial_definition_id) values (10, 20);
-- 1 official
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (1, 1, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (2, 2, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (3, 3, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (4, 4, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (5, 5, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (6, 6, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (7, 7, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (8, 8, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (9, 9, 'sponsor');
insert into artifact_official (artifact_id, official_id, role_in_artifact) values (10, 10, 'sponsor');
-- 2 publications
insert into artifact_publication (artifact_id, publication_id) values (1, 1);
insert into artifact_publication (artifact_id, publication_id) values (1, 2);
insert into artifact_publication (artifact_id, publication_id) values (2, 3);
insert into artifact_publication (artifact_id, publication_id) values (2, 4);
insert into artifact_publication (artifact_id, publication_id) values (3, 5);
insert into artifact_publication (artifact_id, publication_id) values (3, 6);
insert into artifact_publication (artifact_id, publication_id) values (4, 7);
insert into artifact_publication (artifact_id, publication_id) values (4, 8);
insert into artifact_publication (artifact_id, publication_id) values (5, 9);
insert into artifact_publication (artifact_id, publication_id) values (5, 10);
insert into artifact_publication (artifact_id, publication_id) values (6, 11);
insert into artifact_publication (artifact_id, publication_id) values (6, 12);
insert into artifact_publication (artifact_id, publication_id) values (7, 13);
insert into artifact_publication (artifact_id, publication_id) values (7, 14);
insert into artifact_publication (artifact_id, publication_id) values (8, 15);
insert into artifact_publication (artifact_id, publication_id) values (8, 16);
insert into artifact_publication (artifact_id, publication_id) values (9, 17);
insert into artifact_publication (artifact_id, publication_id) values (9, 18);
insert into artifact_publication (artifact_id, publication_id) values (10, 19);
insert into artifact_publication (artifact_id, publication_id) values (10, 20);
-- 1 related artifact.  Set each legislative artifact "related to" the next legislative artifact
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (1,2);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (2,3);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (3,4);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (4,5);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (5,6);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (6,7);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (7,8);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (8,9);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (9,10);
insert into artifact_related_artifact (artifact_id_1, artifact_id_2) values (10,1);
-- 2 video testimonials (no actual videos just metadata) for the artifacts with odd IDs
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (1, 1);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (1, 2);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (3, 3);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (3, 4);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (5, 5);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (5, 6);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (7, 7);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (7, 8);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (9, 9);
insert into public.artifact_video_testimonial (artifact_id, video_testimonial_id) values (9, 10);
