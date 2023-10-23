import { render } from "@testing-library/react";
import { Explorer, FileExplorer } from "./Explorer";

const files = [
  { name: "file1", type: "file" },
  { name: "folder1", type: "folder" },
  { name: "file2", type: "file" },
];

test("renders Explorer component without errors", () => {
  render(<Explorer data={[]} />);
});

test("renders Explorer component without errors", () => {
  const { getByRole } = render(<Explorer data={[]} />);
  const explorerElement = getByRole("list");
  expect(explorerElement).toBeInTheDocument();
});

test("renders correct number of files in FileExplorer", () => {
  const { container } = render(<FileExplorer data={files} />);
  const fileElements = container.querySelectorAll(".file");
  expect(fileElements.length).toBe(3);
});

test("renders Directory component for folder type file", () => {
  const { getByText } = render(<FileExplorer data={files} />);

  const directoryElement = getByText("folder1");

  expect(directoryElement).toBeInTheDocument();
});

test("renders File component for file type file", () => {
  const { getByText } = render(<FileExplorer data={files} />);

  const fileElement = getByText("file1");

  expect(fileElement).toBeInTheDocument();
});
