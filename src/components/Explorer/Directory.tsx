import React, { useContext, useState } from "react";
import { FileExplorer } from "./Explorer";
import { IDirectoryProps, IFile } from "./Explorer.types";
import ExplorerContext from "./ExplorerContext";

export const Directory: React.FC<IDirectoryProps> = ({ file }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const { selectedDir, setSelectedDir } = useContext(ExplorerContext);

  const handleFileClick = () => {
    setSelectedDir(file);
    setSelected(!selected);
  };

  return (
    <>
      <div
        className={`folder ${selectedDir === file ? "active" : "inactive"}`}
        onClick={() => handleFileClick()}
      >
        <span className="folder-icon">📁 </span>
        <span className="file-name">{file.name}</span>
      </div>
      {selected && file.data && <FileExplorer data={file.data} child />}
    </>
  );
};
