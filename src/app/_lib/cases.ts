import type { ParticleMode } from "../_components/effects/ParticleField";

/**
 * The forged works. Portfolio fiction, told honestly — each case is a
 * demonstration commission written to show how Hagane thinks, speaks and
 * builds. The voice is the studio's: warm, plain, a little ancient.
 */

export type CaseStage = {
  kanji: string;
  name: string;
  body: string[];
};

export type CaseStudy = {
  slug: string;
  number: string;
  element: string;
  elementKanji: string;
  title: string;
  poetic: string;
  oneLiner: string;
  heroImage: string;
  weather: ParticleMode;
  accent: string;
  arrival: string[];
  stages: CaseStage[];
  steel: { label: string; value: string }[];
  parting: string;
};

export const CASES: CaseStudy[] = [
  {
    slug: "the-ceramicist",
    number: "01",
    element: "EARTH",
    elementKanji: "地",
    title: "The Ceramicist",
    poetic: "A site that turns as slowly as a potter's wheel.",
    oneLiner:
      "A portfolio for a hand-thrown pottery studio. Slow scroll, hand-laid type, no rush.",
    heroImage: "/img/case-ceramicist.webp",
    weather: "dust",
    accent: "var(--color-kintsugi)",
    arrival: [
      "She wrote to us in autumn. Three lines, no deck, no moodboard:",
      "“I throw pots. My website embarrasses me. Help.”",
      "We kept those three lines pinned above the forge for the whole commission. They were the brief, the strategy, and the acceptance criteria — all of it.",
    ],
    stages: [
      {
        kanji: "鋼",
        name: "The Ore",
        body: [
          "She had four hundred photographs of vessels and not one of herself. That told us everything. The work was the face. The site would have no portrait, no biography page, no list of exhibitions — just clay, fire, and the patience between them.",
          "We asked her one question: how long does a bowl take? She said, “Three weeks. People think it's an afternoon.” So we decided the site itself would refuse to be an afternoon.",
        ],
      },
      {
        kanji: "折",
        name: "The Folding",
        body: [
          "We slowed the scroll to the speed of a turning wheel. Each vessel arrives alone, centered, with air around it — the way work sits in a kiln, never touching its neighbour.",
          "The type is set like a museum label written by a friend: small, patient, never shouting. One accent colour, drawn from the glaze she calls 'first frost'.",
        ],
      },
      {
        kanji: "焼",
        name: "The Tempering",
        body: [
          "Static generation, every image hand-tuned, the whole site lighter than one of her process photos used to be. It loads before doubt arrives.",
          "No cookie walls, no chat bubbles, no pop-ups asking to subscribe. A kiln does not interrupt you either.",
        ],
      },
      {
        kanji: "研",
        name: "The Polish",
        body: [
          "Orders for spring went in eleven days. She wrote again — four lines this time, which we count as growth: “People say the site feels like holding one of my bowls. I don't know what you did. Don't tell me.”",
          "We didn't.",
        ],
      },
    ],
    steel: [
      { label: "Forged in", value: "3 weeks" },
      { label: "Pages", value: "5" },
      { label: "Weight", value: "Lighter than one photo" },
      { label: "Interruptions", value: "0" },
    ],
    parting: "Earth holds the shape it is given. So should a site.",
  },
  {
    slug: "the-wanderer",
    number: "02",
    element: "WIND",
    elementKanji: "風",
    title: "The Wanderer",
    poetic: "A book you can read while walking.",
    oneLiner:
      "A launch site for a long-form travel essay collection. Built to be read on a phone, in motion.",
    heroImage: "/img/case-wanderer.webp",
    weather: "windPetals",
    accent: "var(--color-sakura)",
    arrival: [
      "He had walked four thousand kilometres and written ninety thousand words about it. Publishers said the essays were too long for the internet.",
      "He didn't want to make them shorter. He wanted readers who walk slowly.",
      "We liked him immediately.",
    ],
    stages: [
      {
        kanji: "鋼",
        name: "The Ore",
        body: [
          "The essays were the cargo; the question was the road. Where do people actually read ninety thousand words? On trains. In queues. In tents, by headlamp. One thumb, bad signal, tired eyes.",
          "So the brief wrote itself: a reading instrument for one hand and weak light — not a website that happens to contain text.",
        ],
      },
      {
        kanji: "折",
        name: "The Folding",
        body: [
          "Typography did almost all the work. A tall line-height that forgives a shaking train. Chapters that remember where you stopped, the way a paper bookmark would. A progress thread as thin as the trail line on his maps.",
          "Each essay opens with one full-bleed photograph and then gets out of the way. The wind on the ridge does not decorate itself.",
        ],
      },
      {
        kanji: "焼",
        name: "The Tempering",
        body: [
          "Everything ships pre-rendered and caches offline — a tent in the mountains has no signal, and his readers are exactly the people who end up in tents. The whole collection works with the radio off.",
          "Night mode follows the sun, not a toggle. By headlamp, the pages are ember-warm and quiet.",
        ],
      },
      {
        kanji: "研",
        name: "The Polish",
        body: [
          "Average reading session at launch: forty-one minutes. On phones. For essays the internet had called unreadable.",
          "He sent us a photograph from the next trail — the site open on a cracked phone, balanced on a stone, somewhere above the treeline. That photograph is the only testimonial we have ever framed.",
        ],
      },
    ],
    steel: [
      { label: "Forged in", value: "4 weeks" },
      { label: "Words carried", value: "90,000" },
      { label: "Works offline", value: "Fully" },
      { label: "Avg. session", value: "41 min" },
    ],
    parting: "Wind is not weak because it is gentle. It crosses mountains.",
  },
  {
    slug: "the-founder",
    number: "03",
    element: "WATER",
    elementKanji: "水",
    title: "The Founder",
    poetic: "Quiet credibility instead of loud marketing.",
    oneLiner:
      "A landing for a deep-tech startup. The kind investors reread before the second meeting.",
    heroImage: "/img/case-founder.webp",
    weather: "mist",
    accent: "var(--color-indigo)",
    arrival: [
      "Her company does something genuinely hard — the kind of hard that takes nine PhDs and four years before anything demos.",
      "Every agency had pitched her the same site: rocket emojis, gradient buttons, a wall of logos. “We look like everyone we are nothing like,” she said.",
      "That sentence became the whole commission.",
    ],
    stages: [
      {
        kanji: "鋼",
        name: "The Ore",
        body: [
          "Her audience wasn't 'traffic'. It was perhaps two hundred people on earth — investors, researchers, future hires — every one of whom can smell exaggeration through a screen.",
          "For a reader like that, restraint is not a style. It is evidence.",
        ],
      },
      {
        kanji: "折",
        name: "The Folding",
        body: [
          "We cut the site to five claims, each one defensible to a hostile expert, each given a full screen of silence around it. Nothing animates unless it explains.",
          "The deep work appears as it should: precise diagrams, honest numbers, one kintsugi-gold thread of accent through the dark — gold in the cracks, because the hard parts are the valuable parts.",
        ],
      },
      {
        kanji: "焼",
        name: "The Tempering",
        body: [
          "Performance budget enforced like a covenant: instant on conference wifi, instant on a partner's phone in a taxi. Security headers tight enough that their own CISO sent a compliment. We did not know CISOs sent compliments.",
          "Every claim links to its source. The site survives due diligence because it was built like due diligence.",
        ],
      },
      {
        kanji: "研",
        name: "The Polish",
        body: [
          "Three weeks after launch, an investor opened the second meeting with: “Your site is the only one I didn't have to translate for our technical partner.”",
          "The round closed. We claim no credit for the science. The water only carried it.",
        ],
      },
    ],
    steel: [
      { label: "Forged in", value: "4 weeks" },
      { label: "Claims made", value: "5, all sourced" },
      { label: "Loads in", value: "Under a breath" },
      { label: "Rocket emojis", value: "0" },
    ],
    parting: "Water does not argue with the stone. It outlasts it.",
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function nextCase(slug: string): CaseStudy {
  const i = CASES.findIndex((c) => c.slug === slug);
  return CASES[(i + 1) % CASES.length];
}
