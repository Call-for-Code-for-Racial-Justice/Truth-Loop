const policyDetails = {
  id: 1,
  title: "Legislative Artifact 01",
  summary: "Summary of Legislative Artifact 01",
  link_to_full_text: "https://fulltextlegislation.com/artifact/01",
  date_introduced: "2020-06-01T05:00:00.000Z",
  status: "Artifact 01 Status",
  video_cms_channel_id: null,
  created: "2020-10-07T19:48:19.509Z",
  updated: "2020-10-07T19:48:19.509Z",
  categories: [
    {
      id: 1,
      name: "Category 01",
    },
    {
      id: 2,
      name: "Category 02",
    },
  ],
  geospatial_definitions: [
    {
      id: 1,
      name: "Geospatial Definition 01",
      short_name_ui: "GeoDef 01",
      description: "Description of GeoDef 01",
    },
    {
      id: 2,
      name: "Geospatial Definition 02",
      short_name_ui: "GeoDef 02",
      description: "Description of GeoDef 02",
    },
  ],
  officials: [
    {
      id: 1,
      name: "Official Name_01",
      title: "Official Title_01",
      email_address: "official_01@officials.com",
      role_in_artifact: "sponsor",
      phone_number: "123-456-7890",
      website_url: "https://www.officials.com/official/01",
    },
  ],
  publications: [
    {
      id: 1,
      title: "Publication Title 01",
      description: "Description for Publication 01",
      link: "https://www.publications.com/publicartion/01",
    },
    {
      id: 2,
      title: "Publication Title 02",
      description: "Description for Publication 02",
      link: "https://www.publications.com/publicartion/02",
    },
  ],
  advocacy_groups: [
    {
      id: 1,
      name: "Advocacy Group 01",
      description: "Description of AdvocacyGroup 01",
      email_address: "admin@advocacygroup01.com",
      phone_number: "123-456-7890",
      website_url: "https://www.advocacygroups.com/group/01",
    },
    {
      id: 2,
      name: "Advocacy Group 02",
      description: "Description of AdvocacyGroup 02",
      email_address: "admin@advocacygroup01.com",
      phone_number: "123-456-7890",
      website_url: "https://www.advocacygroups.com/group/02",
    },
  ],
  video_testimonials: [
    {
      id: 1,
      subject: "Testimonial Subject 01",
      comment: "Testimonial Comment 01",
      video_cms_id: "1020304050",
      privacy_stmt_ack: true,
    },
    {
      id: 2,
      subject: "Testimonial Subject 02",
      comment: "Testimonial Comment 02",
      video_cms_id: "1020304050",
      privacy_stmt_ack: true,
    },
  ],
  related: [
    {
      id: 2,
      title: "Legislative Artifact 02",
    },
  ],
};

export default {
  //
  // TODO: Is this used anywhere?
  //
  // fetchPolicyDetails: (policyid, vuestore) => {
  //
  //   if (process.env.MOCK) {
  //     console.log(`Policy details store: ${policyid}`);
  //     policyDetails.id = policyid;
  //     vuestore.dispatch("policyliststore/updateItemDetails", {
  //       itemdetail: policyDetails,
  //     });
  //   } else {
  //     fetch('/api/data/policyid')
  //       .then((response) => response.json())
  //       .then((json) => {
  //         // console.log(json);
  //         vuestore.dispatch("policyliststore/updateItemDetails", {
  //           items: json,
  //         });
  //       });
  //   }
  // },
};
