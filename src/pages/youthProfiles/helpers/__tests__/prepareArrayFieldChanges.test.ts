import prepareArrayFieldChanges from '../prepareArrayFieldChanges';

describe('prepareArrayFieldChanges', () => {
  it('should correctly determine added, updated and removed items', () => {
    const item0 = {
      id: '0',
      name: 'One',
    };
    const item0b = {
      ...item0,
      name: 'One2',
    };
    const item1 = {
      id: '1',
      name: 'Two',
    };
    const item2 = {
      name: 'Three',
    };
    const { add, update, remove } = prepareArrayFieldChanges(
      [item0, item1],
      [item0b, item2]
    );

    expect(add).toEqual([item2]);
    expect(update).toEqual([item0b]);
    expect(remove).toEqual([item1].map((item) => item.id));
  });
});
