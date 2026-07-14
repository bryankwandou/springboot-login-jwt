import { hashSync } from "bcryptjs";
import type { Item, User } from "@/lib/types";

type AppStore = {
  users: User[];
  items: Item[];
};

declare global {
  // eslint-disable-next-line no-var
  var __jwtCrudStore: AppStore | undefined;
}

const seededUser: User = {
  id: crypto.randomUUID(),
  email: "admin@example.com",
  passwordHash: hashSync("admin123", 10),
  createdAt: new Date().toISOString(),
};

export const store: AppStore =
  globalThis.__jwtCrudStore ??
  {
    users: [seededUser],
    items: [],
  };

if (!globalThis.__jwtCrudStore) {
  globalThis.__jwtCrudStore = store;
}
