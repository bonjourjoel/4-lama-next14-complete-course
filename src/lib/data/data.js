import { DataApi } from "./dataApi";
import { DataDb } from "./dataDb";

const { DataMock } = require("./dataMock");

const FETCH_METHOD_MOCK = "mock";
const FETCH_METHOD_API = "api";
const FETCH_METHOD_DB = "db";
const FETCH_DATA_WITH = FETCH_METHOD_DB; // change method here

function createDataObject() {
  switch (FETCH_DATA_WITH) {
    case FETCH_METHOD_MOCK:
      return new DataMock();
    case FETCH_METHOD_API:
      return new DataApi();
    case FETCH_METHOD_DB:
      return new DataDb();
  }
}

export const data = createDataObject();
