import { Client, Server } from 'styletron-engine-atomic';
import { DebugEngine } from 'styletron-react';

export const isServer =
  typeof window === 'undefined'

const getHydrateClass = () =>
  document.getElementsByClassName('_styletron_hydrate_');

export const styletron =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: document.getElementsByClassName('_styletron_hydrate_') as any,
      });

// export const debug =
//   process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine();
// we opt-out the debugger because of on issue with latest nextjs and styletron debugger
export const debug = false;
