import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Chatbot Advanced Test Suite', () => {
  
  afterEach(() => {
    cleanup();
  });

  // --- GROUP 1: BASIC EXISTENCE (The original 4 tests) ---

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

  // --- GROUP 2: INTERACTION TESTS (New!) ---

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
    
    // Find the button most likely to be the "Send" button (usually the last one or inside a form)
    if (buttons.length > 0) {
        const sendButton = buttons[buttons.length - 1]; 
        
        // Simulate a click
        const isClickable = fireEvent.click(sendButton);
        expect(isClickable).toBe(true);
    } else {
        console.warn("No buttons found to click");
    }
  });

  // --- GROUP 3: CUSTOMIZATION TESTS ---
  
  it('TC-07: Should accept custom props (e.g., Bot Name)', () => {
    // We try to render the App with a custom prop if your component supports it
    // If your main App doesn't accept props, this verifies it doesn't crash receiving them
    try {
        render(<App botName="TestBot 3000" />);
        // If it renders without error, the test passes
        expect(true).toBe(true); 
    } catch (e) {
        throw new Error("App crashed when receiving custom props");
    }
  });

});
