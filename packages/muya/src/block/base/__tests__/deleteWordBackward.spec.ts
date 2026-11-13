import { describe, expect, it } from 'vitest';
import { wordBeforeLength } from '../content';

describe('wordBeforeLength (Ctrl+Backspace)', () => {
    it.each([
        ['foo bar', 3],
        ['foo bar ', 4],
        ['foo   ', 6],
        ['**bold**', 8],
        ['line one\n', 0],
        ['line one\nword', 4],
        ['', 0],
    ])('%j -> %i', (before, length) => {
        expect(wordBeforeLength(before)).toBe(length);
    });
});
