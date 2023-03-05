export interface IPicture {
  sources: {media: string, srcSet: string}[];
  src: string;
  alt?: string;
}