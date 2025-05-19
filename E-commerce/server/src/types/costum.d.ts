import { Request } from "express";

export interface CustomRequest<
  Params = {}, 
  ResBody = {}, 
  Body = {}, 
  Query = {}
> extends Request<Params, ResBody, Body, Query> {
  userId?: string;  // Add the userId property
}