// Section 1
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Mtcms } from './mtcms.model';
import { AddMtcms, RemoveMtcms } from './mtcms.actions';
import { Injectable } from '@angular/core';

export interface MtcmsStateModel {
  mtcms_2: Mtcms[];
}

export class MtcmsStateModel implements MtcmsStateModel {
  mtcms_2!: Mtcms[];
}

@Injectable()
@State<MtcmsStateModel>({
  name: 'mtcms_1',
  defaults: {
    mtcms_2: [],
  },
})
export class MtcmsState {
  @Selector()
  static getMtcms(state: MtcmsStateModel) {
    return state.mtcms_2;
  }

  @Action(AddMtcms)
  add(
    { getState, patchState }: StateContext<MtcmsStateModel>,
    { payload }: AddMtcms
  ) {
    const state = getState();
    console.log(state, patchState);
    patchState({
      mtcms_2: [...state.mtcms_2, { id: Math.random().toString(), ...payload }],
    });
  }

  @Action(RemoveMtcms)
  remove(
    { getState, patchState }: StateContext<MtcmsStateModel>,
    { payload }: RemoveMtcms
  ) {
    patchState({
      mtcms_2: getState().mtcms_2.filter(a => a.id != payload),
    });
  }

  // @Action(RemoveMtcms)
  // fetch({ getState, patchState }: StateContext<MtcmsStateModel>) {
  //   console.log('READ DATA');
  //   const state = getState();
  //   patchState({
  //     apps: [
  //       ...state.apps,
  //       { name: new Date().toString(), url: new Date().toString() },
  //     ],
  //   });
  // }
}
