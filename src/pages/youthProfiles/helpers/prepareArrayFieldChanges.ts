type Model = { id: string };

type ArrayFieldChanges<Add, Update, Remove> = {
  add: Add;
  update: Update;
  remove: Remove;
};

// In the form we just have an array of models. But when we send them to
// the API, we have to distinct between new ones, ones that are updates
// and ones that are being removed.

// Form data model
// model: [
//     {...}
// ]

// API data model
// addModel: [...],
// updateModel: [...],
// removeModel: [...],

// So this function uses the previous values and the next values to
// understand which model is new, which is updated and which is removed.
function prepareArrayFieldChanges<C, U extends Model>(
  current: U[],
  next: Array<U | C>
): ArrayFieldChanges<C[], U[], string[]> {
  const add = next.filter((model): model is C => !('id' in model));
  const update = next.filter((model): model is U => 'id' in model);
  const nextIds = next
    .filter(
      (model): model is U => 'id' in model && typeof model.id === 'string'
    )
    .map((model) => model.id);
  const remove = current
    .filter((model) => !nextIds.includes(model.id))
    .map((model) => model.id);

  return {
    add,
    update,
    remove,
  };
}

export default prepareArrayFieldChanges;
