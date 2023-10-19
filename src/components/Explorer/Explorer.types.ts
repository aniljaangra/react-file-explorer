export interface IFile {
  type: string;
  name: string;
  meta?: string;
  data?: IFile[];
}

export interface IDirectoryProps {
  file: IFile;
}

export interface IFileExplorerProps {
  data: IFile[];
  onSelect?: () => void;
  child?: boolean;
}
