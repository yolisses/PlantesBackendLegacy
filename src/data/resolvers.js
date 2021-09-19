import { resolversImports } from './resolversImports';

const fields = ['Query', 'Mutation'];
const resolversExport = { Query: {}, Mutation: {} };

resolversImports.forEach((resolversImport) => {
  fields.forEach((field) => {
    const resolvers = resolversImport[field];
    if (resolvers === undefined) return;
    Object.entries(resolvers).forEach((resolver) => {
      const name = resolver[0];
      const func = resolver[1];
      if (resolversExport[field][name]) {
        throw new Error(`Resolver name ${name} already registered, make sure you dont forgot rename it`);
      }
      resolversExport[field][name] = func;
    });
  });
});

export const resolvers = resolversExport;
