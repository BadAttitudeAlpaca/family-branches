import { render } from '@testing-library/react';

import NewMemberForm from './new-member-form';

describe('NewMemberForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewMemberForm />);
    expect(baseElement).toBeTruthy();
  });
});
