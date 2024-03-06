import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-base font-bold text-black-default">
      <Spinner label="Loading Data..." color="warning" />

      </div>
    </div>
  );
}
