import tsLogo from "../../assets/ts-file-icon.svg";
import jsLogo from "../../assets/js-file-icon.svg";
import htmlLogo from "../../assets/html-file-icon.svg";
import pngLogo from "../../assets/png-file-icon.svg";
import svgLogo from "../../assets/svg-file-icon.svg";
import webpLogo from "../../assets/webp-file-icon.svg";
import otherLogo from "../../assets/other-file-icon.svg";
import { IFile } from "./Explorer.types";
import React, { useState } from "react";

const logos = {
  svg: svgLogo,
  ts: tsLogo,
  js: jsLogo,
  html: htmlLogo,
  png: pngLogo,
  webp: webpLogo,
};

export const FileIcon: React.FC<{ fileType?: string }> = ({ fileType }) => {
  let icon = (
    <img
      src={logos[fileType as keyof typeof logos] || otherLogo}
      width={20}
      height={20}
      alt="File Icon"
    />
  );
  return <span className="file-icon">{icon}</span>;
};

export const File: React.FC<{ file: IFile }> = ({ file }) => {
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
  };

  const handleContextMenuClick = (action: string) => {
    console.log(`File: ${file.name}, Action: ${action}`);
    setContextMenuPosition({ top: 0, left: 0 });
  };

  const renderContextMenu = () => {
    if (!contextMenuPosition.top) return null;

    return (
      <div
        className="context-menu"
        style={{ top: contextMenuPosition.top, left: contextMenuPosition.left }}
      >
        <div onClick={() => handleContextMenuClick("rename")}>Rename</div>
        <div onClick={() => handleContextMenuClick("delete")}>Delete</div>
        <div onClick={() => handleContextMenuClick("copy")}>Copy</div>
      </div>
    );
  };
  return (
    <div onContextMenu={handleContextMenu}>
      <FileIcon fileType={file.meta} />
      <span className="file-name">{file.name}</span>
      {renderContextMenu()}
    </div>
  );
};
