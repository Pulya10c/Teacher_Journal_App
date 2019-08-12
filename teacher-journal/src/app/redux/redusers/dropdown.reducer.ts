import { ActionReducer, createReducer, on, Action } from "@ngrx/store";

import { setDropdownListDate } from "../actions/dropdown.action";
import { IDropdownState } from "src/app/common/entities/dropdown-state";

const initialDropdownState: IDropdownState = {
  dropdown: []
};

const dropdownReducer: ActionReducer<IDropdownState, Action> = createReducer<IDropdownState>(
  initialDropdownState,
  on(setDropdownListDate,  (state, { dropdownList }) => {
    return {
      ...state,
      dropdown: [...dropdownList]
    };
  })
);

export function reducerDropdown(state: IDropdownState, action: Action): IDropdownState {
  return dropdownReducer(state, action);
}
