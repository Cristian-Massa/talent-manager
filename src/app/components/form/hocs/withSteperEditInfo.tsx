"use client";

import { CareerTimeline } from "@/app/components/form/hocs/with-steper-edit-info/CareerTimeline";
import { EducationalProjects } from "@/app/components/form/hocs/with-steper-edit-info/EducationalProjects";
import { LanguagesForm } from "@/app/components/form/hocs/with-steper-edit-info/LanguagesForm";
import { MotivationTextForm } from "@/app/components/form/hocs/with-steper-edit-info/MotivationTextForm";
import { Pagination } from "@/app/components/form/hocs/with-steper-edit-info/Pagination";
import { ProfilePictureForm } from "@/app/components/form/hocs/with-steper-edit-info/ProfilePictureForm";
import { TechnologiesForm } from "@/app/components/form/hocs/with-steper-edit-info/TechnologiesForm";
import { ComponentType, MouseEvent, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function getSteps() {
  return [
    {
      title: "Motivation text",
      component: <MotivationTextForm />,
      fields: ["motivation_text"],
    },
    { title: "Languages", component: <LanguagesForm />, fields: ["languages"] },
    {
      title: "Technologies",
      component: <TechnologiesForm />,
      fields: ["technologies"],
    },
    {
      title: "Career timeline",
      component: <CareerTimeline />,
      fields: ["experiences"],
    },
    {
      title: "Educational projects",
      component: <EducationalProjects />,
      fields: ["educational_projects"],
    },
    {
      title: "Profile picture",
      component: <ProfilePictureForm />,
      fields: ["profile-photo"],
    },
    { title: "Personal data", component: <div />, fields: ["personalData"] },
  ];
}

export function withSteperEditInfo<T extends object>(
  Component: ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const methods = useForm({
      mode: "onChange",
    });
    const [step, setStep] = useState(0);

    const steps = useCallback(getSteps, [])();

    const handleStep = async (
      e: MouseEvent<HTMLButtonElement>,
      direction: number
    ) => {
      e.preventDefault();

      if (direction === 1) {
        console.log(steps[step].fields);
        const isValid = await methods.trigger(steps[step].fields);
        if (!isValid) return;
      }

      setStep((prev) => prev + direction);
    };

    const onSubmit = (value: unknown) => {
      console.log("Formulario enviado:", value);
    };

    return (
      <FormProvider {...methods}>
        <Component
          className="w-[350px]"
          {...props}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <h4 className="text-center w-full">{steps[step].title}</h4>
          {steps[step].component}
          <Pagination handleStep={handleStep} step={step} steps={steps} />
        </Component>
      </FormProvider>
    );
  };
}
