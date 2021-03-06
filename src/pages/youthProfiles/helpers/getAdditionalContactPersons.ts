import {
  Profile_profile as Profile,
  Profile_profile_youthProfile_additionalContactPersons_edges_node as YouthProfileAdditionalContactPersonNode,
  UpdateAdditionalContactPersonInput,
} from '../../../graphql/generatedTypes';

function getAdditionalContactPersons(
  profile?: Profile | null
): UpdateAdditionalContactPersonInput[] {
  const additionalContactPersons =
    profile?.youthProfile?.additionalContactPersons.edges;

  if (!additionalContactPersons) {
    return [];
  }

  return additionalContactPersons
    .map((contactPerson) => contactPerson?.node)
    .filter((contactPerson): contactPerson is Exclude<
      YouthProfileAdditionalContactPersonNode,
      null
    > => Boolean(contactPerson))
    .map((contactPerson) => ({
      id: contactPerson.id,
      firstName: contactPerson.firstName,
      lastName: contactPerson.lastName,
      phone: contactPerson.phone,
      email: contactPerson.email,
    }));
}

export default getAdditionalContactPersons;
