import { describe, it, expect } from 'vitest';
import { isValidEmail } from './validators';

describe('isValidEmail', () => {
    it('should return true for valid email', () => {
        expect(isValidEmail('test@example.com')).toBe(true)
    })
    it('should return false for invalid email', () => {
        expect(isValidEmail('test@.com')).toBe(false);
        expect(isValidEmail('test')).toBe(false);
        expect(isValidEmail('')).toBe(false);
    });
});