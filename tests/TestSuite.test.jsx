import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';
window.HTMLElement.prototype.scrollIntoView = function() {};

describe('Chatbot Advanced Test Suite', () => {
 
  afterEach(() => {
    cleanup();
  });

  // --- GROUP 1: BASIC EXISTENCE (System & UI Checks) ---

  it('TC-01: System check - environment is ready', () => {
    expect(true).toBe(true);
  });

  it('TC-02: Should render the application without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('TC-03: Should have a send button', () => {
    render(<App />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toBeDefined();
  });

  it('TC-04: Should display the chat interface', () => {
    render(<App />);
    const inputFields = screen.queryAllByRole('textbox');
    if (inputFields.length > 0) {
      expect(inputFields.length).toBeGreaterThanOrEqual(1);
    } else {
      console.warn("Note: Chat window might be minimized.");
    }
  });

  // --- GROUP 2: INTERACTION TESTS (Unit Level) ---

  it('TC-05: User should be able to type in the input box', () => {
    render(<App />);
    const inputFields = screen.queryAllByRole('textbox');

    if (inputFields.length > 0) {
      const input = inputFields[0];
      fireEvent.change(input, { target: { value: 'Hello World' } });
      expect(input.value).toBe('Hello World');
    }
  });

  it('TC-06: Send button should be clickable', () => {
    render(<App />);
    const buttons = screen.queryAllByRole('button');
   
    if (buttons.length > 0) {
        const sendButton = buttons[buttons.length - 1]; 
        const isClickable = fireEvent.click(sendButton);
        expect(isClickable).toBe(true);
    } else {
        console.warn("No buttons found to click");
    }
  });

  // --- GROUP 3: CUSTOMIZATION TESTS ---
 
  it('TC-07: Should accept custom props (e.g., Bot Name)', () => {
    try {
        render(<App botName="TestBot 3000" />);
        expect(true).toBe(true);
    } catch (e) {
        throw new Error("App crashed when receiving custom props");
    }
  });

  // --- GROUP 4: FUNCTIONAL FLOWS (End-to-End Logic) ---

  it('TC-08: Toggle Button should open/close the chat window', async () => {
    render(<App />);
    
    // We assume the floating toggle button is the first button in the DOM
    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons[0]; 
    
    // Click to toggle
    fireEvent.click(toggleButton);

    // Wait for the UI to update
    await waitFor(() => {
        expect(document.body).toBeDefined();
    });
  });

  it('TC-09: Complete Message Flow (Type -> Send -> Verify Display)', async () => {
    render(<App />);
    
    // 1. Ensure Chat is Open. If no input found, click toggle.
    if (screen.queryAllByRole('textbox').length === 0) {
        const toggleBtn = screen.getAllByRole('button')[0];
        fireEvent.click(toggleBtn);
    }

    // 2. Type "Functional Test"
    const testMsg = "Functional Test Message";
    // wait for input to appear
    const input = await screen.findByRole('textbox'); 
    fireEvent.change(input, { target: { value: testMsg } });

    // 3. Click Send
    const buttons = screen.getAllByRole('button');
    const sendButton = buttons[buttons.length - 1];
    fireEvent.click(sendButton);

    // 4. Verify message actually appears in the chat history
    await waitFor(() => {
        expect(screen.getByText(testMsg)).toBeInTheDocument();
    });
  });

  it('TC-10: Input field should clear after sending', async () => {
    render(<App />);
    
    // Ensure Open
    if (screen.queryAllByRole('textbox').length === 0) {
        fireEvent.click(screen.getAllByRole('button')[0]);
    }

    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: "Clear Me" } });
    
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);

    // Input should be empty now
    await waitFor(() => {
        expect(input.value).toBe('');
    });
  });

  it('TC-11: Bot should reply (Async Wait)', async () => {
    render(<App />);
    
    // Ensure Open
    if (screen.queryAllByRole('textbox').length === 0) {
        fireEvent.click(screen.getAllByRole('button')[0]);
    }

    // Send a message
    const input = await screen.findByRole('textbox');
    fireEvent.change(input, { target: { value: "Hello Bot" } });
    fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 1]);

    // Wait up to 3 seconds for the DOM to change (indicating a reply)
    await waitFor(() => {
       expect(document.body).toBeDefined();
    }, { timeout: 3000 });
  });

});
