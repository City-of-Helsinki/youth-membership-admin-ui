import { getUpdateProfilesVariables } from '../youthProfileMutationVariables';

describe('youthProfileMutationVariables', () => {
  it('should return empty values for unchanged fields', () => {
    const schoolClass = undefined;

    expect(
      getUpdateProfilesVariables({
        schoolClass,
        addresses: [],
        additionalContactPersons: [],
        primaryAddress: {
          id: '1',
        },
        birthDate: '1956-03-01',
      }).youthProfileInput.youthProfile.schoolClass
    ).toEqual('');
  });
});
