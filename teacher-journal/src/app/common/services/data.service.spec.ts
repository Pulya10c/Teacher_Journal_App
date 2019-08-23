import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { DataService } from "./data.service";

describe("DataService", () => {
  let service: DataService;
  let backend: HttpTestingController;
  let mockData: { name: string[] };

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    })));

  beforeEach(() => {
    service = TestBed.get(DataService);
    backend = TestBed.get(HttpTestingController);
    mockData = { name: ["students", "subjects", "statistics", "export"] };
  });

  afterEach(() => {
    backend.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("method 'getNamePanel' should return an array of button names for Panel", () => {
    service.getNamePanel("/assets/panel-name").subscribe(data => {
      expect(data).toEqual(mockData.name);
    });
    const req: TestRequest = backend.expectOne({
      url: "/assets/panel-name"
    });
    req.flush(mockData);
    expect(req.request.method).toEqual("GET");
  });
});
