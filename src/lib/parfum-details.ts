import rose from "@/assets/rose-dor.jpg";
import jasmin from "@/assets/jasmin-nuit.jpg";
import cedre from "@/assets/cedre-royal.jpg";
import santal from "@/assets/santal-mystique.jpg";
import oud from "@/assets/oud-sultan.jpg";
import ambre from "@/assets/ambre-desert.jpg";
import brise from "@/assets/brise-marine.jpg";
import agrume from "@/assets/agrume-solaire.jpg";

type ParfumDetails = { photo: string; traits: string; personnalite: string; occasion: string; univers: string };

export const parfumDetails: Record<string, ParfumDetails> = {
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