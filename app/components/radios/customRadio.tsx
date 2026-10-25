import { Radio, RadioProps, cn } from "@nextui-org/react";

export function CustomRadio({ children, ...props }: RadioProps) {
  return (
    <Radio
      {...props}
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
}
