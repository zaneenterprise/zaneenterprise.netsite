import { Code2, Smartphone, Zap } from "lucide-react"

export const services = [
  { icon: Code2, label: "Web Development" },
  { icon: Smartphone, label: "App Development" },
  { icon: Zap, label: "Fast Delivery" },
]

export const taglines = [
    { text: "Want a site or app that's actually awesome?" },
    { text: "Want a site or app that doesn't suck?" },
    { text: "Need a killer site or app?" },
    { text: "Tired of mediocre apps and boring sites?" },
    { text: "Want your site or app to actually stand out?" },
    { text: "Sick of boring sites and apps?" },
    { text: "Ready for a site or app that slaps?" },
    { text: "Need a site or app with personality?" },
    { text: "Your idea deserves more than a basic app." },
    { text: "Done with dull, lifeless apps?" },
    { text: "Want to finally be proud of your website or app?" },
    { text: "Your app idea plus my skills equals something seriously cool." },
    { text: "Forget cookie cutter." },
    { text: "Want a website or app worth sharing?" },
    { text: "No more yawning at your own website." },
    { text: "Tired of stale apps and boring websites?" },
    { text: "Ready for a site or app that slaps?" },
    { text: "Want a website or app that people will actually notice?" },
]

export const projects = [
  {
    id: "pawcasso",
    title: "Pawcasso",
    tagline: "Cat-Approved Digital Art Studio",
    description:
      "An innovative mobile app that turns your cat's playful movements into beautiful digital artwork. Watch your feline friend chase a bird across the screen and create unique masterpieces with customizable color themes.",
    images: [
      {
        url: "/images/pawcasso1.avif",
        alt: "Pawcasso theme selection screen",
      },
      {
        url: "/images/pawcasso2.avif",
        alt: "Pawcasso gameplay with cat painting",
      },
      {
        url: "/images/pawcasso3.avif",
        alt: "Cat-approved painting experience",
      },
    ],
    tags: ["React Native", "Mobile", "iOS", "Android"],
    features: [
      "Multiple color themes (Vibrant, Pastel, Ocean, Sunset, Gray, Halloween)",
      "Real-time canvas updates as your cat plays",
      "Save and share your cat's artwork",
      "Interactive bird chase mechanics",
    ],
    color: "from-pink-500 to-purple-600",
  },
  {
    id: "azbuddy",
    title: "AZBuddy.Cash",
    tagline: "Custom built page for musician",
    description:
      "A professional musician portfolio website featuring custom animations, seamless navigation, and cohesive branding. Built for Buddy Cash with a powerful custom admin portal for gig management, schedule integration, and real-time updates.",
    images: [
      {
        url: "/images/azbuddy1.avif",
        alt: "AZBuddy.Cash homepage",
      },
      {
        url: "/images/azbuddy2.avif",
        alt: "Custom animated navigation buttons",
      },
      {
        url: "/images/azbuddy3.avif",
        alt: "Social media integration section",
      },
      {
        url: "/images/azbuddy4.avif",
        alt: "Performance schedule page",
      },
      {
        url: "/images/azbuddy5.avif",
        alt: "Custom admin portal for gig management",
      },
    ],
    tags: ["React", "Custom Scheduling Portal", "Portfolio"],
    features: [
      "Custom-designed animated buttons and transitions",
      "Seamless single-page navigation",
      "Social media integration (YouTube, Facebook)",
      "Desert-inspired color scheme and branding",
      "Custom admin portal for gig management and scheduling",
      "Real-time schedule updates and performance tracking",
    ],
    color: "from-orange-500 to-teal-500",
  },
  {
    id: "gardenerplus",
    title: "GardenerPlus",
    tagline: "AI-Powered Plant Care Companion",
    description:
      "A comprehensive plant care tracking app with AI-powered health diagnostics. Track watering schedules, get personalized care recommendations, and analyze plant health using advanced photo analysis technology.",
    images: [
      {
        url: "/images/gard1.avif",
        alt: "GardenerPlus main dashboard",
      },
      {
        url: "/images/gard2.avif",
        alt: "Detailed plant profile with care instructions",
      },
      {
        url: "/images/gard3.avif",
        alt: "AI plant health checkup feature",
      },
    ],
    tags: ["Swift", "AI/ML", "Mobile", "Python Backend"],
    features: [
      "AI-powered plant health diagnostics",
      "Personalized care recommendations and reminders",
      "Photo analysis with care history integration",
      "Track multiple plants with detailed profiles",
    ],
    color: "from-green-500 to-emerald-600",
  },
]
