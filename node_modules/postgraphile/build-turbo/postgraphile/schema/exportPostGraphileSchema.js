"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const graphql_1 = require("graphql");
async function writeFileAsync(path, contents) {
    await new Promise((resolve, reject) => {
        fs_1.writeFile(path, contents, error => {
            if (error)
                reject(error);
            else
                resolve();
        });
    });
}
/**
 * Exports a PostGraphile schema by looking at a Postgres client.
 */
async function exportPostGraphileSchema(schema, options = {}) {
    const jsonPath = typeof options.exportJsonSchemaPath === 'string' ? options.exportJsonSchemaPath : null;
    const graphqlPath = typeof options.exportGqlSchemaPath === 'string' ? options.exportGqlSchemaPath : null;
    // Sort schema, if requested
    const finalSchema = options.sortExport && graphql_1.lexicographicSortSchema && (jsonPath || graphqlPath)
        ? graphql_1.lexicographicSortSchema(schema)
        : schema;
    // JSON version
    if (jsonPath) {
        const result = await graphql_1.graphql(finalSchema, graphql_1.introspectionQuery);
        await writeFileAsync(jsonPath, JSON.stringify(result, null, 2));
    }
    // Schema language version
    if (graphqlPath) {
        await writeFileAsync(graphqlPath, graphql_1.printSchema(finalSchema));
    }
}
exports.default = exportPostGraphileSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0UG9zdEdyYXBoaWxlU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Bvc3RncmFwaGlsZS9zY2hlbWEvZXhwb3J0UG9zdEdyYXBoaWxlU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQStCO0FBQy9CLHFDQU1pQjtBQUdqQixLQUFLLFVBQVUsY0FBYyxDQUFDLElBQVksRUFBRSxRQUFnQjtJQUMxRCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3BDLGNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLElBQUksS0FBSztnQkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O2dCQUNwQixPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVEOztHQUVHO0FBQ1ksS0FBSyxVQUFVLHdCQUF3QixDQUNwRCxNQUFxQixFQUNyQixVQUErQixFQUFFO0lBRWpDLE1BQU0sUUFBUSxHQUNaLE9BQU8sT0FBTyxDQUFDLG9CQUFvQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDekYsTUFBTSxXQUFXLEdBQ2YsT0FBTyxPQUFPLENBQUMsbUJBQW1CLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUV2Riw0QkFBNEI7SUFDNUIsTUFBTSxXQUFXLEdBQ2YsT0FBTyxDQUFDLFVBQVUsSUFBSSxpQ0FBdUIsSUFBSSxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUM7UUFDeEUsQ0FBQyxDQUFDLGlDQUF1QixDQUFDLE1BQU0sQ0FBQztRQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRWIsZUFBZTtJQUNmLElBQUksUUFBUSxFQUFFO1FBQ1osTUFBTSxNQUFNLEdBQUcsTUFBTSxpQkFBTyxDQUFDLFdBQVcsRUFBRSw0QkFBa0IsQ0FBQyxDQUFDO1FBQzlELE1BQU0sY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqRTtJQUVELDBCQUEwQjtJQUMxQixJQUFJLFdBQVcsRUFBRTtRQUNmLE1BQU0sY0FBYyxDQUFDLFdBQVcsRUFBRSxxQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDN0Q7QUFDSCxDQUFDO0FBekJELDJDQXlCQyJ9