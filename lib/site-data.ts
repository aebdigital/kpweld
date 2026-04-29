import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardList,
  DraftingCompass,
  Fence,
  Hammer,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const siteUrl = "https://kpweld.sk";

export const company = {
  name: "KP-WELD",
  legalName: "KP-WELD s.r.o.",
  phone: "+421 908 383 815",
  phoneHref: "tel:+421908383815",
  email: "kpweldsro@gmail.com",
  emailHref: "mailto:kpweldsro@gmail.com",
  address: "Bratislavská 2558, 931 01 Šamorín",
  addressLines: ["Bratislavská 2558", "931 01 Šamorín", "Slovakia"],
  facebook: "https://www.facebook.com/kpweldsro",
  googleReviews: "https://share.google.com/UarZt9AmDqTVaFKsT",
  ico: "53126432",
  dic: "2121273077",
  icDph: "SK2121273077",
  coordinates: {
    latitude: 48.1247,
    longitude: 17.3159,
  },
};

export const navLinks = [
  { href: "/", label: "Domov" },
  { href: "/o-nas", label: "O nás" },
  { href: "/produkty-sluzby", label: "Služby" },
  { href: "/referencie", label: "Referencie" },
  { href: "/kontakt", label: "Kontakt" },
];

export const assetPath = (folder: string, file: string) =>
  `/sources/${folder}/${encodeURIComponent(file)}`;

export type ServiceSlug =
  | "ocelove-konstrukcie"
  | "brany"
  | "oplotenia"
  | "schody"
  | "zabradlia"
  | "pristresky";

export type ServiceGalleryGroup = {
  title: string;
  images: string[];
};

export type Service = {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  cover: string;
  hero: string;
  icon: LucideIcon;
  highlights: string[];
  gallery: ServiceGalleryGroup[];
};

export const services: Service[] = [
  {
    slug: "ocelove-konstrukcie",
    title: "Oceľové konštrukcie",
    eyebrow: "Nosné riešenia",
    shortDescription: "Priemyselné haly, skladové priestory a oceľové celky na mieru.",
    description:
      "Špecializujeme sa na výrobu a montáž oceľových konštrukcií pre priemyselné, komerčné aj rezidenčné projekty. Každé riešenie pripravujeme s dôrazom na bezpečnosť, kvalitu spracovania a spoľahlivú montáž.",
    cover: assetPath("ocelove-konstrukcie", "481310863_1160063098992832_1613523334873384510_n.jpg"),
    hero: assetPath("ocelove-konstrukcie", "steel-construction-2.jpg"),
    icon: Building2,
    highlights: ["Nosné konštrukcie", "Haly a prístavby", "Výroba aj montáž"],
    gallery: [
      {
        title: "Oceľové konštrukcie",
        images: [
          assetPath("ocelove-konstrukcie", "481310863_1160063098992832_1613523334873384510_n.jpg"),
          assetPath("ocelove-konstrukcie", "481954050_1160062938992848_7453284517972193970_n.jpg"),
          assetPath("ocelove-konstrukcie", "481659600_1160062992326176_3945142973291339399_n.jpg"),
          assetPath("ocelove-konstrukcie", "481236840_1160062968992845_7202887118636273900_n.jpg"),
          assetPath("ocelove-konstrukcie", "480258869_1150874036578405_4800071297700237540_n.jpg"),
          assetPath("ocelove-konstrukcie", "488248151_1184746809857794_4995541263063335151_n.jpg"),
        ],
      },
    ],
  },
  {
    slug: "brany",
    title: "Brány",
    eyebrow: "Vstupné systémy",
    shortDescription: "Samonosné, koľajnicové, teleskopické a sekčné brány.",
    description:
      "Vyrábame a montujeme brány pre rodinné domy, komerčné objekty aj priemyselné areály. Zameriavame sa na funkčnosť, bezpečnosť a čistý vzhľad, od jednoduchých riešení po automatizované vstupy.",
    cover: assetPath("brany", "488844786_1184721706526971_4249505864402508447_n.jpg"),
    hero: assetPath("brany", "samo.jpg"),
    icon: Home,
    highlights: ["Samonosné brány", "Koľajnicové brány", "Automatizácia"],
    gallery: [
      {
        title: "Samonosné brány",
        images: [
          assetPath("brany", "samo.jpg"),
          assetPath("brany", "samo2.jpg"),
          assetPath("brany", "samo34.jpg"),
          assetPath("brany", "samo45.jpg"),
        ],
      },
      {
        title: "Koľajnicové brány",
        images: [
          assetPath("brany", "488511454_1184740716525070_403469956550160031_n.jpg"),
          assetPath("brany", "488269639_1184742316524910_747753338077544002_n.jpg"),
          assetPath("brany", "488079237_1184740426525099_4079073163989006244_n.jpg"),
          assetPath("brany", "487778232_1183895413276267_2660382661669386378_n.jpg"),
        ],
      },
      {
        title: "Teleskopické a sekčné brány",
        images: [
          assetPath("brany", "tele.jpg"),
          assetPath("brany", "sekc.jpg"),
          assetPath("brany", "sekc2.jpg"),
        ],
      },
    ],
  },
  {
    slug: "oplotenia",
    title: "Oplotenia",
    eyebrow: "Plotové systémy",
    shortDescription: "Kovové ploty, panelové riešenia a zvárané systémy.",
    description:
      "Realizujeme komplexné oplotenia pozemkov všetkých typov vrátane výroby, dopravy a montáže. Dôležitá je pre nás trvácnosť, pevnosť konštrukcie a estetické napojenie na dom alebo areál.",
    cover: assetPath("oplotenia", "481051889_1155589699440172_4251013599637148739_n.jpg"),
    hero: assetPath("oplotenia", "488203100_1184740843191724_4764278083201774400_n.jpg"),
    icon: Fence,
    highlights: ["Kovové ploty", "Panelové systémy", "Montáž na mieste"],
    gallery: [
      {
        title: "Oplotenia",
        images: [
          assetPath("oplotenia", "40279768_1194074594079726_721468194065219584_n.jpg"),
          assetPath("oplotenia", "46519638_1251176148369570_1298487339361763328_n.jpg"),
          assetPath("oplotenia", "470189991_1107578650907944_3251561571456656254_n.jpg"),
          assetPath("oplotenia", "480831581_1160063022326173_338704671924504993_n.jpg"),
          assetPath("oplotenia", "481051889_1155589699440172_4251013599637148739_n.jpg"),
          assetPath("oplotenia", "481217022_1160064302326045_8744388195958651904_n.jpg"),
          assetPath("oplotenia", "481217422_1160064332326042_1659944164582382500_n.jpg"),
          assetPath("oplotenia", "488203100_1184740843191724_4764278083201774400_n.jpg"),
        ],
      },
    ],
  },
  {
    slug: "schody",
    title: "Schody",
    eyebrow: "Interiér aj exteriér",
    shortDescription: "Priame, točité a konzolové oceľové schody.",
    description:
      "Navrhujeme a vyrábame oceľové schody pre interiér aj exteriér. Kombinácia ocele s drevom, sklom alebo kovovými stupňami umožňuje pripraviť riešenie presne podľa priestoru.",
    cover: assetPath("schody", "487973472_1184737956525346_4990061557436595606_n.jpg"),
    hero: assetPath("schody", "stairs-railings-1.jpg"),
    icon: Hammer,
    highlights: ["Priame schody", "Točité schody", "Konzolové riešenia"],
    gallery: [
      {
        title: "Schody",
        images: [
          assetPath("schody", "141477335_1954351814718663_6837556700787118790_n.jpg"),
          assetPath("schody", "157928424_1987704824716695_168005964291135182_n.jpg"),
          assetPath("schody", "472594611_1122792516053224_1494716080159740959_n.jpg"),
          assetPath("schody", "475367752_1138467984485677_8947044705760366678_n.jpg"),
          assetPath("schody", "481334419_1160064162326059_4883472969210741098_n.jpg"),
          assetPath("schody", "487973472_1184737956525346_4990061557436595606_n.jpg"),
        ],
      },
    ],
  },
  {
    slug: "zabradlia",
    title: "Zábradlia",
    eyebrow: "Bezpečné línie",
    shortDescription: "Balkónové, terasové a bezpečnostné zábradlia.",
    description:
      "Vyrábame bezpečnostné zábradlia pre schody, balkóny, terasy a priemyselné aplikácie. Riešenia pripravujeme tak, aby plnili normy, dobre vyzerali a vydržali každodenné používanie.",
    cover: assetPath("zabradlia", "488534322_1184738639858611_3002202836602933748_n.jpg"),
    hero: assetPath("zabradlia", "gates-fencing-1.jpg"),
    icon: ShieldCheck,
    highlights: ["Balkóny a terasy", "Schodiská", "Bezpečnostné systémy"],
    gallery: [
      {
        title: "Zábradlia",
        images: [
          assetPath("zabradlia", "131324597_303233911342426_1955454296776425358_n.jpg"),
          assetPath("zabradlia", "137317761_1943688805784964_4624860097771343681_n.jpg"),
          assetPath("zabradlia", "169548674_257270802605404_5805954749388293332_n.jpg"),
          assetPath("zabradlia", "475165143_1138468064485669_2234312734857015738_n.jpg"),
          assetPath("zabradlia", "480985056_1160063845659424_4370361145270335103_n.jpg"),
          assetPath("zabradlia", "488534322_1184738639858611_3002202836602933748_n.jpg"),
        ],
      },
    ],
  },
  {
    slug: "pristresky",
    title: "Prístrešky",
    eyebrow: "Ochrana na mieru",
    shortDescription: "Oceľové prístrešky pre autá, záhrady a terasy.",
    description:
      "Vyrábame a montujeme oceľové prístrešky pre autá, záhrady a terasy. Každý prístrešok navrhujeme na mieru podľa priestoru, spôsobu kotvenia a požadovanej strešnej výplne.",
    cover: assetPath("pristresky", "480988727_1160721905593618_1338831727773942084_n.jpg"),
    hero: assetPath("pristresky", "481287880_1160721735593635_8163028699974947865_n.jpg"),
    icon: Wrench,
    highlights: ["Polykarbonát", "Sklo", "Trapézový plech"],
    gallery: [
      {
        title: "S polykarbonátom",
        images: [
          assetPath("pristresky", "475439530_1139184447747364_4507250945929274537_n.jpg"),
          assetPath("pristresky", "475393590_1138467907819018_2748598122832765872_n.jpg"),
          assetPath("pristresky", "473571568_1127626445569831_6584821691661000372_n.jpg"),
          assetPath("pristresky", "480817767_1155589286106880_1328208938645769480_n.jpg"),
        ],
      },
      {
        title: "So sklom",
        images: [
          assetPath("pristresky", "480988727_1160721905593618_1338831727773942084_n.jpg"),
          assetPath("pristresky", "481287880_1160721735593635_8163028699974947865_n.jpg"),
          assetPath("pristresky", "481010230_1160721752260300_126677141605803851_n.jpg"),
        ],
      },
      {
        title: "S trapézovým plechom",
        images: [
          assetPath("pristresky", "480297185_1150873603245115_4019559293901851003_n.jpg"),
          assetPath("pristresky", "469020924_1100776981588111_7148064601817989066_n.jpg"),
          assetPath("pristresky", "12.jpg"),
          assetPath("pristresky", "13.jpg"),
        ],
      },
    ],
  },
];

export const serviceMap = new Map(services.map((service) => [service.slug, service]));

export const processSteps = [
  {
    title: "Nezáväzná ponuka",
    description: "Kontaktujte nás s požiadavkami. Pripravíme cenovú ponuku na mieru.",
    icon: ClipboardList,
  },
  {
    title: "Konzultácia a návrh",
    description: "Doladíme rozmery, materiály, technické riešenie a termín realizácie.",
    icon: DraftingCompass,
  },
  {
    title: "Výroba a montáž",
    description: "Konštrukciu vyrobíme v dielni a profesionálne osadíme na mieste.",
    icon: Hammer,
  },
  {
    title: "Odovzdanie",
    description: "Hotový projekt odovzdáme s dôrazom na detail, čistotu a funkčnosť.",
    icon: CheckCircle2,
  },
];

export const stats = [
  { value: "500+", label: "realizovaných konštrukcií" },
  { value: "10+", label: "rokov skúseností" },
  { value: "5.0", label: "hodnotenie zákazníkov" },
];

export const testimonials = [
  {
    quote: "Maximálna spokojnosť a profesionalita s dodávkou aj montážou.",
    author: "Roman Žažo",
    initials: "RŽ",
  },
  {
    quote: "Profesionálny prístup, rýchle dodanie a kvalitné spracovanie oceľovej konštrukcie.",
    author: "Martin Beko",
    initials: "MB",
  },
  {
    quote: "Príjemný kolektív, pružná reakcia a vysoká kvalita oceľových prác.",
    author: "Tibor Barborik",
    initials: "TB",
  },
  {
    quote: "Od začiatku komunikácie až po montáž oceľovej konštrukcie čistá profesionalita.",
    author: "Robert Brezovský",
    initials: "RB",
  },
  {
    quote: "Všetko super, termín aj kvalita. Odporúčam.",
    author: "Mária Kvočkuliaková",
    initials: "MK",
  },
];

export const homeGallery = [
  assetPath("brany", "steel-construction-1.jpg"),
  assetPath("zabradlia", "gates-fencing-1.jpg"),
  assetPath("schody", "stairs-railings-1.jpg"),
  assetPath("brany", "welding-work-1.jpg"),
  assetPath("schody", "locksmith-work-1.jpg"),
  assetPath("ocelove-konstrukcie", "steel-construction-2.jpg"),
  assetPath("brany", "steel-construction-3.jpg"),
  assetPath("pristresky", "475439654_1139184464414029_1752645688920835974_n.jpg"),
];

export const contactHighlights = [
  { label: company.address, icon: MapPin },
  { label: company.phone, href: company.phoneHref, icon: Phone },
  { label: company.email, href: company.emailHref, icon: Mail },
];

export const valueProps = [
  {
    title: "Precízna výroba",
    description: "Kvalitné materiály, pevné detaily a riešenia pripravené na každodenné používanie.",
    icon: BadgeCheck,
  },
  {
    title: "Kompletná realizácia",
    description: "Od konzultácie cez výrobu až po montáž v Šamoríne a okolí.",
    icon: Sparkles,
  },
  {
    title: "Spoľahlivý servis",
    description: "Rýchla komunikácia, férový postup a jasné odovzdanie hotovej práce.",
    icon: Star,
  },
];
