import { Mtcms } from './mtcms.model';

export class AddMtcms {
  static readonly type = '[Mtcms] Add';
  constructor(public payload: Mtcms) {}
}

export class RemoveMtcms {
  static readonly type = '[Mtcms] Remove';
  constructor(public payload: string) {}
}

export class FetchData {
  static readonly type = '[Mtcms] Fetch';
}
