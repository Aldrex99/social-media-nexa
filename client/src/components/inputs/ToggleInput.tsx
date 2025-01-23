import { Switch } from "@headlessui/react";

type TToggleInputProps = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  label: string;
};

export function ToggleInput({ checked, setChecked, label }: TToggleInputProps) {
  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-red-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 data-[checked]:bg-green-500 data-[checked]:focus:ring-green-500"
    >
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none relative inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in group-data-[checked]:opacity-0 group-data-[checked]:duration-100 group-data-[checked]:ease-out"
        >
          <svg fill="none" viewBox="0 0 12 12" className="size-3 text-red-500">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex size-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[checked]:opacity-100 group-data-[checked]:duration-200 group-data-[checked]:ease-in"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 12 12"
            className="size-3 text-green-500"
          >
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
  );
}
