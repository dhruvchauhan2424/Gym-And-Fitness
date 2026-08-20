import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";
import trainer3 from "@/assets/trainer-3.jpg";
import fac1 from "@/assets/fac-1.jpg";
import fac2 from "@/assets/fac-2.jpg";
import fac3 from "@/assets/fac-3.jpg";
import fac4 from "@/assets/fac-4.jpg";
import prog1 from "@/assets/prog-1.jpg";
import prog2 from "@/assets/prog-2.jpg";
import prog3 from "@/assets/prog-3.jpg";
import prog4 from "@/assets/prog-4.jpg";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import heroVideo from "@/assets/Man_lifting_weights_in_gym_202608181131.mp4";

export const images = {
  hero: heroImg,
  about: aboutImg,
  before: beforeImg,
  after: afterImg,
};

export const video = {
  hero: heroVideo,
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/trainers", label: "Trainers" },
  { to: "/facilities", label: "Facilities" },
  { to: "/membership", label: "Membership" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const marqueeWords = ["Strength", "Power", "Discipline", "Performance"];

export const programs = [
  {
    id: "01",
    title: "Hypertrophy",
    tag: "Strength",
    image: prog1,
    duration: "12 weeks",
    sessions: "4 / week",
    copy: "Periodised barbell work built around the squat, pull and press. Load is prescribed weekly against velocity data, not guesswork.",
    includes: [
      "1:1 lift diagnostics",
      "Weekly load prescription",
      "Recovery protocol",
    ],
  },
  {
    id: "02",
    title: "Engine",
    tag: "Conditioning",
    image: prog2,
    duration: "8 weeks",
    sessions: "5 / week",
    copy: "Lactate-tested aerobic development. Zone work, threshold intervals and sled conditioning designed to raise your ceiling.",
    includes: ["VO2 lab testing", "Heart-rate zoning", "Threshold intervals"],
  },
  {
    id: "03",
    title: "Combat",
    tag: "Boxing",
    image: prog3,
    duration: "10 weeks",
    sessions: "3 / week",
    copy: "Technical striking under real fatigue. Pad work, footwork drilling and controlled sparring in a private black-box studio.",
    includes: ["Pad rounds with coach", "Footwork lab", "Optional sparring"],
  },
  {
    id: "04",
    title: "Restore",
    tag: "Recovery",
    image: prog4,
    duration: "Ongoing",
    sessions: "2 / week",
    copy: "Mobility, breathwork and contrast therapy. The half of training that decides whether the other half compounds.",
    includes: ["Contrast therapy", "Soft-tissue work", "Sleep coaching"],
  },
];

export const trainers = [
  {
    name: "Marcus Vale",
    role: "Head of Strength",
    image: trainer1,
    stat: "17 yrs",
    bio: "Former national powerlifting coach. Specialises in maximal strength and return-to-lift rehabilitation.",
  },
  {
    name: "Nadia Kerr",
    role: "Performance Director",
    image: trainer2,
    stat: "12 yrs",
    bio: "Sports scientist turned conditioning coach. Builds engines for endurance athletes and executives alike.",
  },
  {
    name: "Elias Roth",
    role: "Combat Coach",
    image: trainer3,
    stat: "9 yrs",
    bio: "Professional boxing background. Teaches striking as a skill first, a workout second.",
  },
];

export const facilities = [
  {
    name: "The Iron Floor",
    image: fac1,
    copy: "Twenty-four calibrated platforms, competition bars and a floor built to be loaded without apology.",
    meta: "1,400 m²",
  },
  {
    name: "Black Box Studio",
    image: fac2,
    copy: "A blacked-out striking room with tuned acoustics and a private entrance for members who prefer quiet.",
    meta: "16 stations",
  },
  {
    name: "Recovery Wing",
    image: fac3,
    copy: "Cold plunge, cedar sauna, contrast pools and treatment suites staffed by resident therapists.",
    meta: "Open 05:00–23:00",
  },
  {
    name: "Performance Lab",
    image: fac4,
    copy: "VO2 max, DEXA, force plates and velocity tracking. Every prescription starts with a number.",
    meta: "By appointment",
  },
];

export const stats = [
  { value: 2400, suffix: "+", label: "Members trained" },
  { value: 17, suffix: "", label: "Coaches on floor" },
  { value: 96, suffix: "%", label: "Retention after year one" },
  { value: 24, suffix: "/7", label: "Facility access" },
];

export const tiers = [
  {
    name: "Basic",
    price: 89,
    tagline: "Open floor access",
    features: [
      "Full gym floor access",
      "Group conditioning classes",
      "Locker & towel service",
      "App-based programming",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: 189,
    tagline: "Coached progression",
    features: [
      "Everything in Basic",
      "Two coached sessions monthly",
      "Quarterly performance testing",
      "Recovery wing access",
      "Nutrition framework",
    ],
    featured: true,
  },
  {
    name: "Elite",
    price: 420,
    tagline: "Private programming",
    features: [
      "Everything in Pro",
      "Weekly 1:1 with a lead coach",
      "Full lab diagnostics",
      "Physio & massage credits",
      "Off-hours private floor",
    ],
    featured: false,
  },
];

export const testimonials = [
  {
    quote:
      "I have trained in four countries. Nowhere else treats programming as an engineering problem. The numbers moved and they kept moving.",
    name: "Jonas Feld",
    role: "Member since 2019",
  },
  {
    quote:
      "The recovery wing alone changed my season. I arrive tired and leave capable of training again the next morning.",
    name: "Amara Diallo",
    role: "Professional triathlete",
  },
  {
    quote:
      "No mirrors full of noise, no music you have to shout over. Just a serious room and coaches who know exactly what they are doing.",
    name: "Rhea Kapoor",
    role: "Member since 2021",
  },
  {
    quote:
      "Two hundred kilos off the floor at forty-three. I would have called that fantasy before Marcus rewrote my whole approach.",
    name: "Tom Bramley",
    role: "Member since 2020",
  },
];
