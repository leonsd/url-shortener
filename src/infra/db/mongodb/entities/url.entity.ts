import { Schema, model } from 'mongoose';
import { UrlModel } from '../../../../domain/models/url.model';

const urlSchema = new Schema<UrlModel>({
  original: {
    type: String,
    required: true,
  },
  shortened: {
    type: String,
    required: true,
  },
});

export const UrlEntity = model<UrlModel>('Url', urlSchema);
