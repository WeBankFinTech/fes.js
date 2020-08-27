import fesConfig from '../config';

export default fesConfig.env[process.privateFesEnv.env] || {};
