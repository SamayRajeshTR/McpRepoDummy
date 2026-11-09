export const CHARACTER_GROUPS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?',
};

export type CharacterGroup = keyof typeof CHARACTER_GROUPS;

export interface PasswordOptions {
  length: number;
  groups: CharacterGroup[];
}

export function generatePassword({ length, groups }: PasswordOptions): string {
  if (!Number.isInteger(length) || length < 12 || length > 128) {
    throw new Error('Choose a whole-number length between 12 and 128.');
  }
  if (!groups.length || groups.some(group => !Object.hasOwn(CHARACTER_GROUPS, group))) {
    throw new Error('Select at least one character type.');
  }
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('Secure randomness is unavailable. Use a modern browser over HTTPS.');
  }

  const selectedGroups = [...new Set(groups)].map(group => CHARACTER_GROUPS[group]);
  const alphabet = selectedGroups.join('');
  const random = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / alphabet.length) * alphabet.length;

  // Reject out-of-range values and incomplete passwords to avoid selection bias.
  let password: string;
  do {
    password = '';
    while (password.length < length) {
      globalThis.crypto.getRandomValues(random);
      if (random[0] < limit) {
        password += alphabet[random[0] % alphabet.length];
      }
    }
  } while (!selectedGroups.every(group => [...password].some(character => group.includes(character))));

  return password;
}
