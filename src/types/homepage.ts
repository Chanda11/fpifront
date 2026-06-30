export interface HomepageSection {
  id: number;

  section: string;

  title?: string;
  subtitle?: string;
  content?: string;

  image?: string;

  buttonText?: string;
  buttonLink?: string;

  published: boolean;

  createdAt: string;
  updatedAt: string;
}