/* =========================================================
   work-data.js
   All project information for the Work page lives here.
   Edit text, categories, or links in this file only.
   ========================================================= */

/* ---------- CATEGORIES ----------
   id    = short name used in the code and in each project's "categories" list
   label = text shown on the filter button */
const WORK_CATEGORIES = [
  { id: 'all',        label: 'All Projects' },
  { id: 'software',   label: 'Software Development' },
  { id: 'ai-ml',      label: 'AI & Machine Learning' },
  { id: 'data',       label: 'Data Analysis' },
  { id: 'web',        label: 'Web Development & UI/UX' },
  { id: 'networking', label: 'Networking & Infrastructure' },
  { id: 'embedded',   label: 'Embedded Systems' }
];

/* ---------- PROJECTS ----------
   number      = shown on the page (keep it unique)
   title       = main heading of the row
   subtitle    = optional second line under the title (use '' for none)
   description = ONE short line
   categories  = list of category ids. The FIRST one is shown on the row,
                 and the project appears under EVERY category listed.
   kind        = optional small label, e.g. 'Prototype' (use '' for none)
   featured    = true gives the row a larger layout
   visual      = optional graphic name (see PROJECT_VISUALS in work.js)
   url         = null for now. Later set it to the project page,
                 e.g. 'project-signaloud.html'. The row then becomes a link. */
const WORK_PROJECTS = [
  {
    number: '01',
    title: 'SignAloud',
    subtitle: 'Wearable Real-Time Sign Language Gesture Recognition',
    description: 'A wearable gesture recognition system combining machine learning, sensor data, and real-time software integration.',
    categories: ['ai-ml', 'embedded', 'software'],
    kind: 'Graduation Project',
    featured: true,
    visual: 'signaloud',
    url: null
  },
  {
    number: '02',
    title: 'AI Customer Service Assistant',
    subtitle: '',
    description: 'A bilingual AI-powered customer service prototype featuring product search, quotation requests, and human handoff.',
    categories: ['ai-ml', 'software'],
    kind: 'Prototype',
    featured: false,
    url: null
  },
  {
    number: '03',
    title: 'Java Network Chat Application',
    subtitle: '',
    description: 'A Java client-server chat application using TCP sockets, multithreading, and a graphical interface.',
    categories: ['software', 'networking'],
    kind: '',
    featured: false,
    url: null
  },
  {
    number: '04',
    title: 'HATECO Website Redesign',
    subtitle: '',
    description: 'An independent website redesign concept focused on modern web design and user experience.',
    categories: ['web'],
    kind: 'Concept',
    featured: false,
    url: null
  },
  {
    number: '05',
    title: 'Online Retail Data Analysis & Machine Learning',
    subtitle: '',
    description: 'An academic project exploring retail transaction data through preprocessing, analysis, and machine learning.',
    categories: ['data', 'ai-ml'],
    kind: 'Academic Project',
    featured: false,
    url: null
  },
  {
    number: '06',
    title: 'Titanic Survival Analysis Using Data Mining Techniques',
    subtitle: '',
    description: 'An academic data mining project involving exploratory analysis, classification, and model evaluation.',
    categories: ['data', 'ai-ml'],
    kind: 'Academic Project',
    featured: false,
    url: null
  },
  {
    number: '07',
    title: 'University Campus Network Design',
    subtitle: '',
    description: 'A simulated university network infrastructure designed using Cisco Packet Tracer.',
    categories: ['networking'],
    kind: 'Simulation',
    featured: false,
    url: null
  },
  {
    number: '08',
    title: 'Arduino Line-Following Robot',
    subtitle: '',
    description: 'An embedded systems project involving an Arduino-based autonomous line-following robot.',
    categories: ['embedded'],
    kind: '',
    featured: false,
    url: null
  },
  {
    number: '09',
    title: 'Automated Parking Barrier',
    subtitle: '',
    description: 'An Arduino-based prototype for an automated parking barrier system.',
    categories: ['embedded'],
    kind: 'Prototype',
    featured: false,
    url: null
  }
];
