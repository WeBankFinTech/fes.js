export default {
  cjs: { type: 'babel', lazy: false },
  esm: { type: 'rollup' },
  disableTypeCheck: false,
  extraExternals: ['@@/core/exports'],
};
