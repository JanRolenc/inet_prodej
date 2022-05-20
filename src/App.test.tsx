import React from "react";
import { render, screen } from "@testing-library/react";
import InetProdej from "./InetProdej";

test("renders learn react link", () => {
  render(<InetProdej />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
