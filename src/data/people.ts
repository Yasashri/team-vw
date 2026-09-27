import type { Person } from '../types'

export const people: Person[] = [
  {
    id: 'vincent-wang', slug: 'vincent-wang', name: 'Vincent C.-C. Wang', role: 'Principal Investigator', category: 'pi', initials: 'VW',
    shortBio: 'Professor at National Sun Yat-sen University investigating sustainable catalysis, electrocatalysis, photoredox chemistry and reaction mechanisms.',
    bio: [
      'Vincent grew up in Taiwan and completed his BS and MS degrees at National Taiwan University, where he worked with Sunney Chan on the mechanism of particulate methane monooxygenase.',
      'He completed his DPhil at the University of Oxford with Fraser Armstrong, using protein-film electrochemistry to investigate metalloenzymes including carbon monoxide dehydrogenase. He then joined Curtis Berlinguette at the University of British Columbia as a postdoctoral researcher working on new materials for CO₂ reduction.',
      'From 2016 to 2019 he held a Wenner-Gren fellowship with Leif Hammarström at Uppsala University, developing time-resolved infrared spectroscopy for mechanistic studies of hydrogenases. He also spent time as a visiting research assistant at Academia Sinica working with Tiow-Gan Ong on photoredox catalysis. He began building Team VW at NSYSU in 2021.'
    ],
    researchInterests: ['Sustainable catalysis', 'Electrocatalysis', 'Photoredox catalysis', 'Mechanistic electrochemistry', 'Artificial photosynthesis'],
    education: ['DPhil in Chemistry — University of Oxford', 'MS in Chemistry — National Taiwan University', 'BS in Chemistry — National Taiwan University'],
    career: ['National Sun Yat-sen University', 'Uppsala University — Wenner-Gren Fellow', 'University of British Columbia — Postdoctoral Researcher', 'Academia Sinica — Visiting Research Assistant'],
    email: 'vincent.wang@mail.nsysu.edu.tw',
    links: [{ label: 'NSYSU faculty profile', url: 'https://chem.nsysu.edu.tw/en/vincent-wang/' }]
  },
  {
    id: 'rama-ramamoorthy', slug: 'rama-ramamoorthy', name: 'Ramasubramanian Ramamoorthy', nickname: 'Rama', role: 'Postdoctoral Researcher', category: 'postdoc', initials: 'RR',
    shortBio: 'Develops molecular electro- and photocatalysts for CO₂ reduction, with emphasis on secondary-sphere effects and transition-metal complexes.',
    bio: ['Ramasubramanian Ramamoorthy completed doctoral research in bioinorganic chemistry at Madurai Kamaraj University, focused on synthetic analogues of non-heme iron enzymes for molecular-oxygen activation. He joined Team VW in November 2022 and works on secondary-sphere effects in molecular electro- and photocatalytic CO₂ reduction using transition-metal complexes.'],
    researchInterests: ['Molecular CO₂ reduction', 'Bioinorganic chemistry', 'Secondary coordination sphere', 'Electrocatalysis', 'Photocatalysis']
  },
  {
    id: 'yu-syuan-tsai', slug: 'yu-syuan-tsai', name: 'Yu-Syuan Tsai', role: 'PhD Student', category: 'phd', initials: 'YT',
    shortBio: 'Works on electrochemically driven nickel cross-coupling and photoredox catalysis in a co-supervised research program.',
    bio: ['Yu-Syuan received a BS degree from National University of Kaohsiung and joined the lab in summer 2021. Her work spans electrochemical nickel-catalyzed cross-coupling and photoredox catalysis in a program co-supervised by Prof. Hsuan-Hung Liao.'],
    researchInterests: ['Electroorganic synthesis', 'Nickel catalysis', 'Photoredox catalysis']
  },
  {
    id: 'charasee-dayawansa', slug: 'charasee-dayawansa', name: 'Charasee Laddika Dayawansa', role: 'PhD Student', category: 'phd', initials: 'CD',
    shortBio: 'Chemist from Sri Lanka exploring electro- and photocatalysis with interests in sustainable catalytic systems.',
    bio: ['Charasee received a BSc (Hons) in Chemistry from the University of Peradeniya, Sri Lanka, in 2019. Before joining Team VW in 2021, she worked as a teaching assistant at the University of Peradeniya and Uva Wellassa University. Her interests span electro- and photocatalysis.'],
    researchInterests: ['Electrocatalysis', 'Photocatalysis', 'Sustainable catalysis']
  },
  {
    id: 'yu-wei-chen', slug: 'yu-wei-chen', name: 'Yu-Wei Chen', nickname: 'Bluebaby', role: 'PhD Student', category: 'phd', initials: 'YC',
    shortBio: 'Studies mechanistic questions in homogeneous electrocatalysis and sustainable multi-electron reactions.',
    bio: ['Yu-Wei earned a BS degree in Applied Chemistry from National Chi Nan University in 2022, where he studied electrochemical analysis and sensors. He joined Team VW in summer 2022 to investigate mechanistic questions in homogeneous electrocatalysis for sustainable catalysis.'],
    researchInterests: ['Homogeneous electrocatalysis', 'Electrochemical kinetics', 'Sustainable catalysis']
  },
  {
    id: 'sulakshi-heenatigala', slug: 'sulakshi-heenatigala', name: 'Sulakshi Heenatigala', role: 'PhD Student', category: 'phd', initials: 'SH',
    shortBio: 'Investigates sustainable molecular catalysis with interests spanning electrocatalysis, photocatalysis and mechanistic reaction studies.',
    bio: ['Sulakshi Udara Heenatigala completed a BSc in Chemistry at Rajarata University and a master’s degree at the University of Peradeniya, Sri Lanka. She joined Team VW in 2024 as a PhD student focused on sustainable catalysis, electrocatalysis and photocatalysis. Her current work investigates hydrogen-evolution reaction mechanisms through the kinetics of transition-metal complexes.'],
    researchInterests: ['Molecular electrocatalysis', 'Photocatalysis', 'Hydrogen evolution', 'Reaction mechanisms']
  },
  {
    id: 'ganga-udayan', slug: 'ganga-udayan', name: 'Ganga Udayan', role: 'PhD Student', category: 'phd', initials: 'GU',
    shortBio: 'Brings experience in molecular design, organic synthesis, nanomaterials and transition-metal oxides to Team VW research.',
    bio: ['Ganga earned a BSc in Chemistry from the University of Calicut and an MSc in Pharmaceutical Chemistry from Maharajas College, Mahatma Gandhi University, graduating with First Rank. Before joining Team VW as a PhD scholar, she gained research experience through internships at NSYSU, IISER Thiruvananthapuram and NIT Calicut.'],
    researchInterests: ['Molecular design', 'Organic synthesis', 'Functional materials', 'Electrochemistry']
  },
  {
    id: 'yi-ching-lee', slug: 'yi-ching-lee', name: 'Yi-Ching Lee', nickname: 'Ching', role: 'MS Student', category: 'masters', initials: 'YL',
    shortBio: 'Applied chemistry graduate building deeper expertise in electrochemistry after prior work in drug-delivery systems and plant extraction.',
    bio: ['Yi-Ching is a National Chiayi University Applied Chemistry graduate. Her undergraduate experience included innovative drug-delivery systems and plant extraction in bioorganic and bioinorganic chemistry. She joined Team VW in summer 2024 to develop deeper expertise in electrochemistry.'],
    researchInterests: ['Electrochemistry', 'Applied chemistry']
  },
  {
    id: 'kun-lin-wu', slug: 'kun-lin-wu', name: 'Kun-Lin Wu', nickname: 'Owen', role: 'MS Student', category: 'masters', initials: 'KW',
    shortBio: 'Interested in photochemistry and kinetics, with a focus on growing through mechanistic laboratory research.',
    bio: ['Kun-Lin graduated from National Tsing Hua University and joined Team VW because of his interest in photochemistry and kinetics.'],
    researchInterests: ['Photochemistry', 'Kinetics']
  },
  {
    id: 'tsung-yuan-wu', slug: 'tsung-yuan-wu', name: 'Tsung-Yuan Wu', nickname: 'Jason', role: 'MS Student', category: 'masters', initials: 'TW',
    shortBio: 'Works on electrocatalysis and mechanistic studies after undergraduate research in electrochemical analysis and sensors.',
    bio: ['Tsung-Yuan received his bachelor’s degree from the Department of Applied Chemistry at National Chi Nan University in 2025. He joined Team VW as an MS student in summer 2025, focusing on electrocatalysis and mechanistic studies.'],
    researchInterests: ['Electrocatalysis', 'Mechanistic studies', 'Electrochemical analysis']
  },
  {
    id: 'nicholas-huang', slug: 'nicholas-huang', name: 'Nicholas Huang', nickname: 'Robin', role: 'Undergraduate Intern', category: 'undergraduate', initials: 'NH',
    shortBio: 'Undergraduate researcher gaining hands-on experience in Team VW and preparing for future advanced study.',
    bio: ['Nicholas is an undergraduate researcher in Team VW with aspirations to pursue further study.']
  },
  {
    id: 'anjana-es', slug: 'anjana-es', name: 'Anjana E S', role: 'Undergraduate Intern', category: 'undergraduate', initials: 'AE',
    shortBio: 'International undergraduate intern gaining hands-on research experience and preparing for a future research career.',
    bio: ['Anjana is an undergraduate student from India who joined Team VW as an intern to gain hands-on experience in an international research environment. She hopes to pursue higher studies and a research career.']
  },
  {
    id: 'sharon-hsing', slug: 'sharon-hsing', name: 'Sharon Hsing', role: 'Administrative Assistant', category: 'administration', initials: 'SH',
    shortBio: 'Supports laboratory purchasing, finance, safety, administration and student research life across several NSYSU groups.',
    bio: ['Sharon Hsing (Wen-Ling Hsing) joined Team VW in March 2021. She holds a master’s degree from the English Department of National Kaohsiung Normal University and brings more than a decade of university administrative experience. She supports purchasing, laboratory finance, safety and hygiene procedures, and the research and learning environment.']
  }
]

export const categoryLabels: Record<Person['category'], string> = {
  pi: 'Principal Investigator',
  postdoc: 'Postdoctoral Researchers',
  phd: 'PhD Students',
  masters: 'MS Students',
  undergraduate: 'Undergraduate Researchers & Interns',
  administration: 'Administration',
}
