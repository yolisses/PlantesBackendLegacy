import { plantsResolvers } from '../plant/plantsResolvers.js';

const resolversImports = [plantsResolvers];
const resolversExport = { Query: {}, Mutation: {} };

const fields = ['Query', 'Mutation'];

console.error(resolversImports);
resolversImports.forEach((resolversImport) => {
  console.error(resolversImport);
  console.error(fields);
  fields.forEach((field) => {
    console.error(field);
    const resolvers = resolversImport[field];
    if (resolvers === undefined) return;
    console.error(resolversImport);
    console.error(resolversImport[field]);
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

console.error(resolversExport);

export const resolvers = resolversExport;
