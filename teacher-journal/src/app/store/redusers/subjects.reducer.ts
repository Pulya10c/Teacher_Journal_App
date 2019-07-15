import { ActionReducer, createReducer, on, State, Action } from "@ngrx/store";

import { ISubjectStore } from "src/app/common/entities/subjects-store";
import { MarksToChangeSubject, LoadSubject, AddSubject } from "../actions/subjects.action";

const initialStudentsState: ISubjectStore = {
  subjects: []
};

// export function subjectsReducer(state: ISubjectStore = initialStudentsState, action: SubjectsAction): ISubjectStore {
//   switch (action.type) {
//     case ActionTypesSubject.LOAD_SUBJECTS:
//       return {
//         subjects: [...action.payload]
//       };
//     case ActionTypesSubject.ADD_SUBJECT:
//       return {
//         subjects: [...action.payload]
//       };
//     case ActionTypesSubject.MARKS_TO_CHANGE_SUBJECT:
//       return {
//         subjects: [
//           ...state.subjects
//           .filter(
//             subject => subject.nameSubject !== action.payload[0].nameSubject
//           ),
//           ...action.payload
//         ]
//       };
//     default:
//       return state;
//   }
// }

const subjectsReducer: ActionReducer<any> = createReducer<ISubjectStore>(
  initialStudentsState,
  on(LoadSubject, (state, { subjectList }) => {
    return {
      ...state,
      subjects: [...subjectList]
    };
  }),
  on(AddSubject, (state, { newSubject }) => {
    return {
      ...state,
      subjects: [...state.subjects, newSubject]
    };
  }),
  on(MarksToChangeSubject, (state, { changeSubject }) => {
    return {
      ...state,
      subjects: [
        ...state.subjects
        .filter(
          subject => subject.nameSubject !== changeSubject.nameSubject
        ),
        ...changeSubject
      ]
    };
  })
);

export function reducer(state: State<ISubjectStore> | undefined, action: Action): ActionReducer<ISubjectStore> {
  return subjectsReducer(state, action);
}
