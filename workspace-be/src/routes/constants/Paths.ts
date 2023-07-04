/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';

const Paths = {
  Base: '/api',
  Users: {
    Base: '/users',
  },
  Auth: {
    Base: '/auth',
  },
};

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
