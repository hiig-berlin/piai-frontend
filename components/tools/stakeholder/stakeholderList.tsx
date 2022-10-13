import React from "react";

// REGEX Patters to transform csv to json
// ======================================
//
// find
// (.*?),.*?,.*?,.*?,(.*?),(.*?),(.*?),(.*?),(.*?)\n
//
// replace
// {\n  name: "$1",\n  tags: "$2",\n  link: "$3",\n  location: "$4, $5",\n  description: $6\n},\n
//
// Add enter after last entry to replace it!
//
// Replace ""(.*?)"" by “$1”
// 
//

export const stakeholderList = [
  {
    name: "Access Now",
    tags: ["Research", "Think tanks/NGOs"],
    link: "https://www.accessnow.org/",
    location: "New York, USA",
    description: "Access Now seeks to serve, guide, and influence decision makers in all sectors through human rights-focused thought leadership and innovative, evidence-based policy analysis. They strategically advocate for courts and legal processes to hold governments and corporations accountable and uphold fundamental rights in the digital age. They provide flexible and grant-focused funding to grassroots movements and activist groups working with users and communities most at risk of digital rights violations, and have published opinions on AI regulations with AlgorithmWatch, for example."
  },
  {
    name: "Ad hoc Committee on Artificial Intelligence (CAHAI)",
    tags: ["Politics"],
    link: "https://www.coe.int/en/web/artificial-intelligence/cahai",
    location: "Brussels, Belgium",
    description: "CAHAI is a group examining the feasibility and potential elements of a legal framework for the development, design, and application of artificial intelligence based on the Council of Europe's standards for human rights, democracy, and the rule of law, based on extensive consultations with various stakeholders."
  },
  {
    name: "AI & Society Lab (HIIG) ",
    tags: ["Research"],
    link: "https://www.hiig.de/en/research/ai-and-society-lab/",
    location: "Berlin , Germany",
    description: "HIIG was founded to research the development of the Internet from a societal perspective. The inter- and transdisciplinary research lab “AI&Society Lab” investigates the societal changes and challenges that arise from the introduction of artificial intelligence in political, social and cultural processes and deals, for example, with the conditions of Public Interest AI within the framework of the research group Public Interest AI."
  },
  {
    name: "AI Campus (The Stifterverband)",
    tags: ["Politics"],
    link: "https://www.stifterverband.org/ki-campus",
    location: "Essen, Germany",
    description: "The project “AI Campus”, co-organized by the Stifterverband, combines various free introductions to the field of AI - from basic knowledge of understanding the technical processes to practical application in different contexts."
  },
  {
    name: "AI For Good (ITU Konferenz Initative)",
    tags: ["AI Practice"],
    link: "https://aiforgood.itu.int/",
    location: "Geneva, Switzerland",
    description: "The goal of AI for Good is to identify practical applications of AI to advance the United Nations Sustainable Development Goals and scale these solutions for global impact. It is the United Nations' leading action-oriented, global, and inclusive platform for AI."
  },
  {
    name: "AI for Good Foundation",
    tags: ["AI Practice"],
    link: "https://ai4good.org/",
    location: "El Cerrito, USA",
    description: "The AI for Good Foundations' goal is to use AI to accelerate and measure impact on the United Nations SDGs. To achieve this goal, the AI for Good Foundation works, for example, with governments, think tanks or non-profit organizations to help develop AI frameworks, provides digital infrastructure or is involved in specific projects such as the “SDG Trand Scanner”."
  },
  {
    name: "AI.Hamburg",
    tags: ["Politics"],
    link: "https://ai.hamburg/en/",
    location: "Hamburg, Germany",
    description: "The AI for Hamburg initiative is a joint project of private individuals, Hamburg@work, TUTECH, Hamburg universities and municipal partners. As its main task, it describes the mediation and exchange e.g. in the form of workshops, in particular further training offers for company employees, networking with other initiatives and the expansion of an ecosystem for AI."
  },
  {
    name: "Algorithm Watch",
    tags: ["Politics", "Research", "Think tanks/NGOs"],
    link: "https://algorithmwatch.org/en/",
    location: "Berlin, Germany",
    description: "The non-profit organization “AlgorithmWatch” has set itself the goal of observing and classifying processes of algorithmic decision-making that have social relevance. Those processes are defined as processes that either predict or predetermine human decisions, or make decisions automatically. In this context, AlgorithmWatch naturally also deals with AI and ADM."
  },
  {
    name: "Artificial Intelligence Center Hamburg e.V. (ARIC)",
    tags: ["Politics"],
    link: "https://aric-hamburg.de/?lang=en",
    location: "Hamburg, Germany",
    description: "The ARIC is intended to act as a link between application-oriented research and practice-oriented application in order to specifically advance the Hamburg metropolitan region with regard to the topic of AI. To this end, perspectives from the sciences, society, business and entrepreneurship are linked at the center."
  },
  {
    name: "Charité Lab for Artificial Intelligence in Medicine (CLAIM) ",
    tags: ["AI Practice"],
    link: "https://claim.charite.de/en/projects/",
    location: "Berlin, Germany",
    description: "For example, the Charité has an AI project for the treatment or prevention of strokes, but also projects that deal with e.g. image generation to get anonymized training data, as well as Explainable AI."
  },
  {
    name: "CityLAB Berlin",
    tags: ["AI Practice", "Think tanks/NGOs"],
    link: "https://citylab-berlin.org/en/projects/qtrees-2/",
    location: "Berlin, Germany",
    description: "CityLab describes itself as a public experimental laboratory for the city of the future. To this end, startups, administration, civil society and science work together on projects to address the four topics of “Open Data, Open Cities,” “Smart Cities for All,” “Innovative Administration” and “Energy and Sustainability.” One example is the “QTrees” project, which seeks to sustainably counteract urban tree mortality by developing an artificial intelligence (AI)-based forecasting system that incorporates diverse data sets to identify urban trees at risk from drought at an early stage. "
  },
  {
    name: "Claire AI",
    tags: ["Research"],
    link: "https://claire-ai.org/",
    location: "Brussels, Belgium",
    description: "The “Confederation of Laboratories for Artificial Intelligence Research in Europe” is a cluster of excellence for European AI laboratories and institutions. One focus of the research is on “trustworthy AI”."
  },
  {
    name: "Climate Change AI",
    tags: ["Research"],
    link: "https://www.climatechange.ai/",
    location: "Pittsburgh, USA",
    description: "Climate Change AI has an international focus and is research oriented. A summer school is also planned for the summer of 2022, bringing together people with sustainability skills with people from the AI sector to explore how ML can be used for sustainability and possibly foster practical collaborations."
  },
  {
    name: "Competence Center Machine Learning Rhine-Ruhr (ML2R) by Fraunhofer IAIS",
    tags: ["Research"],
    link: "https://www.ml2r.de/en/landingpage/",
    location: "Dortmund, Germany",
    description: "The competence center ML2R is a cooperation of different research institutions on AI, which has the goal to make those research results directly usable for practical applications. In particular, small and medium-sized enterprises are to be prepared for the successful implementation of AI applications through low-threshold access to data, knowledge and strategies. The focus is on the fields of Industry 4.0, multimedia analysis, logistics, cognitive process automation and astrophysics."
  },
  {
    name: "CorrelAid e.V.",
    tags: ["AI Practice"],
    link: "https://correlaid.org/en/",
    location: "Berlin, Germany",
    description: "CorrelAid brings socially minded Data Scientists together with social organizations and thus initiates joint projects. The work therefore mainly consists of networking Data Scientists and non-profit organizations and further education programs for the latter."
  },
  {
    name: "Data Ethics",
    tags: ["Research", "Think tanks/NGOs"],
    link: "https://dataethics.eu/",
    location: "Copenhagen, Denmark",
    description: "DataEthics has focused on building a knowledge base and network for an ethical approach to data economics and policy. It does this by mapping and promoting alternative privacy technologies, human-centered and ethical data-driven solutions, through conferences, representation in various EU and global initiatives/conferences, and content production. The focus is not only on data, but also on AI. This is done, for example, in a recent book on responsible AI."
  },
  {
    name: "Denklabor und Kollaborationsplattform für Gesellschaft & Digitalisierung e.V. (Co:Lab)",
    tags: ["Research", "Politics", "Think tanks/NGOs"],
    link: "https://colab-digital.de/initiativen/koki/",
    location: "Berlin, Germany",
    description: "Co:Lab offers a network of experts, e.g. in the form of the project “AI in the municipalities” which aims to explore the arising possibilities and usecases of AI for municipalities. Co:Lab does not work exclusively on AI, but also deals with other types of software."
  },
  {
    name: "Distributed Artificial Intelligence Research Institute (DAIR Institute)",
    tags: ["Research"],
    link: "https://www.dair-institute.org/",
    location: "Worldwide, ",
    description: "Founded by Timnit Gebru in December 2021, the globally active DAIR has set itself the goal of investigating AI in an interdisciplinary manner and not as an alternative. One focus will be on participatory research priorities and on good communication of research priorities to affected communities. For example, the institute's research will address AI in resource-poor environments or language technology for maginalized communities. "
  },
  {
    name: "Einstein Center for digital Future",
    tags: ["Research"],
    link: "https://www.digital-future.berlin/en/research/projects/aisum/",
    location: "Berlin, Germany",
    description: "The Einstein Center for Digital Future has, among others, a project on AI Empowered Sustainable Urban Mobility Platform (AISUM). The project aims to establish a platform for sustainable urban mobility in which climate protection and resource efficiency are structurally anchored. Users should be able to transparently view the ecological costs of various transport options and be encouraged to use particularly climate-friendly means of transport. "
  },
  {
    name: "European Artificial Intelligence Fund",
    tags: ["Funding"],
    link: "https://europeanaifund.org/",
    location: "Brussels, Belgium",
    description: "The European AI Fund aims to build civil society organizations with AI expertise and enable them to build strategic capacity in advocacy and policy to shape Europe's digital future in the medium and long term. It also aims to network stakeholders."
  },
  {
    name: "European Comission",
    tags: ["Politics"],
    link: "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence",
    location: "Brussels, Belgium",
    description: "The EU Commission has, among others, an initiative on trustworthy AI. This focuses on three areas: 1) a European legal framework for AI that addresses fundamental rights and the specific safety risks of AI systems; 2) EU rules to address liability issues related to new technologies, including AI systems; 3) a revision of sectoral safety legislation (e.g., Machinery Regulation, General Product Safety Directive)."
  },
  {
    name: "Federal Ministry for Family Affairs",
    tags: ["Funding", "Politics"],
    link: "https://www.bmfsfj.de/bmfsfj/meta/en",
    location: "Berlin,Germany",
    description: "For example, as part of the “Artificial Intelligence for the Common Good” program, the BMFSFJ is funding research, implementation, and model projects that either aim to lay the foundations for public good-oriented AI or develop and test it. "
  },
  {
    name: "Federal Ministry of Labour and Social Affairs (BMAS)",
    tags: ["Funding", "Politics"],
    link: "https://www.bmas.de/EN/Home/home.html",
    location: "Berlin, Germany",
    description: "The BMAS promotes AI projects in particular via the Digital Work Society think tank set up by the BMAS. For example, as part of the New Quality of Work initiative, learning and experimentation spaces for AI applications should be created. On the other hand, more research-oriented projects such as “KITQAR” for the development of quality standards are also funded."
  },
  {
    name: "Federal Ministry for the Environment",
    tags: ["Funding", "Politics"],
    link: "https://www.bmuv.de/en/",
    location: "Berlin,Germany",
    description: "For example, under the “AI Lighthouses for Environment, Climate, Nature and Resources,” the BMUV funded AI projects that seek to address environmental challenges through the means of AI."
  },
  {
    name: "Ford Foundation",
    tags: ["Funding"],
    link: "https://www.fordfoundation.org/campaigns/public-interest-technology/",
    location: "New York, USA",
    description: "The Ford Foundation funds public interest tech, which includes public benefit-oriented AI. "
  },
  {
    name: "German AI Association",
    tags: ["Funding", "AI Practice"],
    link: "https://ki-verband.de/en/",
    location: "Berlin, Germany",
    description: "The German AI Association strives to promote non-profit and application-oriented AI projects. For example, it co-initiated the project “Unlikely Allies”, which aims to link AI developers and climate change activists to initiate AI projects for climate protection."
  },
  {
    name: "German Research Center for Artificial Intelligence (DFKI)",
    tags: ["Research", "AI Practice"],
    link: "https://www.dfki.de/en/web",
    location: "Kaiserslautern, Germany",
    description: "The German Research Center for Artificial Intelligence conducts research in the field of AI according to the principles of social relevance and scientific excellence. One example is the Marine Perception research group, which has projects to remove trash from the oceans or monitor climate change, among other things. There is also a close link here with DFKI4planet, the DFKI Competence Center AI for Environment and Sustainability."
  },
  {
    name: "Germany's Platform for Artificial Intelligence",
    tags: ["Think tanks/NGOs"],
    link: "https://www.plattform-lernende-systeme.de/home-en.html",
    location: "Munich, Germany",
    description: "Among other things, Germany's platform for artificial intelligence maintains a map of “AI for Sustainability” projects in Germany. The network of experts also aims to promote independent exchange and social dialog on AI."
  },
  {
    name: "German Informatics Society (GI)",
    tags: ["Research", "Think tanks/NGOs"],
    link: "https://gi.de/aktuelles/projekte",
    location: "Bonn, Germany",
    description: "The Gesellschaft für Informatik has, among others, a project on AI Testing & Auditing and a project on Educational Concepts for Data Literacy and Artificial Intelligence (AI) Competencies to embed this into teacher and school education."
  },
  {
    name: "Google.org",
    tags: ["Funding"],
    link: "https://www.google.org/",
    location: "Mountain View, USA",
    description: "Google.org promotes tech in particular, including AI projects, among others in the form of the Google AI initiative or the AI Impact Challenge. The focus here is to be on the common good orientation of the funded projects. Most recently, for example, projects by non-profit organizations that support accessibility were funded with 20 million."
  },
  {
    name: "Hasso Plattner Institut (HPI)",
    tags: ["Research"],
    link: "https://hpi.de/en/open-campus/hpi-initiatives/ki-campus.html",
    location: "Potsdam, Germany",
    description: "The Hasso Plattner Institute is a co-initiator of the AI Campus and also offers educational programs on AI on its own website."
  },
  {
    name: "Helsinki (Finnland)",
    tags: ["Politics", "AI Practice"],
    link: "https://ai.hel.fi/en/ai-register/",
    location: "Helsinki, Finland",
    description: "Helsinki uses various AI applications to facilitate citizen services, such as a material management system or a health center chatbot. What is special about all these city systems is that detailed information can be obtained and feedback can be given on the applications. In this way, the applications are to be developed in a more user- and community-friendly way."
  },
  {
    name: "Hugging Face ",
    tags: ["AI Practice"],
    link: "https://huggingface.co/",
    location: "Paris, France",
    description: "Hugging Face is an NLP startup with a focus on chatbots. They are also known as a platform for pre-trained Deep Learning models. Hugging Face does not produce the models themselves, but offers a platform that is also used by Facebook, Google, etc. to provide pre-trained models."
  },
  {
    name: "iRights.Lab",
    tags: ["Think tanks/NGOs", "Politics"],
    link: "https://www.irights-lab.de/en/",
    location: "Berlin, Germany",
    description: "The iRights Lab has set itself the goal of developing strategies and practical solutions to profitably manage the changes emerging with digitalization for society as a whole. Their engagement with AI includes, for example, a study on AI in government and the project DaSKITA - Data Sovereignty through AI-based Transparency and Information. The goal of this three-year project is the development and prototypical testing of AI-based concepts, mechanisms, and tools that provide consumers with a higher degree of information and self-determination in the context of digital services."
  },
  {
    name: "Luminate",
    tags: ["Funding"],
    link: "https://luminategroup.com/investee/ethics-governance-of-ai-fund",
    location: "Washington D.C. and London, USA and UK",
    description: "Founded in 2018, Luminate is a global philanthropic organization with a mission to empower people and institutions to work together to build a just and fair society. It does this by funding and supporting nonprofit and for-profit organizations, and by advocating for policies and actions that help people participate in and shape the issues that affect their lives, and that make those in power more transparent, responsive, and accountable. Luminate focuses on creating impact in four interconnected areas: Citizen Participation, Data and Digital Rights, Financial Transparency, and Independent Media. In the area of AI, Luminate promotes the AI Ethics and Governance Initiative, led by MIT and the Berkmann Klein Center, which targets public interest AI."
  },
  {
    name: "Mercator Stiftung",
    tags: ["Funding"],
    link: "https://www.stiftung-mercator.de/en/what-we-work-on/projects/",
    location: "Essen, Germany",
    description: "The Mercator Foundation supports AI projects, including, for example, AlgorithmWatch, the Data Science Unit at the Stiftung Neue Verantwortung, and the ethical AI development roundtable series of the Gesellschaft für Informatik. Other AI-related projects by and with organizations that also take a public good approach are also funded."
  },
  {
    name: "Microsoft AI for Good",
    tags: ["Funding"],
    link: "https://www.microsoft.com/de-de/ai/ai-for-good",
    location: "Redmont, USA",
    description: "Microsoft AI for Good supports AI projects in the programs “AI for Earth”, “Health”, “Accessibility” and “Humanitarian Action”. Microsoft is headquartered in the USA, but projects are funded internationally, including in Germany. Some of the case studies listed, for example, receive or received funding."
  },
  {
    name: "Mozilla Foundation",
    tags: ["AI Practice", "Funding"],
    link: "https://foundation.mozilla.org/en/internet-health/trustworthy-artificial-intelligence/",
    location: "San Francisco, USA",
    description: "The Mozilla Foundation has a project on trustworthy AI that takes several approaches. Among them, for example, is #YouTubeRegrets, a project in which civilians can report when they have seen disturbing suggestions displayed on YouTube (https://foundation.mozilla.org/de/youtube/regrets/)."
  },
  {
    name: "Observatory on Artificial Intelligence in Work and Society",
    tags: ["Politics", "Research"],
    link: "https://www.ki-observatorium.de/en/",
    location: "Berlin, Germany",
    description: "This initiative of the Federal Ministry of Labour and Social Affairs analyses, develops and evaluates AI systems and AI Literacy in the work context."
  },
  {
    name: "Open Data Berlin",
    tags: ["Funding"],
    link: "https://daten.berlin.de/",
    location: "Berlin, Germany",
    description: "Open Data Berlin is not a direct funding agency, but it makes data available and provides a platform to publish its own applications. For example, Open Data Berlin hosts a program created by civilians that documents Berlin sidewalk work. Open Data Berlin is not focused on AI, however AI applications benefit because data is made available."
  },
  {
    name: "Prototype Fund",
    tags: ["Research", "Politics", "Think tanks/NGOs"],
    link: "https://prototypefund.de/en/",
    location: "Berlin, Germany",
    description: "Prototypefund supports software projects that serve the common good. There is no specific focus on AI, but many AI projects are funded."
  },
  {
    name: "Responsible AI Learning Lab",
    tags: ["Politics"],
    link: "https://www.cerri.iao.fraunhofer.de/de/projekte/railearninglab.html",
    location: "Berlin, Germany",
    description: "In free workshops, stakeholders from business, administration and politics are provided with assistance for the responsible use of AI. The program also plans to reflect on the experiences gained from these workshops and to develop proposals for action for political decision-makers."
  },
  {
    name: "Stiftung Neue Verantwortung (SNV)",
    tags: ["Think tanks/NGOs", "Research"],
    link: "https://www.stiftung-nv.de/en/node/2986",
    location: "Berlin, Germany",
    description: "The Stiftung Neue Verantwortung examines AI in the context of foreign policy, societal, economic, and security issues. Which actors decide on the global regulatory framework for artificial intelligence? What conditions must be created nationally to minimize the risks of this technology? How can political AI strategies be implemented and strategically managed? What attack and defense vectors do machine learning systems offer in the context of cybersecurity? They have a Data Science Unit dedicated to these questions, among others: How error-prone and potentially discriminatory are certain AI systems, or how active are individual stakeholders in ongoing international negotiations?"
  },
  {
    name: "Sustainable AI Lab",
    tags: ["Research"],
    link: "https://sustainable-ai.eu/",
    location: "Bonn, Germany",
    description: "The Sustainable AI Lab creates a space where a group of researchers from different fields can collaborate and share ideas on the environmental, social, and economic costs of designing, developing, and using AI in society."
  },
  {
    name: "Technology Foundation Berlin (TSB)",
    tags: ["AI Practice", "Funding"],
    link: "https://www.technologiestiftung-berlin.de/",
    location: "Berlin, Germany",
    description: "The Technology Foundation supports technology projects. It does not focus specifically on AI, but AI projects can also be funded. It is the umbrella organization for programs such as City Lab, KulturBDigital or COMo for CO2 monitoring in indoor spaces."
  },
  {
    name: "The Berlin Institute for the Foundations of Learning and Data (BIFOLD)",
    tags: ["Research"],
    link: "https://bifold.berlin/de/research/#xai-lab",
    location: "Berlin, Germany",
    description: "The Berlin Institute for the Foundation of Learning and Data is a research institute that conducts broad-based basic research, especially on ML and data management. With respect to the public good aspect of the institute, a research group on XAI - “Explaining Deep Neural Networks” is particularly noteworthy."
  },
  {
    name: "The Bertelsmann Stiftung/Ethics of Algorithms",
    tags: ["Funding", "Research", "Think tanks/NGOs"],
    link: "https://www.bertelsmann-stiftung.de/en/our-projects/ethics-of-algorithms",
    location: "Gütersloh, Germany",
    description: "The project “Ethics of Algorithms” deals with the social consequences of algorithmic decision making. The aim is to contribute to a design of algorithmic systems that leads to more participation. "
  },
  {
    name: "The German Agency for International Cooperation (GIZ)",
    tags: ["AI Practice"],
    link: "https://www.giz.de/en/workingwithgiz/93909.html",
    location: "Bonn and Eschborn, Germany",
    description: "The German Society for International Cooperation is committed to sustainable development and educational work worldwide. Among other things, it also uses AI methods, such as in the projects of “Digital Umuganda” and “Common Voice”, but also carries out educational work in this area. The GIZ formulates the following goals with regard to AI: “Building local competence in AI in Africa and Asia, access to training data and AI technology for local AI companies, political framework conditions for value-based AI and better data protection.”"
  },
  {
    name: "The Policy Lab",
    tags: ["Research", "Think tanks/NGOs", "Politics"],
    link: "https://www.denkfabrik-bmas.de/en/topics/artificial-intelligence",
    location: "Berlin, Germany",
    description: "The Artificial Intelligence in Labor and Social Administration Network of the BMAS exchanges views on how artificial intelligence (AI) can be used in administration. The aim is to develop self-committed guidelines for practice that ensure responsible handling of AI. "
  },
  {
    name: "TU Darmstadt",
    tags: ["Research"],
    link: "https://www.tu-darmstadt.de/nachhaltigkeit/news_nachhaltigkeit_details_345088.de.jsp",
    location: "Darmstadt, Germany",
    description: "The TU Darmstadt advertises a high level of interdisciplinarity with regard to AI research there, for example through its close ties to the cognitive sciences. Through the research fields on search and rescue procedures, the use of AI in agriculture and in relation to learning procedures, the research covers a broad field. For example, a project on the prediction of leaks and burst pipes arose from this framework and demonstrates the potential public benefit."
  },
  {
    name: "Tübingen AI Center",
    tags: ["Research"],
    link: "https://tuebingen.ai/",
    location: "Tübingen, Germany",
    description: "In particular, the Tübingen AI Center carries out outreach and educational work through offerings such as the Federal Artificial Intelligence Competition, an online course on artificial intelligence, and support for initiatives such as IT4Kids and KI macht Schule."
  },
  {
    name: "Vodafone Institute for Society and Communications",
    tags: ["Think tanks/NGOs"],
    link: "https://www.vodafone-institut.de/studies/artificial-intelligence-and-climate-change-13-policy-recommendations-to-meet-current-challenges/",
    location: "Berlin, Germany",
    description: "The Vodafone Institute wants to analyze the possibilities of digital technologies and their responsible use for innovation, growth and sustainable social impact. With the help of studies and events, it aims to offer a platform for dialog between science, business and politics. The institute has published several studies on AI, including one on AI and the environment/sustainability, one on AI and human rights, and one on the positive impact of AI on employees."
  },
  {
    name: "Volkswagen Stiftung",
    tags: ["Funding"],
    link: "https://www.volkswagenstiftung.de/en/funding/our-funding-portfolio-at-a-glance/artificial-intelligence-and-the-society-of-the-future",
    location: "Hannover, Germany",
    description: "In addition to funding AlgorithmWatch, the Volkswagen Foundation also has an initiative called “Artificial Intelligence - Its Impact on Tomorrow's Society.” At its core, the initiative aims to promote joint, integrative research approaches between the social sciences and engineering. Against the backdrop of the current and emerging developments taking place under the term “artificial intelligence,” the aim is to enable new perspectives and insights with a view to shaping the future of society as well as technology, based on present-day diagnoses. "
  },
  {
    name: "Weizenbaum Institute",
    tags: ["Research"],
    link: "https://www.weizenbaum-institut.de/en/research/rg20/#page=1&sort=date",
    location: "Berlin, Germany",
    description: "At the Weizenbaum Institute, among others, a research group is working on “Criticality of AI-based Systems”. The focus is on the interplay between the consideration of AI as technology and cultural artifact. On the one hand, it is to be investigated at which technical level AI applications are, and on the other hand, the idea of the culturally made nature of this technology is to be maintained within the framework of an investigation of discourses and symbolic charges. In addition, the “horizon of the current state of user-oriented AI, AI for the common good, and inclusive AI” will be expanded."
  },
  {
    name: "Zindi",
    tags: ["AI Practice"],
    link: "https://zindi.africa/",
    location: "Ebène, Mauritius",
    description: "The Zindi platform does networking work by connecting Data Scientists with organizations through competitions. According to its own information, Zindi is home to the largest community of data scientists in African countries. It offers learning and communication opportunities, but most importantly, competitions to solve specific existing problems in a fixed time frame using AI, such as the Microsoft Rice Disease Classification Challenge. The first places receive prize money."
  }  
];
