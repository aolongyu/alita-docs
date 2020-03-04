import { h } from '@stencil/core';

export default () => <docs-nav items={items}/>;

const items = {
  'menu-config': {
    'menu-config-config': '/docs/config/config',
    'menu-config-runtime': '/docs/config/runtime',
  },
};
