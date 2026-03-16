import { DefaultSession } from "next-auth";
import { User } from "./userType";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
    accessToken?: string;
  }

  interface JWT {
    user?: User;
    accessToken?: string;
  }
}
