import { VisibilityDirective } from "./visibility.directive";

describe("VisibilityDirective", () => {
  it("should create an instance", () => {
    const directive: VisibilityDirective = new VisibilityDirective(1 , 2);
    expect(directive).toBeTruthy();
  });
});
