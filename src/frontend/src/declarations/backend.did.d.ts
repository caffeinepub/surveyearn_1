/* eslint-disable */
// @ts-nocheck
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export type UserRole = { 'admin': null } | { 'user': null } | { 'guest': null };
export type Result = { 'ok' : string } | { 'err' : string };
export type ProfileResult = { 'ok' : { userId: string; username: string; balance: bigint } } | { 'err' : string };
export interface _SERVICE {
  '_initializeAccessControlWithSecret' : ActorMethod<[string], undefined>;
  'register' : ActorMethod<[string, string], Result>;
  'login' : ActorMethod<[string, string], Result>;
  'getProfile' : ActorMethod<[string], ProfileResult>;
  'processPostback' : ActorMethod<[string, bigint, string, string], string>;
  'logout' : ActorMethod<[string], boolean>;
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
