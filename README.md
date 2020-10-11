[hi-level-arch]: images/architectural-diagram.png "High Level Architecture"
[components]: images/components.jpg "Components"
[openshift]: images/openshift.png "OpenShift Console"
[dataflow]: images/dataflow.png "Data flow"

# Team Truth

## Team Members

The initial version was developed by members of IBM in the summer of 2020:
Aakansha Agrawal, Khadija Al-Selini, Parisa Babaali, Boz Bosma, Kimberly Cassidy, Stephanie Daher, Michelle Esselen, Peter Ihlenfeldt, Abiola Jones, Rahul Kalluri, Joe Konathapally, Frank Madden, Henry Nash, Sharon Osahon, Mark Sturdevant, Tanushree Paul, Bimsara Pilapitiya, Ya Jiao Zheng,

## Contents

1. [Overview](#Overview)
   1. [What's the Problem?](#whats-the-problem)
   1. [How can technology help?](#how-can-technology-help)
1. [The Idea](#the-idea)
1. [Diagrams](#Diagrams)
1. [Technologies](#Technologies)
1. [Getting Started](#Getting-started-by-installing-and-running-the-components)
1. [Resources](#Resources)
1. [License](#License)
1. [Contributing and Developer information](#Contributing-and-Developer-information)
    1. [Contributing](#contributing)
    1. [Future Enhancements / Undecided Aspects](#future-enhancements-and-undecided-aspects-of-the-solution)
    1. [Privacy Considerations](#privacy-concerns)

## Overview

### What's the problem

Concerned and impacted citizens don't have a straightforward way of knowing 
what or how policies, regulations and legislation (throughout this document 
referred as either **Legislative Artifacts** or **PR&L**) impact them or 
what they can do in response.

### How can technology help

What is missing from this situation, and what this technology was intending to provide, is a means for people to:

- readily understand the PR&L language and intent without being a legal expert
- sort or filter the PR&L efficiently
- digest an understandable summary of PR&L
- explore related or supporting information, advocacy groups and other PR&L
- make a determination of whether it will impact them
- engage in the process
- communicate the potential effects of these PR&L on their life, family, or community
to the author or sponsor of the legislation
- share their stories and experiences with fellow residents and policy makers
- see what other people in the community are saying
- get an idea of the general sentiments people have expressed about the PR&L
- engender dialogue between residents and PR&L authors and sponsor

## The Idea

The driving idea behind the software is to provide a platform that is capable of storing
curated PR&L information, as determined by the community (however large or small) it serves.
Further, it is to provide a mobile-friendly way for users to examine that PR&L, increasing
their legal awareness, and to allow them to communicate their reactions and thoughts via
the recording of video testimonials to be shared with the community and the people
responsible for the creation of the PR&L.

## Diagrams

![architecture diagram](/images/high-level-architecture-diagram.png)

[NB Diagram above is a placeholder, need to swap Cloudant for PostgreSQL and indicate this is not mobile only]

This solution combines use of a media server (currently Watson Media) and data storage to hold the curated legislative artifcats, and the meta-data to link these together.

1. The User launches the web app (on either a mobile or laptop/desktop device) and can view the range of curated legislative artifcast that have been created. The Vue app retrieves these by sending a REST request to the API server, which extracts them from the SQL database.
1. The User can post their own (video) story that may support or challenge the legislated artifacts, which are uploaded to the API server, which directs these to the Watson Media services. The API server also stores a reference to the video location in the respective legislative artifact in the SQL database.
1. The User can view other peoples' video stories which are retrieved by sending a REST request to the API server, which extracts them from the Watson Media services.
1. [add more here?]

There is an administrative API interface that allows the site owners to curate the PR&L information, with the following attributes

- simple, intelligible summary that makes it easy to understand its potential impact
- categories it pertains to (law enforcement, healthcare, zoning)
- geospatial areas of pertinence (postal codes, cities, counties, e.g.)
- the type of the artifact (bill, law, policy, regulation, e.g.)
- (other) related PR&L in the system
- legislator, author, sponsor of the PR&L
- related advocacy groups or digital social communities
- related articles or supporting documentation
- a link to the actual full text of the PR&L  

## Technologies

- [IBM Cloud Documentation Home](https://cloud.ibm.com/docs/home/alldocs)
- [Kubernetes in IBM Cloud](https://cloud.ibm.com/docs/containers?topic=containers-cs_cluster_tutorial)
- [PostgreSQL](https://cloud.ibm.com/docs/databases-for-postgresql?topic=databases-for-postgresql-getting-started)
- [OpenShift](https://cloud.ibm.com/docs/openshift?topic=openshift-getting-started)
- [Node.js](https://nodejs.org/en/docs/)
- [ExpressJS](https://expressjs.com/)
- [Vue.js](https://vuejs.org/)

## Getting started by installing and running the components

### Prerequisites

- Register for an [IBM Cloud](https://www.ibm.com/account/reg/us-en/signup) account.
- Install and configure [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#overview).
- Install [Vue CLI dependencies](hhttps://cli.vuejs.org/guide/installation.html) 
- Clone the [repository](https://github.com/henrynash/policy-truth-frontend).

### Steps

1. [Provision a Postgres instance on the IBM Cloud](#1-Provision-a-Postgres-instance).
1. [If you want to use the video services, provision an instance of Watson Media](#2-Set-up-an-instance-of-Watson-Media).
1. [Configuring and running the server](#3-Configuring-and-running-the-server).
1. [Configuring and running the client application](#4-Configuring-and-running-the-client-application).

### 1: Provision a PostgreSQL instance

The server requires an SQL server, and has been tested using PostgreSQL. You can deploy this in the IBM CLoud by logging into the IBM Cloud and provisioning a [Postgres instance](https://cloud.ibm.com/catalog/services/databases-for-postgresql). Note that this does require a paid plan, although if you are new to the IBM Cloud, it is likely your initial cloud credits will cover this for a significant time.

1. Choose your Databases for Postgres plan. You should choose an appropriate region, give the service a name. You can leave the other settings with their defaults. Click the blue **Create** button when ready.
1. Once your Postgres instance has been created, you need to create a service credential that the API Server can use to communicate with it. By selecting your running Postgres instance, you can choose **Service credentials** from the left-hand menu. Create a new service credential and give it a name (it doesn't matter what you call it).
1. Once created, you can display the credentials by selecting **view service credentials**, and then copy the credential, so you are ready to paste parts of it into the environment file of the API server in [Step 3](#3-Configuring-and-running-the-server).

Alternatively, you could deploy your own PostgreSQL instance either locally or in a remote VM or container. In this case, ensure you obatin the equivilent credientials to those described above, ready for [Step 3](#3-Configuring-and-running-the-server).

### 2. Set up an instance of Watson Media

Log in to IBM Cloud and provision a Watson Media instance.

1. Provision an instance of **Watson Media** [IBM Watson Media](https://www.ibm.com/products/video-streaming/pricing). You can use the 30 day free-trial, if that works better for you.
1. Once your Watson Media instance has launched, go to the `API/SDK access` item, under the `Integration & Apps` menu item, in the left hand menu.
1. Create a new credential. You will need to enter an Application Name (you can chose anything) and a Redirect URL. This URL needs to be the prefix of the url you will br running the server on, e.g. <http://localhost>. Make note of the `client id` and `client secret`, since you will need these in [Step 3](#3-Configuring-and-running-the-server).
1. You also need to take note of your media username and password (HN: where do they come from? Are these just your IBM Cloud login creds?).

### 3. Configuring and running the server

To set up and launch the server application:

1. Go to the `policy-truth-backend` directory of the cloned repo.
1. Copy the `.env.example` file, and create a new file named `.env`.
1. If your postgreSQL server uses SSL (like the IBM Cloud verstion), then also create a file to hold the SSL certificate. For the IBM CLoud version of PosstgreSQL, it is shown in the `certificate: certificate_base64` attribute of the service credential you obtained in [Step 1](#1-Provision-a-Postgres-instance). Copy the raw contents of this attribute into the file you have created.  
1. Update the newly created `.env` file and update the `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `DB_PORT` and `DB_DATABASE_NAME` with the values from credential you obtained when create the Database instance [Step 1](#1-Provision-a-Postgres-instance). If you created a certificate file in the previous action, then also update the `DB_CERTFILE` with the location of this file (relative to the `policy-truth-backend` directory).
1. Also update the `CMS_USERNAME`, `CMS_PASSWORD`, `CLIENT_ID` and `CLIENT_SECRET` with the values from creating your instance of Watson Media, from [Step 2](#2-Set-up-an-instance-of-Watson-Media).
1. Prepare to initialize the database with the correct tables. Scripts are provdied that do this using the `psql` cli, which reccomend you install. On macOS, for instance, you can do this with the brew command:
    - `brew install libpq`
    - You may also like to link the psql command to you local bin directory with brew `link --force libpq`
1. To install the tables, you can use the `./psql_create_tables.sh` script
1. If you would like to install some dummy data into the database for testing, then use the `./psql_refresh_sample_data.sh` script

1. To actually now run the server, from a terminal, in the `policy-truth-backend` directory of the cloned repo:
    1. Install the dependencies: `npm install`
    1. Launch the server application locally or deploy to IBM Cloud:
        - To run locally:
            1. Start the application: `npm start`
            1. The server can be accessed at the address give, typically <http://localhost:5000>
        - To deploy to the IBM Cloud in Cloud Foundry:
            1. Edit the **name** value in the `manifest.yml` file to a unique application name (for example, _my-legislative-server_).
            1. Log in to your IBM Cloud account using the IBM Cloud CLI: `ibmcloud login`
            1. Target a Cloud Foundry org and space: `ibmcloud target --cf`
            1. Push the app to IBM Cloud: `ibmcloud app push`
            1. The server can be accessed at the  **routes** URL displayed in the output of the push command (for example: <my-legislative-server.eu-gb.mybluemix.net>)

Once the server is running, you can test it be accessing the openAPI docs interface to explore and try out the API using the `/api-docs` endpoint. For example, if running locally this will be on <http://localhost:5000/api-docs>, which should look something like this:

![api-docs](/images/api-docs.png)

### 4. Configuring and running the client application

To configure and run the client application:

1. Go to the `client` directory of the cloned repo.
1. Copy the `.env.example` file to a new file named `.env`.
1. Edit the newly created `.env` file:
    - Update the `SERVER_URL` with the URL to the server app launched in the previous step (for example <http://localhost:5000>).
1. From a terminal:
    1. Install the dependencies: `npm install`
    1. Install the dependencies: `npm run serve`
    1. Once the deevlopment server is running, you should be able to access the client from the URL indicated (typicall http://localhost:8080/).
    1. If you are running a mobile simulator, you can also access the same url. For example, in the ios simulator, the screen would look something like this

![Intro Screen](/images/first-screen.png)

## Resources

- Any non-tech resources go here (e.g. links/videos to legislation, and the problem being solved)

## License

This solution is made available under the [Apache 2 License](LICENSE).

## Contributing and Developer information

The community welomes your invlovement and contibutions to this project. Please read [contributing](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to the community.

Some more detailed information and the components and data flows within the system are given below.

### The components of the system

![components]

### Future Enhancements to the Solution

There are a significant number of areas where the community is looking for help. Individual issues are raised in the repository, but the following class of assistance is needed:

- **media services:** The current approach supports only one media services, namely Waston Media services. Although this provides excellent capabilioties, there is a desire to support a broader range of media services for testimonial vidoes. Various approaches have been researched, including use of a no-streaming solution using Cloud Object Storage to call stored videos to be downloaded and then played back to the user, upon loading of the page. As the videos will have a restriction of 60 second time limits, optimisation can be made to minimise the overhead of waiting to download the entire video before playback. This implementation is certainly feasible, however it is not scalable when taking into account users with potentially weaker network connections.
- **security:** An efficient expansion to secure data storage (particularly regarding the video implementation) is required to ensure all user data is kept safe. Implementation of user accounts that safely store user data may even assist in developing a more convenient solution, however the privacy implications that comes with this should also be assessed.
- **privacy considerations around videos and location information:** Consideration of the metadata around user testimonials will be essential in providing a solution that focuses on privacy risks.
- **sourcing legislation information:** Several data sources will be required to adapt the solution for all locales, therefore expansion of this project will be impacted massively by taking into account the structures of legislation from other countries. 
- **policy upload and curation:** Thought would be needed in deciding who would curate the uploading of policy data. Would the database population of policy data be automated to pull all newly proposed policies from government sources, requiring an interface to filter suitable policies to then be pushed into the database? Or would the curation be done manually, which allows for more control with the drawback of lower scalability?
- **moderation of uploaded videos/text:** How is video or accompanying text reviewed to ensure community guidelines are being followed, and that users are misusing functionalities? Applications of moderation can include profanity detection, manual moderation via user admins, or through flagging and reporting of user content. Furthermore, consideration should be made to assess whether these implementations address the spirit of the solution, e.g. how to distinguish the software from social media settings where users already share political views. 
- **Natural Language technology:** Work has already begun on refining a pipeline to extract text from video submissions to implement tone analysis, which will help to identify various characteristics and give more meaning to the video testimonials from users. Further expansion can be made to analyse profanity and inappropriate language submitted by users, to address moderation of user content.

### Privacy Considerations

**Personal Information (PI) is prevalent within the Team Truth solution (please see the PI Data Map below). The following risks are noteworthy:** 
 - **Child-related:** There is the possibility that child-related PI could be entered into the system. Data protection law requires verification and authorisation by parents or guardians.  In turn, a formal Privacy Impact Assessment may be required to mitigate risks; 
 - **Encryption:** The storage and movement of PI must have technical and organisational security measures such as encryption, to ensure it is not accessed by those without authorisation (which is a data breach, and breach compliance obligations then follow);
 - **Storage:** Where the PI is stored is an issue, as external providers would need to have security measures in place to protect it. There is also indemnity-related issues with the use of third parties. Also, it unclear at this stage where PI will actually be stored;  
 - **Cross-Border Transfers:** After determining storage, it is imperative to know where the data actually resides, which enables managing “adequacy” of cross border transfers.  Many Cloud providers have overseas operations, and employ a ‘follow the sun’ approach to storage; 
 - **Access to the Data:** Any unauthorised access to PI is a data breach and therefore comes with considerable data protection compliance obligations (e.g. a requirement to notify regulators and possibly the data subjects as well);
 - **Monitoring of Qualified Content:** Forwarding the content on without any monitoring or vetting of it beforehand risks not only defamation claims, but could be used by anonymous people to espouse hate speech. Both of which undermine the value of the solution; 
 -	**Deletion:** Under data protection law, you can only hold on to the data for as long as is necessary. So at some point it will have to be deleted;  
 -	**Data Sharing:** If any data sharing is desired with third parties, e.g. Social Media, data sharing agreements will need executing. Otherwise, processing may be deemed a breach; 
 - **Privacy Notice(s):** A notice informing data subjects of the purpose of the processing, as well as the rights of the data subjects, is required. Otherwise, this would be a breach;
 - **Controller:** Processor obligations – IBM will act as both a Controller – determining the purpose of the processing – and as a Processor.  Accordingly, obligations are two-fold.  

![privacy map](images/privacy-map.png)
