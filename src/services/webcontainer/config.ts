export const WEBCONTAINER_CONFIG = {
  FILESYSTEM: {
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: 'stackblitz-terminal',
          type: 'module',
          dependencies: {},
          scripts: {
            start: 'jsh'
          }
        }, null, 2)
      }
    }
  }
};