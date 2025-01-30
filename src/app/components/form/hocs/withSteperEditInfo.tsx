"use client";

import { LanguagesForm } from "@/app/components/form/hocs/with-steper-edit-info/LanguagesForm";
import { MotivationTextForm } from "@/app/components/form/hocs/with-steper-edit-info/MotivationTextForm";
import { Pagination } from "@/app/components/form/hocs/with-steper-edit-info/Pagination";
import { ComponentType, MouseEvent, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function getSteps() {
  return [
    { title: "Motivation text", component: <MotivationTextForm /> },
    { title: "Languages", component: <LanguagesForm /> },
    { title: "Technologies", component: <div /> },
    { title: "Career timeline", component: <div /> },
    { title: "Educational projects", component: <div /> },
    { title: "Profile picture", component: <div /> },
    { title: "Personal data", component: <div /> },
  ];
}

export function withSteperEditInfo<T extends object>(
  Component: ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const methods = useForm({
      mode: "onSubmit",
    });
    const [step, setStep] = useState(0);

    const steps = useCallback(getSteps, [])();

    function handleStep(e: MouseEvent<HTMLButtonElement>, step: number) {
      e.preventDefault();
      setStep((prev) => prev + step);
    }
    function onSubmit(value: unknown) {
      console.log(value);
    }
    return (
      <FormProvider {...methods}>
        <Component
          className="w-[350px]"
          {...props}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h3>{steps[step].title}</h3>
          {steps[step].component}
          <Pagination handleStep={handleStep} step={step} steps={steps} />
        </Component>
      </FormProvider>
    );
  };
}
