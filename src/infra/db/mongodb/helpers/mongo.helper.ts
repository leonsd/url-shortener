import { Collection, InsertOneResult, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(uri: string) {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect() {
    await this.client.close();
    this.client = null;
  },

  async getCollection(collectionName: string): Promise<Collection> {
    const collection: Collection = await this.client
      .db()
      .collection(collectionName);

    return collection;
  },

  map<T>(
    result: InsertOneResult<Document>,
    data: T & { _id?: string },
  ): Omit<T & { _id?: string }, '_id'> & { id: string } {
    const id = result.insertedId.toJSON();
    const { _id, ...restData } = data;

    return Object.assign({}, restData, { id });
  },
};
