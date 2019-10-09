import { PoolClient } from 'pg';
import { ExecutionResult } from 'graphql';
import { $$pgClient } from '../postgres/inventory/pgClientFromContext';
import { mixed, WithPostGraphileContextOptions } from '../interfaces';
interface PostGraphileContext {
    [$$pgClient]: PoolClient;
    [key: string]: PoolClient | mixed;
}
export declare type WithPostGraphileContextFn<TResult = ExecutionResult> = (options: WithPostGraphileContextOptions, callback: (context: PostGraphileContext) => Promise<TResult>) => Promise<TResult>;
/**
 * Creates a PostGraphile context object which should be passed into a GraphQL
 * execution. This function will also connect a client from a Postgres pool and
 * setup a transaction in that client.
 *
 * This function is intended to wrap a call to GraphQL-js execution like so:
 *
 * ```js
 * const result = await withPostGraphileContext({
 *   pgPool,
 *   jwtToken,
 *   jwtSecret,
 *   pgDefaultRole,
 * }, async context => {
 *   return await graphql(
 *     schema,
 *     query,
 *     null,
 *     { ...context },
 *     variables,
 *     operationName,
 *   );
 * });
 * ```
 */
declare const withPostGraphileContext: WithPostGraphileContextFn;
export default withPostGraphileContext;
/**
 * Adds debug logging funcionality to a Postgres client.
 *
 * @private
 */
export declare function debugPgClient(pgClient: PoolClient): PoolClient;
