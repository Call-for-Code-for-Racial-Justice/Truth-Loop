[hi-level-arch]: images/architectural-diagram.png "High Level Architecture"
[components]: images/components.jpg "Components"
[PRL-data]: images/PRL-data.jpg "Policy, Regulation & Legislation Data"

# Team Truth
## Truth in Legislation

### Contents

1. [Short description](#short-description)
   1. [What's the Problem?](#whats-the-problem)
   1. [How can technology help?](#how-can-technology-help)
1. [The Idea](#the-idea)
   1. [A successful implementation](#a-successful-implementation)
      1. [Privacy Concerns](#privacy-concerns)
1. [Skills](#skills)
1. [Reference Materials](#reference-materials)
1. [The Architecture](#the-architecture)
1. [Working Code](#working-code)
   1. [Getting started](#getting-started)
   1. [Contributing](#contributing)
1. [Future Enhancements / Undecided Aspects](#future-enhancements-and-undecided-aspects-of-the-solution)

---
### Short description

#### What's the problem?

Concerned and impacted citizens don't have a straightforward way of knowing 
what or how policies, regulations and legislation (throughout this document 
referred as either **Legislative Artifacts** or **PR&L**) impact them or 
what they can do in response.

#### How can technology help?

What is missing from this situation, and what this technology was intending to 
provide, is a means for people to:
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

---
### The Idea
The driving idea behind the software is to provide a platform that is capable of storing
curated PR&L information, as determined by the community (however large or small) it serves.
Further, it is to provide a mobile-friendly way for users to examine that PR&L, increasing
their legal awareness, and to allow them to communicate their reactions and thoughts via
the recording of video testimonials to be shared with the community and the people
responsible for the creation of the PR&L.

**This solution, therefore, seeks to provide implementers the framework upon which to:**
- build a server that facilitates the storage, maintenance and retrieval of PR&L
- build an administrative interface (and the related server components) that would allow the 
site owners to curate the PR&L information
  - simple, intelligible summary that makes it easy to understand its potential impact
  - categories it pertains to (law enforcement, healthcare, zoning)
  - geospatial areas of pertinence (postal codes, cities, counties, e.g.)
  - the type of the artifact (bill, law, policy, regulation, e.g.)
  - (other) related PR&L in the system
  - legislator, author, sponsor of the PR&L
  - related advocacy groups or digital social communities
  - related articles or supporting documentation
  - a link to the actual full text of the PR&L  
- build an intuitive interface to facilitate customized exploration, and discovery of
pertinent PR&L, and submission of video testimonials
- build a mechanism by which information about the video testimonials gets stored within the system,

#### A successful implementation
**----> TODO: point 3, part 2 of starter kit instructions**
> provide guidance to the developer (if you were to take on the challenge, this is what would prove success that you made a great application; standards/protocols; documents)```



##### Privacy concerns

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

 


---
### Skills
**----> TODO: point 4 in the starter kit instructions**
> Skills and IBM Cloud or open source services - what are the key technology areas an external developer needs to know in order to build upon this idea? Please be sure to call out the open source technologies it would leverage.

The software leverages all open-source technologies for core development, which is built upon the PERN stack (PostgreSQL, Express, React, and Nodejs). The framework itself relies on knowledge of Javascript as a required skill from the developer. For populating and working with the database, basic SQL skills are enough to get started with the current data model.
   

---
### Reference Materials
**----> TODO: point 5 in the starter kit instructions**
> links to ibm cloud documentation, video technology, cloud object storage, openshift, node, react, express, postgres, video post-processing technologies in Watson, etc.. whatever is relevant to a developer

---
### The Architecture

**A high-level depiction of the solution's intent**
![hi-level-arch]
---
**The information to be stored in the system**
![PRL-data]
---
**The components of the system** 
![components]

---
### Working Code
**----> TODO: point 7 in the starter kit instructions**
> Working code - details on how to get started (i.e. register for a cloud account and choose a common service) and how to assemble the building blocks of your solution using IBM and open source technology. 

#### Getting started
**----> TODO: See if this linked document is still accurate given any discoveries you've made**

Instructions to get you a copy of the project up and running on your local machine for development and testing purposes can be found [here](docs/README.md).

##### Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

---
### Future Enhancements and Undecided Aspects of the Solution
**----> TODO: point 8 in the starter kit instructions**
> Suggestions on how to take the idea in other directions - this points developer/organizations in ways to connect the dots and create solutions to address other use cases; e.g. swapping out data sets

**talk about some of the extensions, dilemmas and technical issues we've talked about but didn't completely cover**

Currently, the back end and front end of the application have been developed in isolation due to the experience of developers within the team. Therefore, the first step in contribution would be to route the back end database to allow viewing and filtering of policies on the front end through API calls.

One functionality that has caused technical issues is the implementation of the video testimonial uploading for different policies. Various approaches have been researched, including use of a no-streaming solution using Cloud Object Storage to call stored videos to be downloaded and then played back to the user, upon loading of the page. As the videos will have a restriction of 60 second time limits, optimisation can be made to minimise the overhead of waiting to download the entire video before playback. This implementation is certainly feasible, however it is not scalable when taking into account users with potentially weaker network connections.

- deployment (hosted or independent deployments)
- customizing instance if hosted
- **security:** an efficient expansion to secure data storage (particularly regarding the video implementation) is required to ensure all user data is kept safe. Implementation of user accounts that safely store user data may even assist in developing a more convenient solution, however the privacy implications that comes with this should also be assessed.
- **privacy concerns around videos and location information:** consideration of the metadata around user testimonials will be essential in providing a solution that focuses on privacy risks.
- **sourcing legislation information:** several data sources will be required to adapt the solution for all locales, therefore expansion of this project will be impacted massively by taking into account the structures of legislation from other countries. 
- **policy upload and curation:** thought would be needed in deciding who would curate the uploading of policy data. Would the database population of policy data be automated to pull all newly proposed policies from government sources, requiring an interface to filter suitable policies to then be pushed into the database? Or would the curation be done manually, which allows for more control with the drawback of lower scalability?
- **moderation of uploaded videos/text:** how is video or accompanying text reviewed to ensure community guidelines are being followed, and that users are misusing functionalities? Applications of moderation can include profanity detection, manual moderation via user admins, or through flagging and reporting of user content. Furthermore, consideration should be made to assess whether these implementations address the spirit of the solution, e.g. how to distinguish the software from social media settings where users already share political views. 
- **Natural Language technology:** Work has already begun on refining a pipeline to extract text from video submissions to implement tone analysis, which will help to identify various characteristics and give more meaning to the video testimonials from users. Further expansion can be made to analyse profanity and inappropriate language submitted by users, to address moderation of user content.

