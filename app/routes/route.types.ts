import { Router } from 'express';

export class Route {
  constructor(public path: string, public router: Router) {}
}

export type Routes = Route[];

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type StringArray = string[];

export class ExcludedPath {
  params: StringArray[];
  constructor(
    public path: string,
    public method: Method,
    ...param: StringArray[]
  ) {
    this.params = param;
  }
}

export type ExcludedPaths = ExcludedPath[];