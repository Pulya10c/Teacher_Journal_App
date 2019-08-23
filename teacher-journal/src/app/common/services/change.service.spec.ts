import { TestBed } from "@angular/core/testing";

import { ChangeService } from "./change.service";
import { IDateMarksList } from "../entities/date-marks-list";
import { IStudent } from "../entities/student";
import { ISubject } from "../entities/subject";

describe("ChangeService", () => {
  let service: ChangeService;
  let testSubjects: ISubject[] = [
    {
      id: "5d08d837790ddb4d92553bda",
      index: 0,
      nameSubject: "Physics",
      teacher: "Alicia Gilbert",
      cabinet: 26,
      description: "Ut magna ex ipsum commodo quis fugiat in et reprehenderit adipisicing.",
      marks: []
    },
    {
      id: "5d08d837f33d83a109a31128",
      index: 1,
      nameSubject: "Chemistry",
      teacher: "mr. Richardson",
      cabinet: 25,
      description: "Id ut aute minim consequat cupidatat sit adipisicing cupidatat enim consectetur voluptate dolor commodo anim.",
      marks: []
    },
    {
      id: "5d08d837d6d3502487c148bd",
      index: 2,
      nameSubject: "Biology",
      teacher: "Todd Maxwell",
      cabinet: 15,
      description: "Magna adipisicing minim minim aliquip culpa aute dolore consectetur.",
      marks: []
    }
  ];
  let testDateMarksList: IDateMarksList[] = [
    {
      date: 1550091600000,
      students: [
        {
          id: "5d08bea47e85e353cadda16c",
          mark: 10
        },
        {
          id: "5d08bea43f5f27fbe9f5dff9",
          mark: 10
        },
        {
          id: "1c552ae0-a214-11e9-bdcb-47152525a2b6",
          mark: 5
        },
        {
          id: "3d7d0a40-aeb1-11e9-83ed-3747c1ac6a27",
          mark: 2
        },
        {
          id: "df49d460-a499-11e9-b91b-3bbbae8333b6",
          mark: 4
        }
      ]
    },
    {
      date: 1551301200000,
      students: [
        {
          id: "5d08bea4f975b3057ef940df",
          mark: 9
        },
        {
          id: "f5fad6d0-a185-11e9-9e3f-617ba75c1b95",
          mark: 5
        },
        {
          id: "1c552ae0-a214-11e9-bdcb-47152525a2b6",
          mark: 8
        },
        {
          id: "cd0da930-adf8-11e9-9616-7906bb812c3b",
          mark: 9
        }
      ]
    },
    {
      date: 1555189200000,
      students: [
        {
          id: "5d08bea47e85e353cadda16c",
          mark: 1
        },
        {
          id: "5d08bea47d78c8449f01c08c",
          mark: 1
        },
        {
          id: "f5fad6d0-a185-11e9-9e3f-617ba75c1b95",
          mark: 9
        },
        {
          id: "5d08bea4f975b3057ef940df",
          mark: 10
        },
        {
          id: "0ed2c810-aeb1-11e9-a09b-3dc3fc5d6b09",
          mark: 10
        }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ChangeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("checking the 'changeMark' method ", () => {
    const date: number = 1551301200000;
    const id: string[] = [
      "5d08bea4f975b3057ef940df",
      "f5fad6d0-a185-11e9-9e3f-617ba75c1b95",
      "1c552ae0-a214-11e9-bdcb-47152525a2b6",
      "cd0da930-adf8-11e9-9616-7906bb812c3b"
    ];
    const newMark: number[] = [7, 6, 5, 4];
    id.forEach((student, idx) => {
      testDateMarksList = service.changeMark(testDateMarksList, date, student, newMark[idx]);
      const result: number = testDateMarksList[1].students[idx].mark;
      expect(result).toEqual(newMark[idx]);
    });
  });

  it("checking the 'addNewStudent' method ", () => {
    const keys: string[] = ["index", "name", "lastName", "address", "about", "id"];
    const index: number = 7;
    const name: string = "Ivan";
    const lastName: string = "Ivanov";
    const address: string = "Minsk";
    const about: string = "This is bed student";
    const student: IStudent = service.addNewStudent(index, { name, lastName, address, about });
    keys.forEach(key => {
      expect(student.hasOwnProperty(key)).toBeTruthy();
    });
  });

  it("checking the 'addNewSubject' method refusal to create an existing subject", () => {
    const keys: string[] = ["index", "nameSubject", "teacher", "cabinet", "description", "id"];
    const existingSubject: any = {
      nameSubject: "Physics",
      teacher: "Alicia Gilbert",
      cabinet: 26,
      description: "Ut magna ex ipsum commodo quis fugiat in et reprehenderit adipisicing.",
    };
    const data: { subject: ISubject; isAdd: boolean; } = service.addNewSubject(testSubjects, existingSubject);
    keys.forEach(key => {
      expect(data.subject.hasOwnProperty(key)).toBeTruthy();
    });
    expect(data.isAdd).toBeFalsy();
  });

  it("checking the 'addNewSubject' method refusal to create an new subject", () => {
    const keys: string[] = ["index", "nameSubject", "teacher", "cabinet", "description", "id"];
    const newSubject: any = {
      nameSubject: "Literature",
      teacher: "Selma Pope",
      cabinet: 20,
      description: "Cupidatat in mollit magna qui ea minim.",
    };
    const data: { subject: ISubject; isAdd: boolean; } = service.addNewSubject(testSubjects, newSubject);
    keys.forEach(key => {
      expect(data.subject.hasOwnProperty(key)).toBeTruthy();
    });
    expect(data.isAdd).toBeTruthy();
  });
});
