import { Button } from "@heroui/button";
import { MouseEvent } from "react";

interface IPagination {
  handleStep: (e: MouseEvent<HTMLButtonElement>, step: number) => void;
  step: number;
  steps: object[];
}

export function Pagination({ handleStep, step, steps }: IPagination) {
  return (
    <div className="flex gap-10 justify-center w-full">
      <Button disabled={step === 0} onClick={(e) => handleStep(e, -1)}>
        Prev
      </Button>
      {step < steps.length - 1 ? (
        <Button
          disabled={step === steps.length - 1}
          onClick={(e) => handleStep(e, 1)}
        >
          Next
        </Button>
      ) : (
        <Button type="submit">confirm</Button>
      )}
    </div>
  );
}
