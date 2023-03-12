import React from 'react';
import ReactDOM from 'react-dom/client';

import { Bitcoin } from '../src/index';

describe('Icons', () => {
  it('renders without crashing', () => {
    const root = ReactDOM.createRoot(document.createElement('div'));
    root.render(<Bitcoin />);
    root.unmount();
  });
});
