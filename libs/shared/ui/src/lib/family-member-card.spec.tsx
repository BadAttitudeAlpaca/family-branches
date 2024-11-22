import { render } from '@testing-library/react';

import FamilyMemberCard from './family-member-card';

describe('FamilyMemberCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FamilyMemberCard />);
    expect(baseElement).toBeTruthy();
  });
});
