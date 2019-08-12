import { ActionCreator, createAction, props } from "@ngrx/store";

import { TypedAction } from "@ngrx/store/src/models";
import { IDropdown } from "src/app/common/entities/dropdown";

export const setDropdownListDate: ActionCreator<
  string,
  (props: { dropdownList: IDropdown[] }) => { dropdownList: IDropdown[] } & TypedAction<string>
> = createAction("[Subjects] Set Dropdown List Dates and Subjects", props<{ dropdownList: IDropdown[] }>());
