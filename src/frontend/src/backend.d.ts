import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    _initializeAccessControlWithSecret: (userSecret: string) => Promise<void>;
    register: (username: string, password: string) => Promise<{ ok: string } | { err: string }>;
    login: (username: string, password: string) => Promise<{ ok: string } | { err: string }>;
    getProfile: (token: string) => Promise<{ ok: { userId: string; username: string; balance: bigint } } | { err: string }>;
    processPostback: (userId: string, reward: bigint, status: string, transactionId: string) => Promise<string>;
    logout: (token: string) => Promise<boolean>;
}
