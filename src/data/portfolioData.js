const portfolioData = {
  personal: {
    name: "Andrii Veliksar",
    title: "Full Stack WordPress & WooCommerce Developer",
    subtitle: "6+ Years of Commercial Work Experience",
    location: "Ukraine",
    email: "aveliksar97@gmail.com",
    profile: `I'm Andrew, a WordPress & WooCommerce developer with 6+ years of hands-on experience delivering custom-coded stores, 
    performance optimization, and long-term maintenance for US, UK, and EU clients — primarily through digital agencies and white-label partnerships.
    As Tech Lead on weed.com (~3,000 SKUs), I improved PageSpeed from 67→91 mobile and 78→98 desktop. 
    I focus on clean PHP/JS architecture, safe staging-based updates, and stores that stay fast and stable after WooCommerce core updates — not page-builder bloat.`
  },

  skills: {
    frontend: [
      "HTML5", "CSS3", "SCSS", "SASS",
      "JavaScript (ES6+)", "jQuery", "AJAX", "JSON",
      "Bootstrap", "BEM", "Tailwind CSS",
      "GSAP", "Parallax", "Three.js", "Canvas",
      "Swiper", "AOS",
      "Figma", "Photoshop", "Sketch"
    ],
    backend: [
      "PHP", "SQL", "REST API",
      "WP-CLI", "CRON", "Transients"
    ],
    wordpress: [
      "Sage", "Underscores", "Child Themes",
      "ACF PRO", "Gutenberg Custom Blocks", "CPT UI",
      "WPML", "Polylang", "Loco Translate",
      "Multisite", "Membership Sites", "Headless WP (Basic)"
    ],
    woocommerce: [
      "Custom Templates", "Checkout Flow", "Payment Gateways",
      "HPOS", "AJAX Cart/Filters", "Large Catalog Optimization"
    ],
    plugins: [
      "Gravity Forms", "Ninja Forms", "WPForms", "CF7",
      "WP Rocket", "W3TC", "Perfmatters", "Imagify", "WebP",
      "Yoast", "RankMath",
      "Wordfence", "Sucuri",
      "Mailchimp", "Brevo",
      "UpdraftPlus", "Duplicator", "All-in-One WP Migration"
    ],
    devops: [
      "Git (GitHub/GitLab)", "CI/CD",
      "Docker", "DigitalOcean", "Cloudflare",
      "WP Engine", "SSL", "Migrations"
    ]
  },

  experience: [
    {
      id: 1,
      title: "Web Developer",
      company: "TemplateMonster · Freelance",
      period: "March 2019 – November 2020",
      type: "Full-time · Part-time",
      description: [
        "PrestaShop theme development at TemplateMonster — commercial web entry point",
        "Freelance: HTML/CSS templates, site speed optimization, client fixes",
        "Transition to WordPress-focused development from 2021"
      ]
    },
    {
      id: 2,
      featured: true,
      title: "Team Lead",
      company: "White Label Agency",
      period: "March 2021 – February 2023",
      type: "Full-time · Remote · White-label",
      description: [
        "Delivered 30+ WordPress/WooCommerce projects for US and EU clients",
        "Custom themes, WooCommerce stores, performance optimization",
        "Team coordination, code review, mentoring junior developers",
        "Career progression: mid-level → senior → Team Lead"
      ]
    },
    {
      id: 3,
      featured: true,
      title: "WordPress Developer → Lead Developer @ weed.com",
      company: "Synapse Team (outstaff on client project)",
      period: "July 2023 – June 2024",
      type: "Full-time · Remote · Client outstaff",
      description: [
        "Lead Developer on weed.com (US CannaTech, 3,000+ SKUs), Sept 2023 – May 2024",
        "PageSpeed: mobile 67→91, desktop 78→98",
        "Custom WP/Woo architecture, query optimization, caching at scale",
        "Outstaff role — lead developer on client side, not a Synapse company lead"
      ]
    },
    {
      id: 4,
      title: "WordPress Developer (Contract)",
      company: "Markupus · GT · 7Devs · Dreamdev Solutions",
      period: "April 2023 – April 2026",
      type: "Contract · Remote · US/EU agencies",
      description: [
        "Project-based delivery across 4 agency partnerships",
        "Custom WP/Woo development, ACF PRO, Gutenberg, checkout customization",
        "Performance tuning, safe updates, production bug fixes"
      ],
      details: [
        { company: "Markupus", period: "Apr – Aug 2023" },
        { company: "GT", period: "May – Oct 2023" },
        { company: "7Devs", period: "Nov 2024 – Apr 2025" },
        { company: "Dreamdev Solutions", period: "Jul 2025 – Apr 2026" }
      ]
    }
  ],

  education: {
    university: "V.O. Sukhomlynskyi Mykolaiv National University",
    degree: "Masters of Science",
    period: "2015 - 2020",
    description: "Complete computer education. OOP/web/programming/database. Participation in programming olympiads and participation in computer science conferences. Teaching experience."
  },

  social: {
    github: "https://github.com/Veliksar",
    linkedin: "https://linkedin.com/in/andrew-veliksar-ukraine/",
    telegram: "https://t.me/velocorp"
  }
};

export default portfolioData;
