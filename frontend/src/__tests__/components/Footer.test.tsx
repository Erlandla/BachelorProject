import React from "react";
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from "../../components/Footer";
import renderer from "react-test-renderer";

afterEach(() => {
    cleanup();
})

it("Footer renders correctly", () => {
    render(<Footer />)
    // Note: test will fail if text gets changed
    expect(screen.getByText("Laget av snille gutter fra NTNU ♥️")).toBeInTheDocument();
});

it("'Tilbake til toppen'-button is clickable", () => {
    render(<Footer />)
    // Note: test will fail if text gets changed
    userEvent.click(screen.getByText("Tilbake til toppen"));
});

it("Matches snapshot", () => {
    const snapshot = renderer.create(<Footer/>).toJSON();
    expect(snapshot).toMatchSnapshot();
});