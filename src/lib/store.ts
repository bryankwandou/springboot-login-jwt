import type { Item, User } from "@/lib/types";

type AppStore = {
  users: User[];
  items: Item[];
};

declare global {
  // eslint-disable-next-line no-var
  var __jwtCrudStore: AppStore | undefined;
}

export const store: AppStore =
  globalThis.__jwtCrudStore ??
  {
    users: [],
    items: [],
  };

if (!globalThis.__jwtCrudStore) {
  globalThis.__jwtCrudStore = store;
}
