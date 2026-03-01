export type BrandId = "lernen" | "unlearn" | "loschke" | "prototype" | "aok"

export interface BrandConfig {
  id: BrandId
  name: string
  description: string
  domain: string
}

const brands: Record<BrandId, BrandConfig> = {
  lernen: {
    id: "lernen",
    name: "lernen.diy",
    description: "Praxisorientierte KI-Lernmodule",
    domain: "lernen.diy",
  },
  unlearn: {
    id: "unlearn",
    name: "unlearn.how",
    description: "KI-Beratung und Workshops",
    domain: "unlearn.how",
  },
  loschke: {
    id: "loschke",
    name: "loschke.ai",
    description: "AI Transformation Insights",
    domain: "loschke.ai",
  },
  prototype: {
    id: "prototype",
    name: "Prototyp",
    description: "Prototyp-Anwendung",
    domain: "localhost",
  },
  aok: {
    id: "aok",
    name: "SAVA",
    description: "Context Pipeline",
    domain: "localhost",
  },
}

const brandId = (process.env.NEXT_PUBLIC_BRAND ?? "lernen") as BrandId

export const brand: BrandConfig = brands[brandId] ?? brands.lernen
