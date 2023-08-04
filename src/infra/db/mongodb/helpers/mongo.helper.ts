import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string) {
    this.uri = uri;
    this.client = await MongoClient.connect(this.uri);
  },

  async disconnect() {
    await this.client.close();
    this.client = null;
  },

  async getCollection(collectionName: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri);
    }

    const collection: Collection = await this.client
      .db()
      .collection(collectionName);

    return collection;
  },

  map<T>(
    data: T & { _id?: string },
  ): Omit<T & { _id?: string }, '_id'> & { id: string } {
    const { _id, ...restData } = data;

    return Object.assign({}, restData, { id: String(_id) });
  },
};
