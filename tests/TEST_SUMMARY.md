# 🧪 Software Testing Report: Custom Chatbot

**Project Name:** Customizable Chatbot (NPM Package)  
**Date:** 04 December 2025  
**Testing Framework:** Vitest / React Testing Library  
**Status:** ✅ **ALL TESTS PASSED (11/11 Checks)**

---

## 1. Testing Overview
This document details the quality assurance process for the Chatbot component. The objective was to validate both the **Structural Integrity** (Unit Tests) and the **Conversation Logic** (Functional Tests).

### 1.1 Scope
| Scope | Description |
| :--- | :--- |
| **Unit Testing** | Verifying component mounting, button existence, and prop stability. |
| **Functional Testing** | Simulating the full user journey: Opening chat, typing, sending, and receiving replies. |

---

## 2. Test Cases & Results

| ID | Type | Test Case | Description | Result |
| :--- | :--- | :--- | :--- | :---: |
| **TC-01** | System | Environment Check | Verifies Vitest/JSDOM is ready. | ✅ PASS |
| **TC-02** | Unit | Component Render | Ensures `<App />` mounts into the DOM. | ✅ PASS |
| **TC-03** | Unit | Send Button Check | Verifies the "Send" button exists. | ✅ PASS |
| **TC-04** | Unit | UI Interface Check | Verifies chat interface elements load. | ✅ PASS |
| **TC-05** | Unit | Typing Simulation | Ensures input field accepts text. | ✅ PASS |
| **TC-06** | Unit | Click Simulation | Ensures buttons are clickable. | ✅ PASS |
| **TC-07** | Unit | Custom Props | Ensures custom settings (e.g., Bot Name) work. | ✅ PASS |
| **TC-08** | **Func** | **Toggle State** | **Simulates clicking the floating icon to Open/Close chat.** | ✅ PASS |
| **TC-09** | **Func** | **Message Flow** | **Types text and clicks send; verifies message appears in history.** | ✅ PASS |
| **TC-10** | **Func** | **Input State** | **Verifies input box clears automatically after sending.** | ✅ PASS |
| **TC-11** | **Func** | **Bot Reply** | **Waits for asynchronous bot response after user message.** | ✅ PASS |

---

## 3. Execution Log
```bash
PS C:\Users\mohsi\custom-chatbot> npm run test

> @gauravrathod674/super-customizable-chatbot@1.12.9 test
> vitest

 ✓ src/TestSuite.test.jsx (11 tests) 1.24s
   ✓ Chatbot Advanced Test Suite (11)
     ✓ TC-01: System check - environment is ready
     ✓ TC-02: Should render the application without crashing
     ✓ TC-03: Should have a send button
     ✓ TC-04: Should display the chat interface
     ✓ TC-05: User should be able to type in the input box
     ✓ TC-06: Send button should be clickable
     ✓ TC-07: Should accept custom props
     ✓ TC-08: Toggle Button should open/close the chat window
     ✓ TC-09: Complete Message Flow (Type -> Send -> Verify Display)
     ✓ TC-10: Input field should clear after sending
     ✓ TC-11: Bot should reply (Async Wait)

 Test Files  1 passed (1)
      Tests  11 passed (11)
   Start at  20:10:05
   Duration  2.74s
