import { nanoid } from 'nanoid';
import { Shortener } from '../../data/protocols/shortener.protocol';

export class ShortenerAdapter implements Shortener {
  shorten(size = 6): string {
    return nanoid(size);
  }
}
