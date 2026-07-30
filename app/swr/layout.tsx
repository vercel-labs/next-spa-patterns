import { SWRConfig } from "swr";
import { getCurrentUser } from "@/lib/user";
import { USER_KEY } from "./keys";

export default function SwrLayout({ children }: LayoutProps<"/swr">) {
  return (
    <SWRConfig
      value={{
        fallback: {
          [USER_KEY]: getCurrentUser(),
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
