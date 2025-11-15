import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Determine base path for GitHub Pages
    // If GITHUB_REPOSITORY is set (GitHub Actions), extract repo name
    // Otherwise, use default or fallback to '/'
    let base = '/';
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      base = `/${repoName}/`;
    } else if (process.env.GITHUB_PAGES === 'true') {
      // Fallback if GITHUB_PAGES is set but GITHUB_REPOSITORY is not
      base = '/QuestionCards/'; // Update this to match your actual repo name if needed
    }
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
