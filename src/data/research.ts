import type { ResearchArea } from '../types'

export const researchAreas: ResearchArea[] = [
  {
    slug: 'electrocatalysis',
    title: 'Electrocatalysis',
    eyebrow: 'Electrons · Protons · Kinetics',
    summary: 'Understanding and controlling multi-electron and multi-proton reaction pathways to improve catalytic efficiency and selectivity.',
    description: [
      'Many energy-conversion reactions—including hydrogen evolution, CO₂ reduction and nitrogen fixation—require multiple electron-transfer and proton-transfer steps. Team VW studies how those elementary processes interact and how they can be manipulated to reach desired products.',
      'The group combines electrokinetic models, voltammetry and operando mechanistic studies to identify rate-limiting steps, interpret complex catalytic responses and connect molecular design with measurable catalytic performance.'
    ],
    image: '/images/research/electrocatalysis.svg',
    questions: [
      'How do electron-transfer and proton-transfer steps couple in catalytic cycles?',
      'Which elementary process limits rate or controls selectivity?',
      'How can voltammetry be interpreted quantitatively for multi-step and multi-electron reactions?'
    ],
    methods: ['Mechanistic electrochemistry', 'Electrokinetic modelling', 'Operando analysis', 'Molecular catalyst design'],
    topicMatches: ['Electrocatalysis', 'Hydrogen Evolution', 'CO₂ Reduction', 'Kinetic Modelling', 'Mechanism']
  },
  {
    slug: 'photoelectrocatalysis',
    title: 'Photoelectrocatalysis',
    eyebrow: 'Light · Charge · Interfaces',
    summary: 'Coupling light-harvesting semiconductors with electrocatalysts to drive useful redox chemistry using renewable energy.',
    description: [
      'A second direction combines semiconductor photoelectrodes with electrocatalysts. The goal is to understand how light harvesting, interfacial charge transfer and molecular catalysis can be coupled within liquid-phase redox systems.',
      'This approach connects photophysics with electrochemistry and catalyst design, creating a platform for studying how photons and electrons can work together to bias difficult chemical transformations.'
    ],
    image: '/images/research/photoelectro.svg',
    questions: [
      'How can light absorption and electrochemical bias work cooperatively?',
      'How should molecular catalysts communicate with semiconductor photoelectrodes?',
      'What interfacial processes determine useful charge-transfer efficiency?'
    ],
    methods: ['Semiconductor photoelectrodes', 'Molecular electrocatalysts', 'Interfacial charge transfer', 'Photophysical characterization'],
    topicMatches: ['Photoelectrocatalysis', 'Hydrogen Evolution', 'CO₂ Reduction']
  },
  {
    slug: 'photoredox',
    title: 'Photoredox Catalysis',
    eyebrow: 'Excited states · Molecular design',
    summary: 'Exploring molecular photocatalysts, transition-metal complexes and confined environments for selective photochemical transformations.',
    description: [
      'Team VW investigates organometallic photoredox systems including carbodicarbene-based transition-metal complexes developed through collaboration. Ligand design, excited-state properties and reaction pathways are examined together rather than in isolation.',
      'The group also explores how confined environments can influence photoredox reactivity, including comparisons between molecular systems and photoenzymes, and how one-electron photochemistry can be integrated with two-electron bond-forming chemistry.'
    ],
    image: '/images/research/photoredox.svg',
    questions: [
      'How does ligand design reshape excited-state reactivity?',
      'Can confined environments alter photoredox reaction pathways?',
      'How can one-electron photochemistry enable difficult bond activation and synthesis?'
    ],
    methods: ['Molecular photocatalysis', 'Carbodicarbene complexes', 'Photoenzyme comparisons', 'Photochemical mechanism studies'],
    topicMatches: ['Photoredox', 'Photocatalysis', 'Cross-Coupling', 'Carbodicarbene']
  }
]
