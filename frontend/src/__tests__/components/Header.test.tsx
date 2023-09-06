import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Header from "../../components/Header";
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderer from "react-test-renderer";

afterEach(() => {
    cleanup();
})

describe("Correctly renders elements", () => {
    it("'Graph Nesta' renders", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        expect(screen.getByText("Graph Nesta")).toBeInTheDocument();
    });

    it("Hamburger menu appears, is clickable, and reveals extra content", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        userEvent.click(screen.getByTestId("hamburgerMenu"));
        expect(screen.getByText("Logg inn")).toBeInTheDocument();
        expect(screen.getByText("Mine problem")).toBeInTheDocument();
        expect(screen.getByText("Nytt problem")).toBeInTheDocument();
        expect(screen.getByText("Søk")).toBeInTheDocument();
    });

});

it("Matches snapshot", () => {
    const snapshot = renderer.create(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    ).toJSON();
    expect(snapshot).toMatchSnapshot();
})