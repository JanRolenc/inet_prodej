import { ServerAPI, ServerResult } from "./Server";

import items from "./data.json";
import { IItem } from "../interfaces";

export default class DummyServer implements ServerAPI {
  async loadItems(): Promise<ServerResult<IItem[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(items, null)), 500);
    });
  }

  sell(): ServerResult<string> {
    return new ServerResult("OK", null);
  }

  findPerson(input: string): ServerResult<string> {
    if (input === "3890") {
      return new ServerResult("Mgr. Zdeněk Machač", null);
    }

    return new ServerResult<string>(null, "nenalezeno");
  }
}
