/* eslint-disable */

// @ts-nocheck

import { Actor, HttpAgent, type HttpAgentOptions, type ActorConfig, type Agent, type ActorSubclass } from "@icp-sdk/core/agent";
import type { Principal } from "@icp-sdk/core/principal";
import { idlFactory, type _SERVICE } from "./declarations/backend.did";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
function some<T>(value: T): Some<T> {
    return { __kind__: "Some", value };
}
function none(): None {
    return { __kind__: "None" };
}
function isNone<T>(option: Option<T>): option is None {
    return option.__kind__ === "None";
}
function isSome<T>(option: Option<T>): option is Some<T> {
    return option.__kind__ === "Some";
}
function unwrap<T>(option: Option<T>): T {
    if (isNone(option)) throw new Error("unwrap: none");
    return option.value;
}
function candid_some<T>(value: T): [T] { return [value]; }
function candid_none<T>(): [] { return []; }
function record_opt_to_undefined<T>(arg: T | null): T | undefined {
    return arg == null ? undefined : arg;
}
export class ExternalBlob {
    _blob?: Uint8Array<ArrayBuffer> | null;
    directURL: string;
    onProgress?: (percentage: number) => void = undefined;
    private constructor(directURL: string, blob: Uint8Array<ArrayBuffer> | null) {
        if (blob) { this._blob = blob; }
        this.directURL = directURL;
    }
    static fromURL(url: string): ExternalBlob { return new ExternalBlob(url, null); }
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob {
        const url = URL.createObjectURL(new Blob([new Uint8Array(blob)], { type: 'application/octet-stream' }));
        return new ExternalBlob(url, blob);
    }
    public async getBytes(): Promise<Uint8Array<ArrayBuffer>> {
        if (this._blob) return this._blob;
        const response = await fetch(this.directURL);
        const blob = await response.blob();
        this._blob = new Uint8Array(await blob.arrayBuffer());
        return this._blob;
    }
    public getDirectURL(): string { return this.directURL; }
    public withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob {
        this.onProgress = onProgress;
        return this;
    }
}
export interface backendInterface {
    _initializeAccessControlWithSecret: (userSecret: string) => Promise<void>;
    register: (username: string, password: string) => Promise<{ ok: string } | { err: string }>;
    login: (username: string, password: string) => Promise<{ ok: string } | { err: string }>;
    getProfile: (token: string) => Promise<{ ok: { userId: string; username: string; balance: bigint } } | { err: string }>;
    processPostback: (userId: string, reward: bigint, status: string, transactionId: string) => Promise<string>;
    logout: (token: string) => Promise<boolean>;
}
export class Backend implements backendInterface {
    constructor(private actor: ActorSubclass<_SERVICE>, private _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, private _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, private processError?: (error: unknown) => never) {}

    async _initializeAccessControlWithSecret(userSecret: string): Promise<void> {
        return this.actor._initializeAccessControlWithSecret(userSecret);
    }
    async register(username: string, password: string): Promise<{ ok: string } | { err: string }> {
        const result = await this.actor.register(username, password);
        if ('ok' in result) return { ok: result.ok };
        return { err: result.err };
    }
    async login(username: string, password: string): Promise<{ ok: string } | { err: string }> {
        const result = await this.actor.login(username, password);
        if ('ok' in result) return { ok: result.ok };
        return { err: result.err };
    }
    async getProfile(token: string): Promise<{ ok: { userId: string; username: string; balance: bigint } } | { err: string }> {
        const result = await this.actor.getProfile(token);
        if ('ok' in result) return { ok: result.ok };
        return { err: result.err };
    }
    async processPostback(userId: string, reward: bigint, status: string, transactionId: string): Promise<string> {
        return this.actor.processPostback(userId, reward, status, transactionId);
    }
    async logout(token: string): Promise<boolean> {
        return this.actor.logout(token);
    }
}
export interface CreateActorOptions {
    agent?: Agent;
    agentOptions?: HttpAgentOptions;
    actorOptions?: ActorConfig;
    processError?: (error: unknown) => never;
}
export function createActor(canisterId: string, _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>, _downloadFile: (file: Uint8Array) => Promise<ExternalBlob>, options: CreateActorOptions = {}): Backend {
    const agent = options.agent || HttpAgent.createSync({ ...options.agentOptions });
    if (options.agent && options.agentOptions) {
        console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
    }
    const actor = Actor.createActor<_SERVICE>(idlFactory, {
        agent,
        canisterId,
        ...options.actorOptions
    });
    return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
