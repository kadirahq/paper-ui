module.exports = {
  stories: ['../src/stories/**/*.stories.@(ts|mdx)'],
  logLevel: 'debug',
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@storybook/addon-jest',
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    'storybook-addon-angular-ivy',
  ],
  core: {
    builder: 'webpack4',
  },
  angularOptions: {
    enableIvy: true,
  },
  // These are just here to test composition. They could be added to any storybook example project
  refs: {
    first: {
      title: 'Composition test one',
      url: 'https://storybookjs.netlify.app/cra-ts-essentials',
    },
    second: {
      title: 'Composition test two',
      url: 'https://storybookjs.netlify.app/cra-ts-essentials',
    },
    third: {
      title: 'Composition test three',
      url: 'https://storybookjs.netlify.app/cra-ts-essentials',
    },
  },
};
