/// <reference types="node" />
import { Server } from 'http';
import { HttpRequestHandler } from '../../interfaces';
export declare function enhanceHttpServerWithSubscriptions(websocketServer: Server, postgraphileMiddleware: HttpRequestHandler, subscriptionServerOptions?: {
    keepAlive?: number;
}): Promise<void>;
