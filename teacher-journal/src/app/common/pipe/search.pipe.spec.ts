import { SearchPipe } from "./search.pipe";
import { IStudent } from "../entities/student";

describe("SearchPipe", () => {
  let pipe: SearchPipe;
  const students: IStudent[] = [
    {
      id: "5d08bea47e85e353cadda16c",
      index: 0,
      name: "Best",
      lastName: "Gross",
      address: "Baker, Orange Street, d.9166",
      about: "Officia excepteur excepteur nulla sunt aliquip duis minim ex."
    },
    {
      id: "5d08bea43f5f27fbe9f5dff9",
      index: 1,
      name: "Lester",
      lastName: "Franks",
      address: "Inkerman, Beayer Place, d.5402",
      about: "Ullamco labore occaecat nostrud magna ipsum aliqua nostrud est enim eiusmod reprehenderit adipisicing."
    },
    {
      id: "5d08bea4f975b3057ef940df",
      index: 2,
      name: "Delacruz",
      lastName: "Jenkins",
      address: "Ogema, Dodworth Street, d.4806",
      about: "Cupidatat nulla eiusmod ullamco quis nulla ut tempor nisi."
    }
  ];

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("pipe finds the string 'Franks' for the search in the source data", () => {
    const result: IStudent[] = pipe.transform(students, "Franks");
    expect(result.length).toBe(1);
    result.forEach(item => {
      expect(item.id).toBeDefined();
      expect(item.index).toBeDefined();
      expect(item.about).toBe(students[1].about);
      expect(item.address).toBe(students[1].address);
      expect(item.lastName).toBe(students[1].lastName);
      expect(item.name).toBe(students[1].name);
    });
  });

  it("pipe don't find the string 'Black' for the search in the source data", () => {
    const [ result ]: IStudent[] = pipe.transform(students, "Black");
    expect(result).toBeDefined();
    expect(result.id).toBeUndefined();
    expect(result.index).toBe(-1);
    expect(result.about).toBeUndefined();
    expect(result.address).toBeUndefined();
    expect(result.lastName).toBeUndefined();
    expect(result.name).toBeUndefined();
  });
});
