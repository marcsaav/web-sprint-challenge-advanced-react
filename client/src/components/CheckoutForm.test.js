import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)

    const header = screen.getByText(/checkout form/i)

    expect(header).toBeTruthy()
});

test("form shows success message on submit with form details", async () => {
    render(<CheckoutForm />)

    // Identifying Form Elements
    const firstName = await screen.findByLabelText(/first name/i)
    const lastName = await screen.findByLabelText(/last name/i)
    const address = await screen.findByLabelText(/address/i)
    const city = await screen.findByLabelText(/city/i)
    const state = await screen.findByLabelText(/state/i)
    const zip = await screen.findByLabelText(/zip/i)

    // Filling out Form
    fireEvent.change(firstName, {target:{value: 'Marcos'}})
    fireEvent.change(lastName, {target:{value: 'Saavedra'}})
    fireEvent.change(address, {target:{value: '123 Bard'}})
    fireEvent.change(city, {target:{value: 'Staten Island'}})
    fireEvent.change(state, {target:{value: 'New York'}})
    fireEvent.change(zip, {target:{value: '12345'}})

    //Identifying Button and Submitting Form
    const button = screen.getByRole('button')
    fireEvent.click(button)

    //Identifying Success Message
    const successMessage = await screen.findByTestId('successMessage')

    // Making sure it contains Form Info
    expect(successMessage).toHaveTextContent(/marcos/i)
    expect(successMessage).toHaveTextContent(/saavedra/i)
    expect(successMessage).toHaveTextContent(/123 bard/i)
    expect(successMessage).toHaveTextContent(/staten island/i)
    expect(successMessage).toHaveTextContent(/new york/i)
    expect(successMessage).toHaveTextContent(/12345/i)
});
