// What anyone may read about a testimonial. A reviewer's email, link and consent record stay private.
export const PUBLIC_TESTIMONIAL_FIELDS = {
  id: true,
  name: true,
  role: true,
  company: true,
  content: true,
  quote: true,
  avatar: true,
  featured: true,
  source: true,
  relation: true,
  project: true,
  orderIndex: true,
  createdAt: true,
} as const
