import { getCurrentUser } from "@/lib/user";
import { UserProvider } from "./user-provider";

export default function UseContextLayout({
  children,
}: LayoutProps<"/use-context">) {
  const userPromise = getCurrentUser();

  return <UserProvider userPromise={userPromise}>{children}</UserProvider>;
}
