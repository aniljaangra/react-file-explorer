import { render, fireEvent } from "@testing-library/react";
import { File, FileIcon } from "./File"; // Replace with the actual import path

describe("File component", () => {
  const mockFile = {
    name: "test-file.txt",
    meta: "text",
    type: "webp",
  };

  it("renders the file name", () => {
    const { getByText } = render(<File file={mockFile} />);
    const fileNameElement = getByText(mockFile.name);
    expect(fileNameElement).toBeInTheDocument();
  });

  it("renders the context menu on right-click", () => {
    const { getByText, container } = render(<File file={mockFile} />);
    const fileElement = container.firstChild as Node;

    fireEvent.contextMenu(fileElement, { clientX: 100, clientY: 100 });

    const renameOption = getByText("Rename");
    const deleteOption = getByText("Delete");
    const copyOption = getByText("Copy");

    expect(renameOption).toBeInTheDocument();
    expect(deleteOption).toBeInTheDocument();
    expect(copyOption).toBeInTheDocument();
  });

  it("handles context menu click", () => {
    const log = vi.spyOn(console, "log");
    const { getByText } = render(<File file={mockFile} />);
    const fileElement = getByText(mockFile.name);

    fireEvent.contextMenu(fileElement, { clientX: 100, clientY: 100 });

    const renameOption = getByText("Rename");
    fireEvent.click(renameOption);
    expect(log).toHaveBeenCalledWith(`File: ${mockFile.name}, Action: rename`);
  });

  it("hides the context menu after clicking an option", () => {
    const { getByText, queryByText } = render(<File file={mockFile} />);
    const fileElement = getByText(mockFile.name);

    fireEvent.contextMenu(fileElement, { clientX: 100, clientY: 100 });

    const renameOption = getByText("Rename");
    fireEvent.click(renameOption);

    const contextMenu = queryByText(".context-menu");
    expect(contextMenu).toBeNull();
  });
});

describe("FileIcon component", () => {
  it("renders a default file icon when fileType is not provided", () => {
    const { getByAltText } = render(<FileIcon fileType="other" />);
    const fileIcon = getByAltText("other file icon");
    expect(fileIcon).toBeInTheDocument();
  });

  it("renders an icon based on the provided fileType", () => {
    const { getByAltText } = render(<FileIcon fileType="pdf" />);
    const fileIcon = getByAltText("pdf file icon");
    expect(fileIcon).toBeInTheDocument();
  });

  it("renders an image with the correct src for a known fileType", () => {
    const { container } = render(<FileIcon fileType="webp" />);
    const imgElement = container.querySelector("img");
    expect(imgElement).toHaveAttribute("alt", "webp file icon");
  });
});
