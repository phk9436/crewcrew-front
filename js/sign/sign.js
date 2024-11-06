import { signStep1 } from "./signStep1.js";

export let signStep = 1;

export const signFunc = () => {
  signStep === 1 && signStep1(signStep);
}