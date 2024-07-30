import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { Button } from "../../src/components/Button";

test("Render clickable button", async() => {
    render(
        <Button>
            My button
        </Button>
    );

    await userEvent.click(screen.getByText("Load Greeting"));
    await screen.findByRole("heading");

    expect(screen.getByRole("heading")).toHaveTextContent("hello there");
    expect(screen.getByRole("button")).toBeDisabled();
});
