import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import CategoryButton from "../../components/CategoryButton";
import renderer from "react-test-renderer";

afterEach(() => {
    cleanup();
});

it("Component renders correctly", () => {
    render(
        <CategoryButton 
            text="This is test category :^)" 
            focused="Yes" 
            onClick={() => {}}
        />
    );

    const categoryText = screen.getByTestId("categoryText");
    expect(categoryText).toBeInTheDocument();
});

it("Component reacts to click events", () => {
    let testVariable: number = 0;

    render(
        <CategoryButton 
            text="This is test category :^)" 
            focused="Yes" 
            onClick={() => { testVariable = 1; }}
        />
    );
    const button = screen.getByTestId("categoryButton");
    button.click();
    expect(testVariable).toEqual(1);
});

it("Matches snapshot", () => {
    const snapshot = renderer.create(<CategoryButton
        text="Oh snap!"
        focused="I guess"
        onClick={() => {}}
    />).toJSON();
    expect(snapshot).toMatchSnapshot();
});
