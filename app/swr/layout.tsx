import { SWRConfig } from "swr";
import { getCurrentUser } from "@/lib/user";
import { userCache } from "./user-cache";

export default function SwrLayout({ children }: LayoutProps<"/swr">) {
  return (
    <SWRConfig
      value={{
        fallback: {
          [userCache.key]: getCurrentUser(),
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
