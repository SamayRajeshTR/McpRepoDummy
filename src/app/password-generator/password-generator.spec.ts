import { CHARACTER_GROUPS, CharacterGroup, generatePassword } from './password-generator';

describe('generatePassword', () => {
  const groups = Object.keys(CHARACTER_GROUPS) as CharacterGroup[];

  it('generates the requested length with every selected character type', () => {
    for (const length of [12, 20, 128]) {
      const password = generatePassword({ length, groups });
      expect(password.length).toBe(length);
      for (const group of groups) {
        expect([...password].some(character => CHARACTER_GROUPS[group].includes(character))).toBeTrue();
      }
    }
  });

  it('uses only selected character types for every non-empty combination', () => {
    for (let mask = 1; mask < 16; mask++) {
      const selected = groups.filter((_, index) => mask & (1 << index));
      const alphabet = selected.map(group => CHARACTER_GROUPS[group]).join('');
      const password = generatePassword({ length: 20, groups: selected });
      expect([...password].every(character => alphabet.includes(character))).toBeTrue();
      for (const group of selected) {
        expect([...password].some(character => CHARACTER_GROUPS[group].includes(character))).toBeTrue();
      }
    }
  });

  it('rejects invalid lengths', () => {
    for (const length of [0, 11, 129, 12.5, NaN, Infinity, null as unknown as number]) {
      expect(() => generatePassword({ length, groups })).toThrowError(/whole-number length/);
    }
  });

  it('rejects empty or unknown character selections', () => {
    for (const selection of [[], ['unknown'], ['__proto__']]) {
      expect(() => generatePassword({ length: 20, groups: selection as CharacterGroup[] }))
        .toThrowError(/character type/);
    }
  });

  it('does not duplicate character groups', () => {
    const password = generatePassword({ length: 20, groups: ['digits', 'digits'] });
    expect(password).toMatch(/^[0-9]{20}$/);
  });

  it('rejects random values that would cause modulo bias', () => {
    let calls = 0;
    spyOn(globalThis.crypto, 'getRandomValues').and.callFake(array => {
      (array as Uint32Array)[0] = calls++ === 0 ? 0xffffffff : 0;
      return array;
    });
    expect(generatePassword({ length: 12, groups: ['digits'] })).toBe('0'.repeat(12));
    expect(calls).toBe(13);
  });

  it('retries passwords missing a selected character group', () => {
    let calls = 0;
    spyOn(globalThis.crypto, 'getRandomValues').and.callFake(array => {
      (array as Uint32Array)[0] = calls++ < 12 ? 0 : calls % 36;
      return array;
    });
    const password = generatePassword({ length: 12, groups: ['lowercase', 'digits'] });
    expect(password).toMatch(/[a-z]/);
    expect(password).toMatch(/[0-9]/);
    expect(calls).toBeGreaterThan(12);
  });

  it('propagates failures instead of falling back to insecure randomness', () => {
    spyOn(globalThis.crypto, 'getRandomValues').and.throwError('Random source failed');
    expect(() => generatePassword({ length: 20, groups })).toThrowError('Random source failed');
  });
});
