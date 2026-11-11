import rose from "@/assets/rose-dor.jpg";
import jasmin from "@/assets/jasmin-nuit.jpg";
import cedre from "@/assets/cedre-royal.jpg";
import santal from "@/assets/santal-mystique.jpg";
import oud from "@/assets/oud-sultan.jpg";
import ambre from "@/assets/ambre-desert.jpg";
import brise from "@/assets/brise-marine.jpg";
import agrume from "@/assets/agrume-solaire.jpg";
import floralPhoto from "@/assets/famille-floral.jpg";
import fruitePhoto from "@/assets/famille-fruite.jpg";
import hesperidePhoto from "@/assets/famille-hesperide.jpg";
import boisePhoto from "@/assets/famille-boise.jpg";
import ambrePhoto from "@/assets/famille-ambre.jpg";
import aquatiquePhoto from "@/assets/famille-aquatique.jpg";
import fraisPhoto from "@/assets/famille-frais.jpg";
import epicePhoto from "@/assets/famille-epice.jpg";
import aromatiquePhoto from "@/assets/famille-aromatique.jpg";
import vertPhoto from "@/assets/famille-vert.jpg";
import musquePhoto from "@/assets/famille-musque.jpg";
import cuirPhoto from "@/assets/famille-cuir.jpg";
import { fragrances, fragranceId, type Categorie } from "@/lib/fragrances";

type ParfumDetails = { photo: string; traits: string; personnalite: string; occasion: string; univers: string };

const profils: Record<Categorie, { photo: string; traits: string; personnalite: string; occasion: string; univers: string }> = {
  floral: { photo: floralPhoto, traits: "Sensible · Raffinée · Romantique", personnalite: "Une personnalité attentive et créative, qui aime la beauté des petits instants et exprime sa singularité avec douceur.", occasion: "Une journée de printemps, un rendez-vous ou un moment de douceur.", univers: "Un univers de pétales, de bouquets et de jardins en fleurs." },
  fruite: { photo: fruitePhoto, traits: "Joyeuse · Spontanée · Gourmande", personnalite: "Une personnalité conviviale et pétillante, qui aime partager, découvrir et profiter des plaisirs simples.", occasion: "Une sortie entre amis, un après-midi ensoleillé ou une escapade.", univers: "Un univers de fruits juteux, de vergers et de fraîcheur gourmande." },
  hesperide: { photo: hesperidePhoto, traits: "Optimiste · Vive · Solaire", personnalite: "Une personnalité énergique et ouverte, qui aime les nouveaux départs et apporte de la bonne humeur autour d'elle.", occasion: "Un matin lumineux, un déjeuner en terrasse ou une journée d'été.", univers: "Un univers d'agrumes, d'écorces et de zestes pétillants." },
  boise: { photo: boisePhoto, traits: "Authentique · Sereine · Assurée", personnalite: "Une personnalité fidèle à ses valeurs, qui apprécie le calme, la nature et une élégance sans artifice.", occasion: "Un rendez-vous important, une promenade ou une soirée d'automne.", univers: "Un univers de bois nobles, de racines et de forêts." },
  ambre: { photo: ambrePhoto, traits: "Chaleureuse · Passionnée · Magnétique", personnalite: "Une personnalité généreuse et intense, qui aime les voyages, les récits et les moments qui laissent un souvenir.", occasion: "Une soirée d'hiver, une célébration ou un dîner intimiste.", univers: "Un univers de résines, de chaleur ambrée et de nuances enveloppantes." },
  aquatique: { photo: aquatiquePhoto, traits: "Libre · Aventureuse · Spontanée", personnalite: "Une personnalité indépendante, qui aime l'horizon, les grands espaces et les escapades improvisées.", occasion: "Une journée au bord de l'eau ou une sortie estivale.", univers: "Un univers d'air marin, d'eau et de fraîcheur aérienne." },
  frais: { photo: fraisPhoto, traits: "Dynamique · Naturelle · Légère", personnalite: "Une personnalité active et simple, qui recherche la liberté de mouvement et l'équilibre au quotidien.", occasion: "Une journée active, un moment de détente ou une sortie au grand air.", univers: "Un univers de fraîcheur végétale, de feuilles et de notes désaltérantes." },
  epice: { photo: epicePhoto, traits: "Audacieuse · Curieuse · Vibrante", personnalite: "Une personnalité inventive, qui aime les contrastes, les découvertes et les expériences hors du commun.", occasion: "Une soirée animée, un voyage ou un rendez-vous original.", univers: "Un univers d'épices, de chaleur et de contrastes aromatiques." },
  aromatique: { photo: aromatiquePhoto, traits: "Calme · Indépendante · Naturelle", personnalite: "Une personnalité équilibrée, qui apprécie les rituels simples, les jardins et la sincérité des rencontres.", occasion: "Une journée décontractée, une balade ou un week-end à la campagne.", univers: "Un univers d'herbes aromatiques, de jardins et de fraîcheur méditerranéenne." },
  vert: { photo: vertPhoto, traits: "Contemplative · Libre · Authentique", personnalite: "Une personnalité sensible à la nature, qui trouve son inspiration dans les paysages et les moments de calme.", occasion: "Une promenade, un matin de printemps ou une pause pour soi.", univers: "Un univers de feuillage, de tiges et de végétaux fraîchement cueillis." },
  musque: { photo: musquePhoto, traits: "Discrète · Douce · Raffinée", personnalite: "Une personnalité attentive, qui aime l'intimité, les matières douces et une élégance toute en nuances.", occasion: "Un moment intime, une journée paisible ou une tenue élégante.", univers: "Un univers de muscs, de douceur cotonneuse et d'accents poudrés." },
  cuir: { photo: cuirPhoto, traits: "Affirmée · Indépendante · Singulière", personnalite: "Une personnalité de caractère, qui assume ses choix et aime les matières brutes, les contrastes et les histoires authentiques.", occasion: "Une soirée habillée, un concert ou un rendez-vous marquant.", univers: "Un univers de cuir, de daim et d'accents fumés." },
};
const nouveauxDetails = Object.fromEntries((Object.entries(fragrances) as [Categorie, string[]][]).flatMap(([categorie, notes]) => notes.map((note) => {
  const profil = profils[categorie];
  return [fragranceId(note), { ...profil, personnalite: `Essence ${note} évoque ${profil.personnalite.charAt(0).toLowerCase()}${profil.personnalite.slice(1)}`, univers: `${note} est la note signature de cette création. ${profil.univers}` }];
})));

export const parfumDetails: Record<string, ParfumDetails> = {
  ...nouveauxDetails,
  "rose-dor": {
    photo: rose, traits: "Romantique · Délicate · Lumineuse",
    personnalite: "Vous aimez les gestes attentionnés, les beaux souvenirs et les petits détails qui font toute la différence. Rose d'Or évoque une personnalité tendre et raffinée, qui séduit avec douceur plutôt qu'avec éclat.",
    occasion: "Un rendez-vous, une fête au printemps ou une journée que vous souhaitez rendre spéciale.",
    univers: "Une rose généreuse, la douceur de la pivoine et un voile de musc blanc : une ambiance de jardin en fleurs.",
  },
  "jasmin-nuit": {
    photo: jasmin, traits: "Mystérieuse · Sensuelle · Créative",
    personnalite: "Vous suivez votre intuition et aimez les rencontres qui sortent de l'ordinaire. Jasmin de Nuit évoque une personnalité magnétique, imaginative et indépendante, à l'aise dans une élégance qui ne passe pas inaperçue.",
    occasion: "Un dîner à deux, une sortie habillée ou une soirée sous les étoiles.",
    univers: "Le jasmin et la fleur d'oranger rencontrent la douceur enveloppante de la vanille dans un bouquet nocturne.",
  },
  "cedre-royal": {
    photo: cedre, traits: "Assurée · Calme · Authentique",
    personnalite: "Vous préférez la sincérité aux apparences et avancez avec une confiance tranquille. Cèdre Royal évoque une personnalité solide et fidèle, qui apprécie la nature, les matières nobles et l'élégance discrète.",
    occasion: "Une journée de travail, un rendez-vous important ou une promenade d'automne.",
    univers: "Le caractère du cèdre, les nuances végétales du vétiver et un accord cuir dessinent un paysage boisé.",
  },
  "santal-mystique": {
    photo: santal, traits: "Introspective · Libre · Raffinée",
    personnalite: "Vous recherchez l'harmonie, sans renoncer à votre singularité. Santal Mystique évoque une personnalité contemplative et sensible, qui aime l'art, les moments de calme et les découvertes loin des sentiers battus.",
    occasion: "Une exposition, une pause pour soi ou une soirée paisible entre proches.",
    univers: "Un bois de santal crémeux, un iris délicat et l'accord ambré de l'ambre gris composent une atmosphère douce et chaleureuse.",
  },
  "oud-sultan": {
    photo: oud, traits: "Audacieuse · Charismatique · Passionnée",
    personnalite: "Vous assumez vos choix et aimez laisser une impression mémorable. Oud Sultan évoque une personnalité intense et généreuse, attirée par les voyages, les contrastes et les expériences hors du commun.",
    occasion: "Une célébration, une grande soirée ou un événement où vous souhaitez vous distinguer.",
    univers: "Le bois de oud rencontre les accents épicés du safran et une rose noire : un univers oriental opulent.",
  },
  "ambre-desert": {
    photo: ambre, traits: "Chaleureuse · Rêveuse · Généreuse",
    personnalite: "Vous aimez partager, accueillir et transformer les moments simples en souvenirs précieux. Ambre du Désert évoque une personnalité solaire et réconfortante, avec un goût pour l'évasion et les histoires qui font voyager.",
    occasion: "Une soirée d'hiver, un dîner entre amis ou un instant de détente.",
    univers: "La chaleur de l'ambre, un accord de datte et les nuances résineuses de l'encens évoquent un paysage doré.",
  },
  "brise-marine": {
    photo: brise, traits: "Spontanée · Sportive · Indépendante",
    personnalite: "Vous avez besoin d'air, de mouvement et de liberté. Brise Marine évoque une personnalité énergique et directe, qui aime les escapades improvisées, le grand air et les journées sans contraintes.",
    occasion: "Une journée d'été, une escapade au bord de l'eau ou une sortie décontractée.",
    univers: "L'éclat de la bergamote, un accord de sel marin et la fraîcheur de la menthe rappellent une brise méditerranéenne.",
  },
  "agrume-solaire": {
    photo: agrume, traits: "Optimiste · Curieuse · Pétillante",
    personnalite: "Vous voyez les possibilités avant les obstacles et apportez de la bonne humeur autour de vous. Agrume Solaire évoque une personnalité vive et ouverte, qui aime apprendre, rencontrer et profiter du présent.",
    occasion: "Un matin ensoleillé, un déjeuner en terrasse ou une journée légère.",
    univers: "Le citron pétillant, les fleurs de néroli et la délicatesse du thé blanc dessinent une fraîcheur lumineuse.",
  },
};