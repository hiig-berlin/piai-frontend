import React from "react";

// SYNTAX (array of objects)
// =========================

// Object structure per stakeholder:
// 
// {
//   name: String,
//   tags: Array of Strings,
//   link: String (absolute link),
//   location: String (City, Country),
//   description: String
//   fundingFor?: Array of Objects (title: String, url: String)
// }
//
// ADDING FUNDED PROJECTS
// ======================
// 
//   …
//   description: "Some description",
//   fundingFor: [
//     { 
//       title: "Adams and Sons", 
//       url: "/tool/map/project/adams-and-sons" 
//     },{
//       title: "Bechtelar, Heathcote and Bogan", 
//       url: "/tool/map/project/bechtelar-heathcote-and-bogan"
//     }
//   ]
// }
//
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

export const stakeholderList = [
  {
    name: "Access Now",
    tags: ["Research", "Think Tank/NGO"],
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
    name: "Ada Lovelace Institute",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://www.adalovelaceinstitute.org/",
    location: "London, UK",
    description: "Through research, policy and practice, we aim to ensure that the transformative power of data and AI is used and harnessed in ways that maximise social wellbeing and put technology at the service of humanity."
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
    name: "AI for Peace",
    tags: ["Think Tank/NGO", "Research"],
    link: "https://www.aiforpeace.org",
    location: "San Francisco, CA, USA",
    description: "AI for Peace is a Nonprofit/NGO organization focused on creating a future in which AI benefits peace, security and sustainable development and where diverse voices influence creation of AI and related technologies."
  },
  {
    name: "AI Forum New Zealand",
    tags: ["Think Tank/NGO", "Funding"],
    link: "https://aiforum.org.nz",
    location: "Northshore, New Zealand",
    description: "The AI Forum brings together New Zealand’s community of artificial intelligence technology innovators, end users, investor groups, regulators, researchers, educators, entrepreneurs and interested public to work together to find ways to use AI to help enable a prosperous, inclusive and thriving future for our nation."
  },
  {
    name: "AI Now Institute",
    tags: ["Research"],
    link: "https://ainowinstitute.org",
    location: "New York, NY, USA",
    description: "The AI Now Institute at New York University aims to produce interdisciplinary research and public engagement to help ensure that AI systems are accountable to the communities and contexts in which they're applied."
  },
  {
    name: "AI4media",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://www.ai4media.eu/",
    location: "Europe",
    description: "AI4Media is a 4-year-long project funded under the European Union’s Horizon 2020 research and innovation programme, the project aspires to become a Centre of Excellence engaging a wide network of researchers across Europe and beyond, focusing on delivering the next generation of core AI advances and training to serve the Media sector, while ensuring that the European values of ethical and trustworthy AI are embedded in future AI deployments."
  },
  {
    name: "AI.Hamburg",
    tags: ["Politics"],
    link: "https://ai.hamburg/en/",
    location: "Hamburg, Germany",
    description: "The AI for Hamburg initiative is a joint project of private individuals, Hamburg@work, TUTECH, Hamburg universities and municipal partners. As its main task, it describes the mediation and exchange e.g. in the form of workshops, in particular further training offers for company employees, networking with other initiatives and the expansion of an ecosystem for AI."
  },
  {
    name: "Alan Turing Institute",
    tags: ["Research"],
    link: "https://www.turing.ac.uk/",
    location: "London, UK",
    description: "We are the national institute for data science and artificial intelligence. We believe data science and artificial intelligence will change the world. We are pioneers; training the next generation of leaders, shaping the public conversation, and pushing the boundaries of these sciences for the public good."
  },
  {
    name: "Algorithm Watch",
    tags: ["Politics", "Research", "Think Tank/NGO"],
    link: "https://algorithmwatch.org/en/",
    location: "Berlin, Germany",
    description: "The non-profit organization “AlgorithmWatch” has set itself the goal of observing and classifying processes of algorithmic decision-making that have social relevance. Those processes are defined as processes that either predict or predetermine human decisions, or make decisions automatically. In this context, AlgorithmWatch naturally also deals with AI and ADM."
  },
  {
    name: "Algorithmic Fairness and Openness Group, UC Berkeley",
    tags: ["Research"],
    link: "https://afog.berkeley.edu",
    location: "Berkeley, CA, USA",
    description: "The Algorithmic Fairness and Opacity Group (AFOG) is an interdisciplinary research group housed at the UC Berkeley School of Information, bringing together faculty, postdocs, and graduate students from Information Studies, Sociology, Law, Communication, Media Studies, Computer Science, and the Humanities, among others. We conduct research, education, develop policy, build systems, bring theory into practice, and bridge disciplinary boundaries. Throughout our efforts, we center human values in the design and use of technical systems to support more equitable and just societies."
  },
  {
    name: "Algorithmic Governance Research Network",
    tags: ["Research"],
    link: "https://www.algorithmic-governance.com/",
    location: "Oslo, Norway",
    description: "Algorithmic Governance is an interdisciplinary research network dedicated to understanding the social implications of artificial intelligence, big data, platform capitalism, datafied knowledge, and automated decision-making on society."
  },
  {
    name: "Algorithmic Impact Methods Lab (AIMLab",
    tags: ["Research"],
    link: "https://datasociety.net/algorithmic-impact-methods-lab/",
    location: "New York, USA",
    description: "The Algorithmic Impact Methods Lab (AIMLab) will develop robust public interest methodologies to evaluate how increasingly ubiquitous automated decision-making systems impact people’s lives and society at large. It will do so through collaborative, experimental work, to demonstrate not only that measuring these impacts is possible, but how and why it can be done in the public interest."
  },
  {
    name: "All Tech Is Human (ATIH)",
    tags: ["Think Tank/NGO"],
    link: "https://alltechishuman.org/",
    location: "New York, NY, USA",
    description: "All Tech Is Human is a non-profit committed to connecting and expanding the Responsible Tech ecosystem so we can co-create a better tech future. We do this through a variety of activities focused around three key areas: multi-stakeholder convenings & community-building, multidisciplinary education, and diversifying the pipeline with more backgrounds and lived experiences. Our organization has a large community Slack group, regular summits & mixers, a mentorship program, university ambassadors program, open working groups that develop reports, office hours, a job board, and our Responsible Tech Guide."
  },
  {
    name: "ALLAI",
    tags: ["Politics"],
    link: "https://allai.nl/",
    location: "Amsterdam, Netherlands",
    description: "ALLAI is an independent organization dedicated to drive and foster Responsible AI. ALLAI is an initiative of Catelijne Muller, Virginia Dignum and Aimee van Wynsberghe, the three Dutch members of the EU High Level Expert Group on Artificial Intelligence."
  },
  {
    name: "Allen Institute for Artificial Intelligence",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://allenai.org/",
    location: "Washington, D.C., USA",
    description: "AI2 is a non-profit research institute founded in 2014 with the mission of conducting high-impact AI research and engineering in service of the common good. AI2 is the creation of the late Paul Allen, philanthropist and Microsoft co-founder, and is led by Dr. Oren Etzioni, a leading AI researcher."
  },
  {
    name: "Artificial Intelligence Center Hamburg e.V. (ARIC)",
    tags: ["Politics"],
    link: "https://aric-hamburg.de/?lang=en",
    location: "Hamburg, Germany",
    description: "The ARIC is intended to act as a link between application-oriented research and practice-oriented application in order to specifically advance the Hamburg metropolitan region with regard to the topic of AI. To this end, perspectives from the sciences, society, business and entrepreneurship are linked at the center."
  },
  {
    name: "Aspen Institute",
    tags: ["Think Tank/NGO", "Research"],
    link: "https://www.aspeninstitute.org/",
    location: "Washington, D.C., USA",
    description: "We empower policymakers civic organizations, companies, and the public to be responsible stewards of technology and digital media in the service of a more just and equitable world."
  },
  {
    name: "Atomium European Institute for Science, Media & Democracy",
    tags: ["Politics", "Research"],
    link: "https://www.eismd.eu/",
    location: "Brussels, Belgium",
    description: "Starting from the '7 Key Requirements for a Trustworthy AI' published by the European Commission in April 2019, AI4People’s Committees members have assessed the impact of these requirements on 7 business sectors (Automotive, Banking and Finance, Energy, Healthcare, Insurance, Legal Services Industry and Media and Technology) whilst having suggested some practical steps that businesses operating within these industries must undertake to be compliant with the Requirements."
  },
  {
    name: "Berggruen China Center, Berggruen Institute",
    tags: ["Research"],
    link: "https://www.berggruen.org/work/berggruen-china-center/",
    location: "China",
    description: "The Berggruen China Center is a hub for East-West research and dialogue dedicated to the cross-cultural and interdisciplinary study of the transformations affecting humanity. Intellectual themes for researchers and visiting scholars focus on frontier technologies and society—specifically in artificial intelligence, the microbiome, and gene editing as well as issues involving global governance and globalization."
  },
  {
    name: "Berkman Klein Center for Internet & Society, Harvard University",
    tags: ["Research"],
    link: "https://cyber.harvard.edu",
    location: "Cambridge, MA, USA",
    description: "The Berkman Klein Center for Internet & Society at Harvard University is dedicated to exploring, understanding, and shaping the way we use technology."
  },
  {
    name: "Block Center for Technology and Society, Carnegie Mellon University",
    tags: ["Research"],
    link: "https://www.cmu.edu/block-center/",
    location: "Pittsburgh, PA, USA",
    description: "The Block Center focuses on how emerging technologies will alter the future of work, how AI and analytics can be harnessed for social good, and how innovation in these spaces can be more inclusive and generate targeted, relevant solutions that reduce inequality and improve quality of life."
  },
  {
    name: "Bristol Digital Futures Institute, Universtiy of Bristol",
    tags: ["Research"],
    link: "https://bristol.ac.uk/fssl/research/sociodigital-futures/about/",
    location: "Bristol, United Kingdom",
    description: "The Centre for Sociodigital Futures is a £10m flagship investment from the Economic and Social Research Council (ESRC) to establish an international centre of excellence for sociodigital futures research and collaboration (to run for an initial five years from 2022 to 2027). It brings together world leading expertise in the Social Sciences, Engineering and the Arts, led from the University of Bristol in collaboration with the Universities of Birmingham, Edinburgh, Goldsmiths (University of London), the Institute of the Arts (University of London) and Lancaster."
  },
  {
    name: "C Minds",
    tags: ["Think Tank/NGO", "AI Practice", "Research"],
    link: "https://www.cminds.co/",
    location: "Mexcio City, Mexico",
    description: "C Minds is a women-led action tank that promotes the responsible development, use, and research of pioneer technology for impact in Latin America. We achieve our purpose by designing digital policies and ethical frameworks and deploying initiatives that harness new technologies, such as AI &VR/AR, to advance Sustainable Development Goals (SDGs). We are both strategists and implementers. We believe in the power of multisector collaborations and multidisciplinary approaches. We are proud to be one of the leading organizations in Latin America that have driven change, together with our partners, in the tech for good field for the last 10 years."
  },
  {
    name: "Center for Advancing Safety of Machine Intelligence (CASMI), Northwestern University",
    tags: ["Research"],
    link: "https://casmi.northwestern.edu",
    location: "Evanston, IL, USA",
    description: "The Center for Advancing Safety of Machine Intelligence (CASMI) leads a research vision and dynamic research network that is establishing best practices for the evaluation, design, and development of machine intelligence that is safe, equitable, and beneficial. CASMI is a collaboration with the UL Research Institutes' Digital Safety Research Institute, building on UL’s 128-year mission to create a safer, more secure, and sustainable future."
  },
  {
    name: "Center for Applied Data Ethics, University of San Francisco",
    tags: ["Research"],
    link: "https://www.usfca.edu/data-institute/initiatives/center-applied-data-ethics",
    location: "San Francisco, CA, USA",
    description: "At the Center for Applied Data Ethics (CADE), we are working to address ethical issues such as the magnification of unjust bias, increased surveillance, spread of disinformation, alarming uses of predictive policing, a lack of accountability for tech companies, and more. Our focus is on having a direct, practical impact. Our inaugural year is funded by a generous donation from Craig Newmark (founder of Craigslist). Our work includes a mix of education, research, public policy, and civil advocacy."
  },
  {
    name: "Center for Critical Internet Inquiry, UC Los Angeles",
    tags: ["Research"],
    link: "https://www.c2i2.ucla.edu/home/",
    location: "Los Angeles, CA, USA",
    description: "UCLA Center for Critical Internet Inquiry (C2i2) is an intersectional research community committed to reimagining technology, championing racial justice, and strengthening democracy through a mix of research, culture, and policy."
  },
  {
    name: "Center for Data Ethics and Justice, University of Virginia",
    tags: ["Research"],
    link: "https://datascience.virginia.edu/center-data-ethics-and-justice",
    location: "Charlottesville, VA, USA",
    description: "Centering ethics and justice at the core of data science The Center for Data Ethics and Justice equips researchers, faculty and students at the University of Virginia to address relevant ethical, social and political issues that intersect with data science."
  },
  {
    name: "Center for Ethics - Ethics of AI Lab, University of Toronto",
    tags: ["Research"],
    link: "https://ethics.utoronto.ca/ethics-of-ai-in-context-eaic4e/",
    location: "Toronto, Canada",
    description: "Since 2017, the Ethics of AI Lab at the University of Toronto’s Centre for Ethics has fostered academic and public dialogue about Ethics of AI in Context—the normative dimensions of artificial intelligence and related phenomena in all aspects of private, public, and political life."
  },
  {
    name: "Center for Ethics, Society, and Computing, University of Michigan",
    tags: ["Research"],
    link: "https://esc.umich.edu",
    location: "Ann Arbor, MI, USA",
    description: "The ESC key was added to the computer keyboard to interrupt a program when it produced unwanted results, allowing the system to be critically examined. In the same way, the Center for Ethics, Society, and Computing (ESC – pronounced “escape”) is dedicated to intervening when digital media and computing technologies reproduce inequality, exclusion, corruption, deception, racism, or sexism. ESC is a research center and a collective of scholars committed to feminist, justice-focused, inclusive, and interdisciplinary approaches to computing. We are invested in the social, cultural, and political dimensions of digital technologies. We intercede in structures of power and inequality. We work with educators, workers, industrial practitioners, and policymakers."
  },
  {
    name: "Center for Human-Compatible AI, UC Berkeley",
    tags: ["Research"],
    link: "https://humancompatible.ai",
    location: "Berkeley, CA, USA",
    description: "The goal is to develop the conceptual and technical wherewithal to reorient the general thrust of AI research towards provably beneficial systems."
  },
  {
    name: "Center for Information Technology and Policy, Princeton University",
    tags: ["Research"],
    link: "https://citp.princeton.edu",
    location: "Princeton, NJ, USA",
    description: "CITP is an interdisciplinary center at Princeton University. The center is a nexus of expertise in technology, engineering, public policy, and the social sciences on campus. In keeping with the strong University tradition of service, the center’s research, teaching, and events address digital technologies as they interact with society."
  },
  {
    name: "Center for Information Technology Research in the Interest of Society Policy Lab",
    tags: ["Research", "Politics"],
    link: "https://citrispolicylab.org",
    location: "Pittsburgh, PA, USA",
    description: "The CITRIS Policy Lab supports interdisciplinary technology policy research and engagement to better ensure development and deployment of technology in the interest of society to address core questions regarding the role of formal and informal regulation in promoting innovation and amplifying its positive effects on society. For nearly 20 years, CITRIS and the Banatao Institute have brought together leading researchers at UC Berkeley, UC Davis, UC Merced, and UC Santa Cruz to advance information technology development and application for the public good in such areas as sustainable energy; water and transportation systems; robotics and artificial intelligence; civic engagement; and health care."
  },
  {
    name: "Center for Law, Science, and Innovation, Arizona State University",
    tags: ["AI Practice"],
    link: "https://law.asu.edu/centers/law-science-innovation",
    location: "Tempe, AZ, USA",
    description: "As science and technology assume central roles in our lives, economy, and legal system, the Center for Law, Science and Innovation is uniquely positioned as an innovator in teaching and applying science, technology and law. From robotics to genetics, neuroscience to nanotech, LSI’s innovative projects and programs constantly evolve to address challenging governance and policy issues through cutting-edge curriculum, practical experience, conferences and workshops, research projects, and scholarship."
  },
  {
    name: "Center for Responsible AI München",
    tags: ["Research"],
    link: "https://www.center-responsible-ai.de/",
    location: "Munich, Germany",
    description: "The Center researches with a focus on AI ethics, specifically targeting the thematic fields of Medicine, Future of Work, Mobility and Climate. To enhance discourse and outreach, the center wants to initiate also citizen dialogue formats and political advise."
  },
  {
    name: "Center for Responsible AI, New York University",
    tags: ["Research"],
    link: "https://airesponsibly.net/",
    location: "New York, NY, USA",
    description: "We build the future in which responsible AI is the only AI.The Center for Responsible AI (R/AI) is making AI work for everyone. We catalyze policy and industry impact, foster interdisciplinary research and education, and build an equitable and socially sustainable ecosystem of AI innovation."
  },
  {
    name: "Centre for Technomoral Futures",
    tags: ["Research"],
    link: "https://www.technomoralfutures.uk/our-story",
    location: "Edinburgh, Scotland",
    description: "The Centre’s mission is to unify technical and moral knowledge in new models of research, education, design and engagement In order to serve the goals of sustainable, just and ethical innovation. Central are an approach of participatory knowledge and civic engagement while focusing on Data-Driven Innovation. The Research Themes span Ethics of Algorithms and Human-Machine Interactions, Politics of Data and Emerging Technologies."
  },
  {
    name: "Center for Technology, Society & Policy, UC Berkeley",
    tags: ["Research"],
    link: "https://ctsp.berkeley.edu",
    location: "Berkeley, CA, USA",
    description: "The Center for Technology, Society & Policy is a multidisciplinary research and design/build center focusing on the emergent social and policy issues arising from the development and adoption of technology."
  },
  {
    name: "Center for trustworthy AI (ZVKI)",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://www.zvki.de/en",
    location: "Berlin, Germany",
    description: "The Center situates itself at the intersection of Science, Politics, Civic Society and Economy and wants to inform via public discussions and the development of tool to evaluate and certify AI regarding Trustworthiness. The ZVKI envisions itself as a place for debate on the future of AI regarding societal questions. "
  },
  {
    name: "Centre for AI Innovation (CEAI)",
    tags: ["AI Practice"],
    link: "https://ceaiglobal.com",
    location: "Singapore",
    description: "CEAI is primarily formed as an effort by MyFinB Group with the objective to support society at large, people and industries with AI solutions aligned with the SDG17 goals of the United Nations. At CEAI, we believe AI can help drive positive impact by solving some of the world’s most pressing challenges. While the prime advantage of AI is to enhance business and the economy, AI for Positive Impact focuses on the aspect of artificial intelligence applied for helping people and the environment. By using AI for positive impact, CEAI supports social innovation projects in many SDG sectors such as Education, Health and Wellbeing, Clean energy, Industry innovation and infrastructure, responsible consumption and production to name a few."
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
    tags: ["AI Practice", "Think Tank/NGO"],
    link: "https://citylab-berlin.org/en/projects/qtrees-2/",
    location: "Berlin, Germany",
    description: "CityLab describes itself as a public experimental laboratory for the city of the future. To this end, startups, administration, civil society and science work together on projects to address the four topics of “Open Data, Open Cities,” “Smart Cities for All,” “Innovative Administration” and “Energy and Sustainability.” One example is the “QTrees” project, which seeks to sustainably counteract urban tree mortality by developing an artificial intelligence (AI)-based forecasting system that incorporates diverse data sets to identify urban trees at risk from drought at an early stage. "
  },
  {
    name: "Civic Coding",
    tags: ["Network", "Politics"],
    link: "https://www.civic-coding.de/",
    location: "Berlin, Germany",
    description: "The Initiative Civic Coding is aiming at unifying forces to connect communities, enhance infrastructures and bring together already existing projects to help forming a living network for public interest oriented AI projects."
  },
  {
    name: "Coding It Forward",
    tags: ["Think Tank/NGO"],
    link: "https://www.codingitforward.com/about/#mission-and-story",
    location: "Washington, DC, USA",
    description: "Nonprofit for early-career technologists creating new pathways into public interest technology."
  },
  {
    name: "Cyber Valley",
    tags: ["Network", "Funding"],
    link: "https://cyber-valley.de/",
    location: "Stuttgart & Tübingen, Germany",
    description: "The Network is a large research cooperation in the field of AI and aims at bringing academic and private sector partners together to bridge gaps between academic basic research and applied research."
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
    name: "CodingRights",
    tags: ["Think Tank/NGO"],
    link: "https://codingrights.org",
    location: "Brazil",
    description: "Coding Rights is a Brazilian-based think tank that aims to advance the enforcement of human rights in the digital world. Its goal is to ensure that policy-making affecting technological development and digital rights is informed by actual technological knowledge, and that technological development is guided by fundamental human rights."
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
    tags: ["Research", "Think Tank/NGO"],
    link: "https://dataethics.eu/",
    location: "Copenhagen, Denmark",
    description: "DataEthics has focused on building a knowledge base and network for an ethical approach to data economics and policy. It does this by mapping and promoting alternative privacy technologies, human-centered and ethical data-driven solutions, through conferences, representation in various EU and global initiatives/conferences, and content production. The focus is not only on data, but also on AI. This is done, for example, in a recent book on responsible AI."
  },
  {
    name: "Data Science for Good, Boston University",
    tags: ["Research"],
    link: "https://www.bu.edu/cds-faculty/research-impact/ds4g/",
    location: "Boston, MA, USA",
    description: "The goal of the DS4G Initiative at BU is to provide the infrastructure and visibility needed to expand BU’s research, programs and curricula around civic-minded technology. As the convener and accelerator of the PIT work of BU faculty and students, DS4G leverages the expertise of BU’s 17 schools and colleges."
  },
  {
    name: "Data Science for Social Impact, University of Pretoria",
    tags: ["Research", "AI Practice"],
    link: "https://dsfsi.github.io/",
    location: "Tshwane, South Africa",
    description: "Our general areas of work straddle Data Science for Society as well as Local Language Natural Language Processing. These two strands are complementary. Our work in Data Science and Society has allowed us to have a more nuanced approach to understanding the systematic challenges that face being able to do excellent science with local languages. Through Data Science for Society, we have to understand how when one carries through Data Science research, we situate how the users are part of the process. We find that we need to adjust our research to take care of these challenges and innovate in ways we gather direct data or alternative data."
  },
  {
    name: "DataDotOrg",
    tags: ["Think Tank/NGO", "AI Practice"],
    link: "https://data.org/",
    location: "New York, NY, USA",
    description: "data.org is a platform for partnerships to build the field of data for social impact. We work with organizations from all over the world to increase the use of data in order to improve the lives of millions of people."
  },
  {
    name: "Denklabor und Kollaborationsplattform für Gesellschaft & Digitalisierung e.V. (Co:Lab)",
    tags: ["Research", "Politics", "Think Tank/NGO"],
    link: "https://colab-digital.de/initiativen/koki/",
    location: "Berlin, Germany",
    description: "Co:Lab offers a network of experts, e.g. in the form of the project “AI in the municipalities” which aims to explore the arising possibilities and usecases of AI for municipalities. Co:Lab does not work exclusively on AI, but also deals with other types of software."
  },
  {
    name: "Digital Life Initiative, Cornell Tech",
    tags: ["Research"],
    link: "https://www.dli.tech.cornell.edu",
    location: "New York, NY, USA",
    description: "We explore societal perspectives surrounding the development and application of digital technology, focusing on ethics, policy, politics, and quality of life. Embedded within the progressive teaching mission of Cornell Tech on Roosevelt Island, the Digital Life Initiative (DLI) was launched in 2017 to analyze the societal tensions arising from existing and emergent digital technologies. Inspired by the core values of justice, democracy, privacy, responsibility, security, and freedom, we support collaborative research projects that explore ethics, policy, politics and quality of life within prevailing socio-technical systems."
  },
  {
    name: "Distributed Artificial Intelligence Research Institute (DAIR Institute)",
    tags: ["Research"],
    link: "https://www.dair-institute.org/",
    location: "Worldwide",
    description: "Founded by Timnit Gebru in December 2021, the globally active DAIR has set itself the goal of investigating AI in an interdisciplinary manner and not as an alternative. One focus will be on participatory research priorities and on good communication of research priorities to affected communities. For example, the institute's research will address AI in resource-poor environments or language technology for maginalized communities."
  },
  {
    name: "DrivenData Inc.",
    tags: ["Think Tank/NGO", "Research", "AI Practice"],
    link: "https://www.drivendata.org",
    location: "Denver, CO, USA",
    description: "DrivenData works on projects at the intersection of data science and social impact, in areas like international development, health, education, research and conservation, and public services. We want to give more organizations access to the capabilities of data science, and engage more data scientists with social challenges where their skills can make a difference. In pursuit of these goals, DrivenData runs online machine learning competitions with social impact and works directly with mission-driven organizations to drive change through data science and engineering. We also maintain a number of popular open-source projects for the data science community, and have shared the prize-winning solutions from past competitions openly on GitHub for anyone to learn and build from."
  },
  {
    name: "DQ Institute",
    tags: ["Think Tank/NGO", "Politics", "Research"],
    link: "https://www.dqinstitute.org/",
    location: "Singapore",
    description: "The DQ Institute is an international think-tank that is dedicated to setting global standards for digital intelligence that ensures safety, empowerment, and well-being of individuals, organizations, and nations in the digital age."
  },
  {
    name: "Einstein Center for digital Future",
    tags: ["Research"],
    link: "https://www.digital-future.berlin/en/research/projects/aisum/",
    location: "Berlin, Germany",
    description: "The Einstein Center for Digital Future has, among others, a project on AI Empowered Sustainable Urban Mobility Platform (AISUM). The project aims to establish a platform for sustainable urban mobility in which climate protection and resource efficiency are structurally anchored. Users should be able to transparently view the ecological costs of various transport options and be encouraged to use particularly climate-friendly means of transport. "
  },
  {
    name: "ELLIS",
    tags: ["Network"],
    link: "https://ellis.eu/",
    location: "Europe",
    description: "ELLIS is the European Laboratory for Learning and Intelligent Systems, a Japan-EUropean AI Network of excellence and focuses on fundamental science, technical innovation and societal impact. It understands Machine learning as central AI technology and aims to ensure that a high level research on AI takes place in Europe."
  },
  {
    name: "European Artificial Intelligence Fund",
    tags: ["Funding"],
    link: "https://europeanaifund.org/",
    location: "Brussels, Belgium",
    description: "The European AI Fund aims to build civil society organizations with AI expertise and enable them to build strategic capacity in advocacy and policy to shape Europe's digital future in the medium and long term. It also aims to network stakeholders."
  },
  {
    name: "European Centre for Algorithmic Transparency (European Comission)",
    tags: ["Politics", "Research"],
    link: "https://algorithmic-transparency.ec.europa.eu/index_en",
    location: "Seville, Spain",
    description: "The ECAT contributes with scientific and technical expertise to the European Commission's exclusive supervisory and enforcement role of the systemic obligations on Very Large Online Platforms (VLOPs) and Very Large Online Search Engines (VLOSEs) provided for under the DSA. Scientists and experts working at the ECAT will cooperate with industry representatives, academia, and civil society organisations to improve our understanding of how algorithms work: they will analyse transparency, assess risks, and propose new transparent approaches and best practices. The ECAT is part of the European Commission, hosted by the Joint Research Centre (JRC) - the Commission’s in-house science and knowledge service - in close cooperation with the Directorate General Communications Networks, Content and Technology (DG CONNECT)."
  },
  {
    name: "European Comission",
    tags: ["Politics"],
    link: "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence",
    location: "Brussels, Belgium",
    description: "The EU Commission has, among others, an initiative on trustworthy AI. This focuses on three areas: 1) a European legal framework for AI that addresses fundamental rights and the specific safety risks of AI systems; 2) EU rules to address liability issues related to new technologies, including AI systems; 3) a revision of sectoral safety legislation (e.g., Machinery Regulation, General Product Safety Directive)."
  },
  {
    name: "Fairwork",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://fair.work/en/fw/homepage/",
    location: "Oxford, UK",
    description: "Fairwork, at its essence, is a way of imagining a different, and fairer, platform economy than the one we have today. By evaluating platforms against measures of fairness, we hope to not just show what the platform economy is, but also what it can be. The Fairwork project is run out of the Oxford Internet Institute, University of Oxford, and the Berlin Social Science Center. Through our global network of researchers, we evaluate the working conditions of digital labour platforms and score them against five principles of fair work."
  },
  {
    name: "Federal Ministry for Family Affairs, Senior Citizens, Women and Youth (BMFSFJ)",
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
    name: "Federal Ministry for the Environment, Nature Conservation, Nuclear Safety and Consumer Protection (BMUV)",
    tags: ["Funding", "Politics"],
    link: "https://www.bmuv.de/en/",
    location: "Berlin,Germany",
    description: "For example, under the “AI Lighthouses for Environment, Climate, Nature and Resources,” the BMUV funded AI projects that seek to address environmental challenges through the means of AI."
  },
  {
    name: "Federal Ministry of Education and Research (BMBF)",
    tags: ["Funding", "Politics"],
    link: "https://www.bmbf.de/bmbf/de/forschung/digitale-wirtschaft-und-gesellschaft/kuenstliche-intelligenz/kuenstliche-intelligenz_node.html",
    location: "Berlin, Germany",
    description: "The BMBF has special funding programmes for AI. It especially supports research on AI. It also funds six AI competence centers which include the BIFOLD and the DFKI.",
    fundingFor: [
      {
        title: "VFRAME",
        url: "/tool/map/project/vframe"
      }
    ]
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
    tags: ["Think Tank/NGO"],
    link: "https://www.plattform-lernende-systeme.de/home-en.html",
    location: "Munich, Germany",
    description: "Among other things, Germany's platform for artificial intelligence maintains a map of “AI for Sustainability” projects in Germany. The network of experts also aims to promote independent exchange and social dialog on AI."
  },
  {
    name: "German Informatics Society (GI)",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://gi.de/aktuelles/projekte",
    location: "Bonn, Germany",
    description: "The Gesellschaft für Informatik has, among others, a project on AI Testing & Auditing and a project on Educational Concepts for Data Literacy and Artificial Intelligence (AI) Competencies to embed this into teacher and school education."
  },
  {
    name: "Global AI Ethics Consortium, TUM Munich",
    tags: ["Research"],
    link: "https://www.ieai.sot.tum.de/global-ai-ethics-consortium/",
    location: "Munich, Germany",
    description: "The GAIEC’s goal to coordinate and promote independent academic research focused on designing and implementing frameworks and guidelines for the ethical development and use of AI-based technologies. The consortium has since grown to include over 34 members from six contenents and continues to expand in terms of members and activities."
  },
  {
    name: "Global AI Ethics Institute",
    tags: ["Research"],
    link: "https://globalethics.ai/",
    location: "Paris, France",
    description: "The Global AI Ethics Institute is the only global think tank addressing ethics applied to AI through cultural lenses."
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
    name: "Health Ethics & Policy Lab at ETH Zürich",
    tags: ["Research"],
    link: "https://bioethics.ethz.ch/",
    location: "Zürich, Switzerland",
    description: "The Lab’s research is dealing with ethical and policy challenges in precision medicine and digital health. The research is approached with theoretical and empirical methods, focusing on Themes as AI and Big Data, AI Ethics, Citizen Science or Personalized and preventative Care."
  },
  {
    name: "Helsinki (Finnland)",
    tags: ["Politics", "AI Practice"],
    link: "https://ai.hel.fi/en/ai-register/",
    location: "Helsinki, Finland",
    description: "Helsinki uses various AI applications to facilitate citizen services, such as a material management system or a health center chatbot. What is special about all these city systems is that detailed information can be obtained and feedback can be given on the applications. In this way, the applications are to be developed in a more user- and community-friendly way."
  },
   {
    name: "Hertie School Data Science Lab",
    tags: ["Research"],
    link: "https://www.hertie-school.org/en/datasciencelab",
    location: "Berlin, Germany",
    description: "The Lab aims at leveraging and amplifying breakthroughs in data science and AI in order to tackle societal problems. The research focuses on themes such as AI in Government, Climate Change and AI, Health Implications of Climate Change or Political Communication."
  },
  {
    name: "Hugging Face",
    tags: ["AI Practice"],
    link: "https://huggingface.co/",
    location: "Paris, France",
    description: "Hugging Face is an NLP startup with a focus on chatbots. They are also known as a platform for pre-trained Deep Learning models. Hugging Face does not produce the models themselves, but offers a platform that is also used by Facebook, Google, etc. to provide pre-trained models."
  },
  {
    name: "Human Rights Data Analysis Group (HRDAG)",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://hrdag.org/knowledge-base/",
    location: "San Francisco, CA, USA",
    description: "The Human Rights Data Analysis Group is a non-profit, non-partisan organization that applies rigorous science to the analysis of human rights violations around the world."
  },
  {
    name: "Hybrid Intelligence Centre",
    tags: ["Research"],
    link: "https://www.hybrid-intelligence-centre.nl/#",
    location: "Amsterdam, Netherlands",
    description: "Hybrid Intelligence (HI) is the combination of human and machine intelligence, expanding human intellect instead of replacing it. HI takes human expertise and intentionality into account when making meaningful decisions and perform appropriate actions, together with ethical, legal and societal values. Our goal is to design Hybrid Intelligent systems, an approach to Artificial Intelligence that puts humans at the centre, changing the course of the ongoing AI revolution."
  },
  {
    name: "IBM, Tech Ethics Center & Lab, University of Notre Dame",
    tags: ["Research"],
    link: "https://techethicslab.nd.edu",
    location: "Notre Dame, IN, USA",
    description: "Dedicated to interdisciplinary research on the impact of technology on humanity. The Technology Ethics Center at the University of Notre Dame convenes global thought leaders in academia, industry, non-profit organizations, and governmental agencies to develop ethical and legal frameworks that keep pace with technological development.” At the Tech Ethics Lab (“Turning Theory Into Practice”), “we promote human values in technology through tangible, applied, and interdisciplinary research that addresses core ethical questions."
  },
  {
    name: "Institute for Advanced Technology and Public Policy, California Polytechnic State University",
    tags: ["Research"],
    link: "https://iatpp.calpoly.edu",
    location: "San Luis Obispo, CA, USA",
    description: "At the Institute for Advanced Technology and Public Policy, we explore today's most complex challenges in arenas such as energy, the environment, agriculture and government transparency. We identify and develop ways to use emerging technology to influence related public policy, and we partner with industry and government leaders to craft effective, real-world solutions ripe for implementation. Led by Founding Director and former State Senator Sam Blakeslee, the Institute's integrated approach to solving society's toughest problems engages the best and brightest students and faculty at Cal Poly, steeped in the University's Learn by Doing tradition and motivated to make a real and tangible difference in the world."
  },
  {
    name: "Institute for Ethics in AI, University of Oxford",
    tags: ["Research"],
    link: "https://www.oxford-aiethics.ox.ac.uk",
    location: "Oxford, UK",
    description: "The Institute for Ethics in AI will bring together world-leading philosophers and other experts in the humanities with the technical developers and users of AI in academia, business and government. The ethics and governance of AI is an exceptionally vibrant area of research at Oxford and the Institute is an opportunity to take a bold leap forward from this platform."
  },
  {
    name: "Institute for Human-Centered AI (HAI), Stanford University",
    tags: ["Research"],
    link: "https://hai.stanford.edu",
    location: "Stanford, CA, USA",
    description: "The mission of HAI is to advance AI research, education, policy and practice to improve the human condition. Led by faculty from multiple departments across Stanford, research focuses on developing AI technologies inspired by human intelligence; studying, forecasting and guiding the human and societal impact of AI; and designing and creating AI applications that augment human capabilities. What’s unique about HAI is that it balances diverse expertise and integration of AI across human-centered systems and applications in a setting that could only be offered by Stanford University. Stanford’s seven leading schools on the same campus, including a world-renown computer science department, offer HAI access to multidisciplinary research from top scholars."
  },
  {
    name: "Institute for Technology, Law & Policy, UC Los Angeles",
    tags: ["Research"],
    link: "https://law.ucla.edu/academics/centers/institute-technology-law-policy",
    location: "Los Angeles, CA, USA",
    description: "The Institute for Technology, Law & Policy undertakes cross-disciplinary research to learn how both established and emerging technologies influence society, privacy, law and public policy."
  },
  {
    name: "Institute for the Internet and the Just Society",
    tags: ["Research"],
    link: "https://www.internetjustsociety.org",
    location: "Berlin, Germany",
    description: "We pioneer an open platform that connects civic engagement with interdisciplinary research focused on fair artificial intelligence, inclusive digital governance and human rights law in digital spheres."
  },
  {
    name: "iRights.Lab",
    tags: ["Think Tank/NGO", "Politics"],
    link: "https://www.irights-lab.de/en/",
    location: "Berlin, Germany",
    description: "The iRights Lab has set itself the goal of developing strategies and practical solutions to profitably manage the changes emerging with digitalization for society as a whole. Their engagement with AI includes, for example, a study on AI in government and the project DaSKITA - Data Sovereignty through AI-based Transparency and Information. The goal of this three-year project is the development and prototypical testing of AI-based concepts, mechanisms, and tools that provide consumers with a higher degree of information and self-determination in the context of digital services."
  },
  {
    name: "Lakuna Fund",
    tags: ["Funding"],
    link: "https://lacunafund.org/",
    location: "South Africa and Germany",
    description: "Guided by machine learning professionals worldwide, Lacuna Fund will provide data scientists, researchers, and social entrepreneurs with the resources they need to either produce new labeled datasets to address an underserved population or problem, augment existing datasets to be more representative, or update old datasets to be more sustainable."
  },
  {
    name: "Leverhulme Centre for the Future of Intelligence",
    tags: ["Research"],
    link: "http://lcfi.ac.uk/",
    location: "Cambridge, UK",
    description: "The research centre brings together academics from a variety of disciplines. Its set goal is to explore the possibilities of AI in short and long term, making sure that AI will be developed in positive ways. Its research focus is set on questions as among others algorithmic transparency, social AI, AI and creativity, and injustice and discrimination."
  },
  {
    name: "Luminate",
    tags: ["Funding"],
    link: "https://luminategroup.com/investee/ethics-governance-of-ai-fund",
    location: "Washington D.C. and London, USA and UK",
    description: "Founded in 2018, Luminate is a global philanthropic organization with a mission to empower people and institutions to work together to build a just and fair society. It does this by funding and supporting nonprofit and for-profit organizations, and by advocating for policies and actions that help people participate in and shape the issues that affect their lives, and that make those in power more transparent, responsive, and accountable. Luminate focuses on creating impact in four interconnected areas: Citizen Participation, Data and Digital Rights, Financial Transparency, and Independent Media. In the area of AI, Luminate promotes the AI Ethics and Governance Initiative, led by MIT and the Berkmann Klein Center, which targets public interest AI."
  },
  {
    name: "Masakhane",
    tags: ["Research", "Think Tank/NGO", "AI Practice"],
    link: "https://www.masakhane.io/",
    location: "Southern Africa",
    description: "Masakhane is a grassroots organisation whose mission is to strengthen and spur NLP research in African languages, for Africans, by Africans. Despite the fact that 2000 of the world’s languages are African, African languages are barely represented in technology. The tragic past of colonialism has been devastating for African languages in terms of their support, preservation and integration. This has resulted in technological space that does not understand our names, our cultures, our places, our history."
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
    name: "My Data Rights Africa",
    tags: ["AI Practice", "Think Tank/NGO"],
    link: "https://mydatarights.africa/",
    location: "South Africa",
    description: "Through the eyes of a feminist, the intersections of Artificial intelligence, privacy and data protection are explored in the context of South Africa.The context of gendered marginalisation of women, gender diverse people and sexual minorities forms the basis of understanding the data concerns.  AI and gender; feminist methodology and policy are assessed from a feminist perspective to develop recommendations for gender responsive policy and regulations and action from the civil society for engagement on data rights."
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
    name: "Open Data Institute",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://www.theodi.org/",
    location: "London, UK",
    description: "At the ODI, our mission is to work with companies and governments to build an open, trustworthy data ecosystem. We want a world where data works for everyone. This means getting data to those who need it, particularly in response to the UN Sustainable Development Goals."
  },
  {
    name: "Oxford Internet Institute (OII)",
    tags: ["Research"],
    link: "https://www.oii.ox.ac.uk/",
    location: "Oxford, UK",
    description: "The Research Institute focuses on the societal opportunities and challenges posed by fast-developing internet technologies. "
  },
  {
    name: "PIT Policy Lab",
    tags: ["Think Tank/NGO"],
    link: "https://www.policylab.tech",
    location: "Mexico City, Mexico",
    description: "We enable cross-sector collaborations towards an understanding of Public Interest Technology through practical research, policy insights, and the drafting of proofs of concept in the field."
  },
  {
    name: "Prototype Fund",
    tags: ["Research", "Politics", "Think Tank/NGO"],
    link: "https://prototypefund.de/en/",
    location: "Berlin, Germany",
    description: "Prototypefund supports software projects that serve the common good. There is no specific focus on AI, but many AI projects are funded.",
    fundingFor: [
      {
        title: "VFRAME",
        url: "/tool/map/project/vframe"
      }
    ]
  },
  {
    name: "Public Interest Technology Lab, Harvard University",
    tags: ["Research"],
    link: "https://techlab.org",
    location: "Cambridge, MA, USA",
    description: "We help shape the future of technology and society to advance equity, expand opportunity and protect basic rights and liberties.The Public Interest Tech Lab at Harvard provides Harvard students and faculty with access to technological infrastructures, gadgets, algorithms, know-how and key resources to better understand how technology can either worsen or address society’s greatest challenges."
  },
  {
    name: "reframe[Tech] - Algorithmen fürs Gemeinwohl Project at Bertelsmann Stiftung",
    tags: ["Think Tank/NGO"],
    link: "https://www.bertelsmann-stiftung.de/de/unsere-projekte/reframetech-algorithmen-fuers-gemeinwohl/projektbeschreibung",
    location: "Gütersloh, Germany",
    description: "The project focuses on how development and implementation of Algorithms and AI can succeed focusing on the public interest. The project develops solutions for controlling algorithmic risks and wants to motivate to use algorithms in a public interest oriented way. Therefore, it wants to create awareness as well as close knowledge gaps and find out and communicate about what is needed for practical implementations of public interest oriented tech projects. "
  },
  {
    name: "Responsible AI Institute (RAI)",
    tags: ["Think Tank/NGO"],
    link: "https://www.responsible.ai",
    location: "Austin, TX, USA",
    description: "RAI is a non-profit organization building tangible governance tools for trustworthy, safe and fair Artificial Intelligence (AI)."
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
    tags: ["Think Tank/NGO", "Research"],
    link: "https://www.stiftung-nv.de/en/node/2986",
    location: "Berlin, Germany",
    description: "The Stiftung Neue Verantwortung examines AI in the context of foreign policy, societal, economic, and security issues. Which actors decide on the global regulatory framework for artificial intelligence? What conditions must be created nationally to minimize the risks of this technology? How can political AI strategies be implemented and strategically managed? What attack and defense vectors do machine learning systems offer in the context of cybersecurity? They have a Data Science Unit dedicated to these questions, among others: How error-prone and potentially discriminatory are certain AI systems, or how active are individual stakeholders in ongoing international negotiations?"
  },
  {
    name: "Stuttgart Research Focus Interchange Forum for Reflecting on Intelligent Systems",
    tags: ["Research"],
    link: "https://www.iris.uni-stuttgart.de/",
    location: "Stuttgart, Germany",
    description: "The SRF IRIS wants to promote critical reflection on intelligent systems and their impact on society through Research, Teaching and Public Engagement. Central research questions are How can we avoid unfair discrimination or stereotyping through the use of artificial intelligence (AI) in automated decision-making in technology development? or How can we promote reflection on intelligent systems through education and teaching?"
  },
  {
    name: "Sustainable AI Lab",
    tags: ["Research"],
    link: "https://sustainable-ai.eu/",
    location: "Bonn, Germany",
    description: "The Sustainable AI Lab creates a space where a group of researchers from different fields can collaborate and share ideas on the environmental, social, and economic costs of designing, developing, and using AI in society."
  },
  {
    name: "Tech Equity Collaborative",
    tags: ["Think Tank/NGO"],
    link: "https://techequitycollaborative.org",
    location: "California, USA",
    description: "We envision a world where the growth of the tech industry creates economic prosperity for everyone, and where tech sector employees and companies are engaged and active participants in making our economy equitable. Our mission is to mobilize tech workers and companies to advance structural change that addresses economic inequity at its roots. We educate the tech community on economic justice, advocate for bold public policy, and develop equitable corporate practices that build equity and opportunity in the broader economy."
  },
  {
    name: "Tech for Social Good",
    tags: ["Think Tank/NGO"],
    link: "https://www.techforsocialgood.org",
    location: "Sydney, Australia",
    description: "Tech for Social Good is Australia's first nonprofit for young Australians interested in responsible tech. We work with leaders in tech, government and the private sector to deliver initiatives such as fellowships and community events, and are home to a diverse and interdisciplinary community of young Australians."
  },
  {
    name: "Tech4Humanity Lab, Virginia Tech",
    tags: ["Research"],
    link: "https://tech4humanitylab.org",
    location: "Blacksburg, VA, USA",
    description: "The Tech4Humanity Lab is a transdisciplinary laboratory at Virginia Tech, focusing on the impact of technology on the human condition. Our lab emphasizes  issues of human security broadly constituting political, medical, social, economic and environmental securities. The lab utilizes transdisciplinary research, combining practices from political science, law, computer science, humanities, engineering, business, biology, public health, and area studies."
  },
  {
    name: "Tech for Social Good",
    tags: ["Think Tank/NGO"],
    link: "https://www.techforsocialgood.org",
    location: "Sydney, Australia",
    description: "Tech for Social Good is Australia's first nonprofit for young Australians interested in responsible tech. We work with leaders in tech, government and the private sector to deliver initiatives such as fellowships and community events, and are home to a diverse and interdisciplinary community of young Australians."
  },
  {
    name: "Technology and Society Program, Ford Foundation",
    tags: ["Funding"],
    link: "https://www.fordfoundation.org/work/challenging-inequality/technology-and-society/strategy/",
    location: "New York, NY, USA",
    description: "While technology and the internet have transformed how we learn, connect, create and engage with the world around us, they have increased divisions across society and exacerbated inequality. The Technology and Society program believes that the internet must be designed and governed as a vital public good that ensures equitable access and the strongest protections of fundamental rights."
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
    tags: ["Funding", "Research", "Think Tank/NGO"],
    link: "https://www.bertelsmann-stiftung.de/en/our-projects/ethics-of-algorithms",
    location: "Gütersloh, Germany",
    description: "The project “Ethics of Algorithms” deals with the social consequences of algorithmic decision making. The aim is to contribute to a design of algorithmic systems that leads to more participation. "
  },
  {
    name: "The Digital Public Lab",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://thedigitalpubliclab.com/?utm_source=aapti-website&utm_medium=menu-redirect&utm_campaign=redirect",
    location: "Bengalore, India",
    description: "The Digital Public Lab is an initiative of the Aapti Institute and intends to work closely with the Data Economy Lab, another Aapti initiative. Aapti is a public strategic research institution that generates policy-relevant, actionable, and accessible knowledge from the frontiers of tech and society, about our networked lives, to support the creation of a fair, free, and equitable society."
  },
  {
    name: "The German Agency for International Cooperation (GIZ)",
    tags: ["AI Practice"],
    link: "https://www.giz.de/en/workingwithgiz/93909.html",
    location: "Bonn and Eschborn, Germany",
    description: "The German Society for International Cooperation is committed to sustainable development and educational work worldwide. Among other things, it also uses AI methods, such as in the projects of “Digital Umuganda” and “Common Voice”, but also carries out educational work in this area. The GIZ formulates the following goals with regard to AI: “Building local competence in AI in Africa and Asia, access to training data and AI technology for local AI companies, political framework conditions for value-based AI and better data protection.”",
    fundingFor: [
      {
        title: "Radiant MLHub",
        url: "/tool/map/project/radiant-mlhub"
      }
    ]
  },
  {
    name: "The Institute for Ethical AI and Machine Learning",
    tags: ["Research", "AI Practice"],
    link: "https://ethical.institute/",
    location: "London, UK",
    description: "The Institute for Ethical AI & Machine Learning is a UK-based research centre that develops frameworks that support the responsible development, deployment and operation of machine learning systems."
  },
  {
    name: "The Policy Lab",
    tags: ["Research", "Think Tank/NGO", "Politics"],
    link: "https://www.denkfabrik-bmas.de/en/topics/artificial-intelligence",
    location: "Berlin, Germany",
    description: "The Artificial Intelligence in Labor and Social Administration Network of the BMAS exchanges views on how artificial intelligence (AI) can be used in administration. The aim is to develop self-committed guidelines for practice that ensure responsible handling of AI."
  },
  {
    name: "The Teaching Responsible Computing Community (Mozilla Foundation)",
    tags: ["Think Tank/NGO"],
    link: "https://foundation.mozilla.org/en/what-we-fund/awards/responsible-computer-science-challenge/",
    location: "San Francisco, CA, USA",
    description: "A curated and supported global community working towards integrating social responsibility and ethics into computing curricula, with a focus on teaching methods. This community of practice has a specific focus on pedagogy and teaching, with the aim to support a cross disciplinary group of people. The community includes disciplines outside of computing that are critical for computing. The aim is to support cross-disciplinary practitioners and faculty, along with academics, industry practitioners, Computer Science education researchers, and teaching and learning experts in their work. The community includes teaching teams across colleges and universities who are part of the Responsible Computer Science Challenge which is funded by Omidyar Network, Mozilla, Schmidt Futures, and Craig Newmark Philanthropies. It also includes those working broadly with computing, social responsibility, and ethics curricula, along with the 30+ collaborators on the Teaching Responsible Computing Playbook. The community of practice offers opportunities for collaboration, peer learning exchange, and periodic presentations and events."
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
    name: "Urban AI",
    tags: ["Think Tank/NGO", "Research"],
    link: "https://urbanai.fr/",
    location: "Paris, France",
    description: "Urban AI is a Paris-based think tank dedicated to the emerging field of “Urban Artificial Intelligence.” Given the highly complex and human-centered nature of urban systems, scholarship and practical implementation of artificial intelligence technologies in cities requires a uniquely multidisciplinary lens. For this reason, Urban AI seeks to generate a holistic body of knowledge on urban artificial intelligence by federating and collaborating with a growing, global community of researchers, public servants, start-ups, and urban subject matter experts, who work at the intersection of cities and technology. Together, we carry out multidisciplinary projects to better understand and assess the impacts of artificial intelligence on urban life and vice versa. Urban AI’s work follows three primary streams: research, events & content, and education."
  },
  {
    name: "Vodafone Institute for Society and Communications",
    tags: ["Think Tank/NGO"],
    link: "https://www.vodafone-institut.de/studies/artificial-intelligence-and-climate-change-13-policy-recommendations-to-meet-current-challenges/",
    location: "Berlin, Germany",
    description: "The Vodafone Institute wants to analyze the possibilities of digital technologies and their responsible use for innovation, growth and sustainable social impact. With the help of studies and events, it aims to offer a platform for dialog between science, business and politics. The institute has published several studies on AI, including one on AI and the environment/sustainability, one on AI and human rights, and one on the positive impact of AI on employees."
  },
  {
    name: "Volkswagen Stiftung",
    tags: ["Funding"],
    link: "https://www.volkswagenstiftung.de/en/funding/our-funding-portfolio-at-a-glance/artificial-intelligence-and-the-society-of-the-future",
    location: "Hannover, Germany",
    description: "In addition to funding AlgorithmWatch, the Volkswagen Foundation also has an initiative called “Artificial Intelligence - Its Impact on Tomorrow's Society.” At its core, the initiative aims to promote joint, integrative research approaches between the social sciences and engineering. Against the backdrop of the current and emerging developments taking place under the term “artificial intelligence,” the aim is to enable new perspectives and insights with a view to shaping the future of society as well as technology, based on present-day diagnoses."
  },
  {
    name: "We and AI",
    tags: ["Think Tank/NGO"],
    link: "https://weandai.org/",
    location: "London, UK",
    description: "We and AI is a non-profit-organisation acttivating diverse communities to make AI work for everyone."
  },
  {
    name: "Weizenbaum Institute",
    tags: ["Research"],
    link: "https://www.weizenbaum-institut.de/en/research/rg20/#page=1&sort=date",
    location: "Berlin, Germany",
    description: "At the Weizenbaum Institute, among others, a research group is working on “Criticality of AI-based Systems”. The focus is on the interplay between the consideration of AI as technology and cultural artifact. On the one hand, it is to be investigated at which technical level AI applications are, and on the other hand, the idea of the culturally made nature of this technology is to be maintained within the framework of an investigation of discourses and symbolic charges. In addition, the “horizon of the current state of user-oriented AI, AI for the common good, and inclusive AI” will be expanded."
  },
  {
    name: "Young and Resilient Research Centre, Western Sydney University",
    tags: ["Research"],
    link: "https://westernsydney.edu.au/young-and-resilient",
    location: "Sydney, Australia",
    description: "The Young and Resilient Research Centre enables young people and their communities to address some of the critical challenges of contemporary life, and enhance wellbeing locally, nationally and internationally. We work with children and young people all over the planet, researching the role of technology to inform policies, programs and interventions that can minimise the risks and maximise the benefits of the digital age. Our research deploys youth-centred, participatory co-research and co-design methods across four key research programs, underpinned by a Living Lab."
  },
  {
    name: "Zindi",
    tags: ["AI Practice"],
    link: "https://zindi.africa/",
    location: "Ebène, Mauritius",
    description: "The Zindi platform does networking work by connecting Data Scientists with organizations through competitions. According to its own information, Zindi is home to the largest community of data scientists in African countries. It offers learning and communication opportunities, but most importantly, competitions to solve specific existing problems in a fixed time frame using AI, such as the Microsoft Rice Disease Classification Challenge. The first places receive prize money."
  },
  {
    name: "Zukunft – Umwelt – Gesellschaft (ZUG) gGmbH",
    tags: ["Funding"],
    link: "https://www.z-u-g.org/aufgaben/ki-leuchttuerme/",
    location: "Berlin, Germany",
    description: "The ZUG supports the BMUV in achieving its funding policy goals. It is a fully federally owned company. The ZUG bundles non-ministerial tasks in a flexible organizational form and supports the ministry as a service provider in terms of content and administration in the implementation of funding programs and projects. It has a special funding programme for AI for climate, environment and resources.",
    fundingFor: [
      {
        title: "AI4Grids",
        url: "/tool/map/project/ai4grids"
      },{
        title: "Green Consumption Assistant",
        url: "/tool/map/project/green-consumption-assistant"
      },{
        title: "IsoSens",
        url: "/tool/map/project/isosens"
      },{
        title: "KI:STE",
        url: "/tool/map/project/kiste"
      },{
        title: "Smart Recycling-UP",
        url: "/tool/map/project/smartrecycling-up"
      }
    ]
  }, 
  {
    name: "4TU Centre for Ethics and Technology",
    tags: ["Research", "Think Tank/NGO"],
    link: "https://ethicsandtechnology.eu/",
    location: "Wageningen, Netherlands",
    description: "4TU.Ethics envisions a world in which technology is developed and used for benefit of humanity and the preservation of our planet. It is a world in which ethical considerations concerning human rights, well-being, global and inter-generational justice, the social good etc. are systematically included in practices of technology and engineering."
  }
];
