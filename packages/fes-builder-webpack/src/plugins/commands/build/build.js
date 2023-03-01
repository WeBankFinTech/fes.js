import webpack from 'webpack';

export async function build({ bundleConfig }) {
    return new Promise((resolve, reject) => {
        const compiler = webpack(bundleConfig);
        compiler.run((err, stats) => {
            if (err) {
                console.error(err);
                return reject(new Error('build failed'));
            }
            if (stats?.hasErrors()) {
                stats.compilation.errors.forEach((e) => {
                    console.error(e);
                });
                return reject(new Error('build failed'));
            }
            resolve({ stats });
        });
    });
}
