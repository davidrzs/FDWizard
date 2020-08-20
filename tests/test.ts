import {functionalDependency, closure} from "../src/index";

import {sameArray,merge} from "../src/helper";

test("Testing closure", () => {

  let dependencies1 = [
        {
           left: ["A"], right:["B"]
        },
        {
            left: ["B"], right:["C"]
        },
        {
            left: ["A","C"], right:["D"]
        }
    ];

    let dependencies2 = [
      {
         left: ["A"], right:["B","C"]
      },
      {
          left: ["D","E"], right:["B","C"]
      },
      {
          left: ["C"], right:["D"]
      }
  ];

  expect(sameArray(closure(["A"],dependencies1),["A","B","C","D"])).toBeTruthy();
  expect(sameArray(closure(["A"],dependencies2),["A","B","C","D"])).toBeTruthy();
  expect(sameArray(closure(["C"],dependencies2),["C","D"])).toBeTruthy();

});

test("Testing merge", () => {
  
  expect(sameArray(merge(["A","B","C"],["B","A","C"]),["A","B","C"])).toBeTruthy();
  expect(sameArray(merge(["A","B","C"],["C","D"]),["A","B","C","D"])).toBeTruthy();

});


test("Testing sameArray", () => {
  
  expect(sameArray(["A","B","C"],["B","A","C"])).toBeTruthy();
  expect(!sameArray(["A","B","C"],[,"A","C"])).toBeTruthy();
  expect(sameArray([],[])).toBeTruthy();

});
