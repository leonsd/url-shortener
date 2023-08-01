export interface HttpRequest<T = any> {
  body?: T;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
