import React from "react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";

export const CustomRadio = (props:any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[200px] cursor-pointer rounded-lg gap-3 p-2 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

