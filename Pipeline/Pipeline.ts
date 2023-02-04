import { IRequestMiddlewaresRecord } from "./core/MethodMiddleware.interface";
import { ErrorMiddleware, Middleware } from "./core/Middleware.types";
import { IncomingMessage, ServerResponse, Server, createServer } from "http";

export class PipelineServer {
  constructor(server?: Server) {
    if (!server) {
      this.server = createServer((request, response) => {
        this.handleRequests(request, response);
      });
    } else {
      this.server = server;
      this.server.addListener("request", (request, response) => {
        this.handleRequests(request, response);
      });
    }
  }

  private middlewares: Middleware[] = [];
  private errorMiddlewares: ErrorMiddleware[] = [];
  private server!: Server;
  private methodMiddlewares: IRequestMiddlewaresRecord = {
    get: new Map(),
    post: new Map(),
    delete: new Map(),
    update: new Map(),
    options: new Map(),
  };

  private async handleRequests(
    request: IncomingMessage,
    response: ServerResponse
  ) {
    const REQUEST_URL = request.url!;
    const REQUEST_METHOD =
      request.method!.toLowerCase() as keyof IRequestMiddlewaresRecord;

    await this.execMiddlewares(request, response, this.middlewares); //eseguo tutti i middleware che fanno il parse del body etc..
    try {
      if (!(REQUEST_METHOD in this.methodMiddlewares)) {
        throw new Error(`${REQUEST_METHOD} not in server`);
      }

      const methodUrlMiddlewareMap = this.methodMiddlewares[REQUEST_METHOD]; //questa è una mappa con url:middlewares

      if (!methodUrlMiddlewareMap.has(REQUEST_URL)) {
        throw new Error(`No ${REQUEST_URL} for method ${REQUEST_METHOD}`);
      }

      const middlewaresForUrlAndMethod =
        methodUrlMiddlewareMap.get(REQUEST_URL) ?? []; // la lista di middleware da eseguire per questo url

      await this.execMiddlewares(request, response, middlewaresForUrlAndMethod);
    } catch (error) {
      console.log(error);

      this.execErrorMiddlewares(error,request,response,this.errorMiddlewares);
    }
  }

  private async execMiddlewares(
    request: IncomingMessage,
    response: ServerResponse,
    middlewares: Middleware[]
  ) {
    for await (let middleware of middlewares) {
      await middleware(request, response);
    }
  }

  private async execErrorMiddlewares(
    error:any, //l'errore da gestire
    request: IncomingMessage,
    response: ServerResponse,
    middlewares: ErrorMiddleware[]
  ) {
    for await (let errorMiddleware of middlewares){
        await errorMiddleware(error,request,response);
    }
  }
  /**
   * @description route method recieves a url as an input and returns an object that adds the middleware to methodMiddlewares in the right method
   * @param url string
   */
  public route(url: string) {
    //return an object, that has the methodMiddlewaresMethods i.e get. calling get(Middleware) adds Middleware to get in methodMiddlewares for this specific url
    const that = this;
    const routeMethods: Record<
      keyof IRequestMiddlewaresRecord,
      (...middlewares: Middleware[]) => void
    > = {
      //is there a better way ro have all these methods that do the same thing
      get(...middlewares: Middleware[]) {
        that.addToMethodMiddleware("get", url, middlewares);
      },
      post(...middlewares: Middleware[]) {
        that.addToMethodMiddleware("post", url, middlewares);
      },
      delete(...middlewares: Middleware[]) {
        that.addToMethodMiddleware("delete", url, middlewares);
      },
      update(...middlewares: Middleware[]) {
        that.addToMethodMiddleware("update", url, middlewares);
      },
      options(...middlewares: Middleware[]) {
        that.addToMethodMiddleware("options", url, middlewares);
      },
    };

    return routeMethods;
  }

  private addToMethodMiddleware(
    method: keyof IRequestMiddlewaresRecord,
    url: string,
    middlewares: Middleware[]
  ) {
    const middlewareMap = this.methodMiddlewares[method];
    middlewareMap.set(url, middlewares);
  }

  listen(port: number, cb: () => void) {
    return this.server.listen(port, cb);
  }

  /**
   * @description dependingo on the number of arguements of the function
   * @param middleware
   */
  use(middleware: Middleware | ErrorMiddleware) {
    const nOfArgs = middleware.length as number; //n of parameters passed to the function
    switch (nOfArgs) {
      case 2:
        this.middlewares.push(middleware as Middleware);
        break;
      case 3:
        this.errorMiddlewares.push(middleware as ErrorMiddleware);
        break;
    }
  }
}

export const pipelineServer = (server?: Server) => {
  return new PipelineServer(server);
};
