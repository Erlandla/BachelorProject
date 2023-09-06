import React from "react";
import { cleanup, render, screen } from '@testing-library/react';
import { User } from "../../types/types";
import SubInfoComponent from "../../components/SubInfoComponent";
import renderer from "react-test-renderer";

const userValidInfo: User = {
    email: "testmail@testkommune.no",
    telephone: "111 22 333",
    affiliation: "Test kommune"
};
const userInvalidMail: User = {
    email: "hmmmmmmmm",
    telephone: "111 22 333",
    affiliation: "Test kommune"
};
const userInvalidPhone: User = {
    email: "testmail@testkommune.no",
    telephone: "11",
    affiliation: "Test kommune"
};

beforeEach(() => {
    cleanup();
});

it("Renders with valid props data", () => {
    render(
        <SubInfoComponent 
            email={userValidInfo.email} 
            telephone={userValidInfo.telephone} 
            affiliation={userValidInfo.affiliation} 
        />
    );
    expect(screen.getByText("+47 111 22 333")).toBeInTheDocument();
});

it("Throws an error on invalid email", () => {
    render(
        <SubInfoComponent 
            email={userInvalidMail.email} 
            telephone={userInvalidMail.telephone} 
            affiliation={userInvalidMail.affiliation} 
        />
    )
    expect(screen.getByText("En feil oppstod: Error: Ugyldig email"))
});

it("Throws an error on invalid phone number", () => {
    render(
        <SubInfoComponent 
            email={userInvalidPhone.email} 
            telephone={userInvalidPhone.telephone} 
            affiliation={userInvalidPhone.affiliation} 
        />
    );
    expect(screen.getByText("En feil oppstod: Error: Ugyldig telefonnummer"))
});

it("Matches snapshot", () => {
    const snapshot = renderer.create(
        <SubInfoComponent 
            email={userValidInfo.email}
            telephone={userValidInfo.telephone}
            affiliation={userValidInfo.affiliation}
        />
    );
    expect(snapshot).toMatchSnapshot();
})