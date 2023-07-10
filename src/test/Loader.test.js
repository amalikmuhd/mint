/**
 *  Testing Loader component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../components/Loader";

describe("Loader component", () => {
  it("Show loader", () => {
    render(<Loader />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("The loader should have the correct CSS classes", () => {
    render(<Loader />);
    const loader = screen.getByTestId("loader");
    expect(loader).toHaveClass("loaderContainer");

    const loader2 = screen.getByTestId("lds-ring");
    expect(loader2).toHaveClass("lds-ring");
  });
});
