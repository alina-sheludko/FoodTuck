import { IPicture } from "../interfaces/picture";

export function mapSrcToPicture(src: string, sourcesCount: number = 0): IPicture {
  return {src: src, sources: Array.from({length: sourcesCount}), alt: ''}
}