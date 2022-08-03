import { ServerAPI, ServerResult } from "./Server";

import items from "./data.json";
import { IItem, IPerson, IScanner } from "../interfaces";

export default class DummyServer implements ServerAPI {
  async loadScanners(): Promise<ServerResult<IScanner[]>> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            new ServerResult(
              [
                { id: "norm", name: "standard" },
                { id: "4bits", name: "4bits mirror" },
                { id: "pcprox", name: "pcProx" },
              ],
              null
            )
          ),
        500
      );
    });
  }

  async loadItems(): Promise<ServerResult<IItem[]>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new ServerResult(items, null)), 500);
    });
  }

  sell(): ServerResult<string> {
    return new ServerResult("OK", null);
  }

  async findPerson(input: string): Promise<ServerResult<IPerson>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (input === "3890" || input === "normalni") {
          resolve(
            new ServerResult(
              {
                id: 3890,
                fullname: "Mgr. Zdeněk Machač",
                money: 150,
                ctecka: "normalni",
              },
              null
            )
          );
        } else {
          resolve(new ServerResult<IPerson>(null, "nenalezeno"));
          alert("ID nenalezeno");
        }
      }, 500);
    });
  }
}
