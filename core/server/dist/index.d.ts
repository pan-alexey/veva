/// <reference types="node" />
import * as http from 'http';
import express from 'express';
export declare const createServer: (port: number) => Promise<{
    app: express.Express;
    server: http.Server;
    isReady: () => boolean;
    static: (root: string) => void;
    setReady: (status?: boolean) => void;
}>;
