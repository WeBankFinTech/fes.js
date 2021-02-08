import webpack from 'webpack';

export async function build({
    bundleConfig
}) {
    return new Promise((resolve, reject) => {
        const compiler = webpack(bundleConfig);
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                try {
                    console.log(stats.toString('errors-only'));
                } catch (e) {}
                console.error(err);
                return reject(new Error('build failed'));
            }
            resolve({ stats });
        });
    });
}
