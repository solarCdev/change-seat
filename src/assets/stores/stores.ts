import { writable, type Writable } from "svelte/store";

export type TypeEnum = "personal" | "duo" | "group" | "free" | "unselected";

export type Setting = {
  type: TypeEnum;
  primaryCnt: number;
  secondaryCnt: number;
  studentStartNum: number;
  studentEndNum: number;
  studentExcept: number[];
  wait?: boolean;
};

export type Seat = {
  type: TypeEnum;
  num: number;
};

export type Seats = {
  duo: Seat[][][];
  mono: Seat[][];
  type: TypeEnum;
};

export let resultArr: Writable<Seats> = writable({
  duo: [[[]]],
  mono: [[]],
  type: "unselected",
});

export let setting: Writable<Setting> = writable({
  type: "personal",
  primaryCnt: 1,
  secondaryCnt: 1,
  studentStartNum: 1,
  studentEndNum: 1,
  studentExcept: [],
  wait: true,
});
