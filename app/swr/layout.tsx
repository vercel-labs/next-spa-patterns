import { SWRConfig } from "swr";
import { getUser } from "@/lib/user";
import { USER_KEY } from "./keys";

export default function SwrLayout({ children }: LayoutProps<"/swr">) {
  return (
    <SWRConfig
      value={{
        fallback: {
          [USER_KEY]: getUser(),
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
