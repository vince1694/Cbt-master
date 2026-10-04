import * as esbuild from 'esbuild';

console.log('⚡ Building CBT Master React bundle...');

try {
  await esbuild.build({
    entryPoints: ['src/react/index.jsx'],
    bundle: true,
    outfile: 'js/react-app.bundle.js',
    format: 'esm',
    jsx: 'automatic',
    minify: true,
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });
  console.log('✅ React bundle built successfully -> js/react-app.bundle.js');
} catch (err) {
  console.error('❌ Build failed:', err);
  process.exit(1);
}
