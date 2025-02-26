"use client";

import { Switch } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";

export default function HeadlessSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      dir="ltr"
      checked={enabled}
      onChange={setEnabled}
      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary"
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
    </Switch>
  );
}
