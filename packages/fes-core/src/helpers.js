const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

/** @internal */
export const makeSymbol = name => (hasSymbol ? Symbol(name) : name);
