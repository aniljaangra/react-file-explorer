import { createContext } from "react";

const ExplorerContext = createContext({
  selectedDir: {},
  setSelectedDir: (file: any) => {},
});
export default ExplorerContext;
