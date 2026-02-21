/// <reference types="vitest/globals" />
import ReactDOM from 'react-dom/client';

import { Btc } from '../src/index';

describe('Icons', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<Btc />);
    root.unmount();
  });
});
