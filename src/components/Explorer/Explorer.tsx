import React, { createContext, memo, useState, useMemo } from "react";
import { Directory } from "./Directory";
import { File } from "./File";
import "./Explorer.css";
import { IFileExplorerProps } from "./Explorer.types";
import ExplorerContext from "./ExplorerContext";

export const Explorer: React.FC<IFileExplorerProps> = ({ data }) => {
  const [selectedDir, setSelectedDir] = useState({});
  const context = useMemo(
    () => ({ selectedDir, setSelectedDir }),
    [selectedDir, setSelectedDir]
  );
  return (
    <ExplorerContext.Provider value={context}>
      <FileExplorer data={data} />
    </ExplorerContext.Provider>
  );
};

export const FileExplorer: React.FC<IFileExplorerProps> = memo(
  ({ data: files, child = false }) => {
    return (
      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index} className={`${child && "ml"} file`}>
            {file.type === "folder" ? (
              <Directory file={file} />
            ) : (
              <File file={file} />
            )}
          </li>
        ))}
      </ul>
    );
  }
);
