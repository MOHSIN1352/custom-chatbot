import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Automatically clean up the virtual screen after each test
afterEach(() => {
  cleanup();
});