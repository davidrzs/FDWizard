import {
  functionalDependency,
  candidateKeys,
  closure,
  minimalBasis
} from "../src/index";

import {
  sameArray,
  powerSet,
  merge
} from "../src/helper";

test("Testing closure", () => {

  let dependencies1 = [{
      left: ["A"],
      right: ["B"]
    },
    {
      left: ["B"],
      right: ["C"]
    },
    {
      left: ["A", "C"],
      right: ["D"]
    }
  ];

  let dependencies2 = [{
      left: ["A"],
      right: ["B", "C"]
    },
    {
      left: ["D", "E"],
      right: ["B", "C"]
    },
    {
      left: ["C"],
      right: ["D"]
    }
  ];

  expect(sameArray(closure(["A"], dependencies1), ["A", "B", "C", "D"])).toBeTruthy();
  expect(sameArray(closure(["A"], dependencies2), ["A", "B", "C", "D"])).toBeTruthy();
  expect(sameArray(closure(["C"], dependencies2), ["C", "D"])).toBeTruthy();

});

test("Testing merge", () => {

  expect(sameArray(merge(["A", "B", "C"], ["B", "A", "C"]), ["A", "B", "C"])).toBeTruthy();
  expect(sameArray(merge(["A", "B", "C"], ["C", "D"]), ["A", "B", "C", "D"])).toBeTruthy();

});


test("Testing sameArray", () => {

  expect(sameArray(["A", "B", "C"], ["B", "A", "C"])).toBeTruthy();
  expect(!sameArray(["A", "B", "C"], [, "A", "C"])).toBeTruthy();
  expect(sameArray([], [])).toBeTruthy();

});


test("Testing minimalBasis", () => {

  let dependencies1 = [{
      left: ["A", "B"],
      right: ["C"]
    },
    {
      left: ["B"],
      right: ["A"]
    }
  ];

  let dependencies2 = [{
      left: ["E"],
      right: ["G"]
    },
    {
      left: ["G"],
      right: ["S"]
    }, {
      left: ["E"],
      right: ["S"]
    }
  ];


  let mb1 = minimalBasis(dependencies1);
  console.log(mb1);
  expect(mb1.length).toBe(2);

  expect(mb1).toContainEqual({
    "left": ["B"],
    "right": ["C"]
  });

  expect(mb1).toContainEqual({
    "left": ["B"],
    "right": ["A"]
  });



  let mb2 = minimalBasis(dependencies2);
  console.log(mb2);
  expect(mb2.length).toBe(2);

  expect(mb2).toContainEqual({
    "left": ["E"],
    "right": ["G"]
  });

  expect(mb2).toContainEqual({
    "left": ["G"],
    "right": ["S"]
  });

});

test("Testing minimalBasis2", () => {

  let dependencies = [{
      left: ["A"],
      right: ["B","C"]
    },
    {
      left: ["C"],
      right: ["D","A"]
    },
    {
      left: ["E"],
      right: ["A","B","C"]
    },
    {
      left: ["F"],
      right: ["C","D"]
    }, {
      left: ["C","D"],
      right: ["B","E","F"]
    }
  ];


  let mb1 = minimalBasis(dependencies);
  console.log(mb1);
  
  expect(mb1.length).toBe(4);

  expect(mb1).toContainEqual({
    "left": ["A"],
    "right": ["C"]
  });

  expect(mb1).toContainEqual({
    "left": ["E"],
    "right": ["A"]
  });

  expect(mb1).toContainEqual({
    "left": ["F"],
    "right": ["C","D"]
  });

  expect(mb1).toContainEqual({
    "left": ["C"],
    "right": ["B","E","F"]
  });


});


test("Testing powerSet", () => {

  let ps = powerSet(["A","B","C"]).map((e) => e.sort()).sort();


  console.log(ps);

  expect(ps.length).toEqual(8);

  expect(ps).toContainEqual(["A"]);
  expect(ps).toContainEqual([]);
  expect(ps).toContainEqual(["A","C"]);
  expect(ps).toContainEqual(["A","B","C"]);

});


test("Testing candidate keys", () => {

  let dependencies = [{
      left: ["A"],
      right: ["B","C"]
    },
    {
      left: ["C"],
      right: ["D","A"]
    },
    {
      left: ["E"],
      right: ["A","B","C"]
    },
    {
      left: ["F"],
      right: ["C","D"]
    }, {
      left: ["C","D"],
      right: ["B","E","F"]
    }
  ];


  let cK = candidateKeys(["A","B","C","D","E","F"],dependencies);
  
  console.log(cK);
  
  expect(cK.sort().join("") == [["A"],["C"],["E"],["F"]].join("")).toBeTruthy();

 


});