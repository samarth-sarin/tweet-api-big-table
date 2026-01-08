"use strict";
// Copyright 2016 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.PartialFailureError = void 0;
const promisify_1 = require("@google-cloud/promisify");
const arrify = require("arrify");
const family_1 = require("./family");
const mutation_1 = require("./mutation");
const table_1 = require("./utils/table");
const is = require("is");
const tabular_api_surface_1 = require("./tabular-api-surface");
Object.defineProperty(exports, "PartialFailureError", { enumerable: true, get: function () { return tabular_api_surface_1.PartialFailureError; } });
/**
 * Create a Table object to interact with a Cloud Bigtable table.
 *
 * @class
 * @param {Instance} instance Instance Object.
 * @param {string} id Unique identifier of the table.
 *
 * @example
 * ```
 * const {Bigtable} = require('@google-cloud/bigtable');
 * const bigtable = new Bigtable();
 * const instance = bigtable.instance('my-instance');
 * const table = instance.table('prezzy');
 * ```
 */
class Table extends tabular_api_surface_1.TabularApiSurface {
    constructor(instance, id) {
        super(instance, id);
    }
    /**
     * Formats the decodes policy etag value to string.
     *
     * @private
     *
     * @param {object} policy
     */
    static decodePolicyEtag(policy) {
        policy.etag = policy.etag.toString('ascii');
        return policy;
    }
    /**
     * Formats the table name to include the Bigtable cluster.
     *
     * @private
     *
     * @param {string} instanceName The formatted instance name.
     * @param {string} name The table name.
     *
     * @example
     * ```
     * Table.formatName_(
     *   'projects/my-project/zones/my-zone/instances/my-instance',
     *   'my-table'
     * );
     * //
     * 'projects/my-project/zones/my-zone/instances/my-instance/tables/my-table'
     * ```
     */
    static formatName_(instanceName, id) {
        if (id.includes('/')) {
            return id;
        }
        return `${instanceName}/tables/${id}`;
    }
    /**
     * Creates a range based off of a key prefix.
     *
     * @private
     *
     * @param {string} start The key prefix/starting bound.
     * @returns {object} range
     *
     * @example
     * ```
     * const {Bigtable} = require('@google-cloud/bigtable');
     * const bigtable = new Bigtable();
     * const instance = bigtable.instance('my-instance');
     * const table = instance.table('prezzy');
     * table.createPrefixRange('start');
     * // => {
     * //   start: 'start',
     * //   end: {
     * //     value: 'staru',
     * //     inclusive: false
     * //   }
     * // }
     * ```
     */
    static createPrefixRange(start) {
        return table_1.TableUtils.createPrefixRange(start);
    }
    /**
     * Create a table.
     *
     * @param {object} [options] See {@link Instance#createTable}.
     * @param {object} [options.gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this request.
     * @param {Table} callback.table The newly created table.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_create_table
     */
    create(optionsOrCallback, cb) {
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        const options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        this.instance.createTable(this.id, options, callback);
    }
    /**
     * Backup a table with cluster auto selection.
     *
     * Backups of tables originate from a specific cluster. This is a helper
     * around `Cluster.createBackup` that automatically selects the first ready
     * cluster from which a backup can be performed.
     *
     * NOTE: This will make two API requests to first determine the most
     * appropriate cluster, then create the backup. This could lead to a race
     * condition if other requests are simultaneously sent or if the cluster
     * availability state changes between each call.
     *
     * @param {string} id A unique ID for the backup.
     * @param {CreateBackupConfig} config Metadata to set on the Backup.
     * @param {BackupTimestamp} config.expireTime When the backup will be
     *   automatically deleted.
     * @param {CallOptions} [config.gaxOptions] Request configuration options,
     *     outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {CreateBackupCallback} [callback] The callback function.
     * @param {?error} callback.err An error returned while making this request.
     * @param {Backup} callback.backup The newly created Backup.
     * @param {Operation} callback.operation An operation object that can be used
     *     to check the status of the request.
     * @param {object} callback.apiResponse The full API response.
     * @return {void | Promise<CreateBackupResponse>}
     */
    createBackup(id, config, callback) {
        if (!id) {
            throw new TypeError('An id is required to create a backup.');
        }
        if (!config) {
            throw new TypeError('A configuration object is required.');
        }
        this.getReplicationStates(config.gaxOptions, (err, stateMap) => {
            if (err) {
                callback(err);
                return;
            }
            const [clusterId] = [...stateMap.entries()].find(([, clusterState]) => {
                return (clusterState.replicationState === 'READY' ||
                    clusterState.replicationState === 'READY_OPTIMIZING');
            }) || [];
            if (!clusterId) {
                callback(new Error('No ready clusters eligible for backup.'));
                return;
            }
            this.instance.cluster(clusterId).createBackup(id, {
                table: this.name,
                ...config,
            }, callback);
        });
    }
    /**
     * Create a column family.
     *
     * Optionally you can send garbage collection rules and when creating a
     * family. Garbage collection executes opportunistically in the background, so
     * it's possible for reads to return a cell even if it matches the active
     * expression for its family.
     *
     * @see [Garbage Collection Proto Docs]{@link https://github.com/googleapis/googleapis/blob/3b236df084cf9222c529a2890f90e3a4ff0f2dfd/google/bigtable/admin/v2/table.proto#L184}
     *
     * @throws {error} If a name is not provided.
     *
     * @param {string} id The unique identifier of column family.
     * @param {object} [options] Configuration object.
     * @param {object} [options.gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/global.html#CallOptions.
     * @param {object} [options.rule] Garbage collection rule
     * @param {object} [options.rule.age] Delete cells in a column older than the
     *     given age. Values must be at least 1 millisecond.
     * @param {number} [options.rule.versions] Maximum number of versions to delete
     *     cells in a column, except for the most recent.
     * @param {boolean} [options.rule.intersect] Cells to delete should match all
     *     rules.
     * @param {boolean} [options.rule.union] Cells to delete should match any of the
     *     rules.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this request.
     * @param {Family} callback.family The newly created Family.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_create_family
     */
    createFamily(id, optionsOrCallback, cb) {
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        const options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        if (!id) {
            throw new Error('An id is required to create a family.');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = {
            id,
            create: {},
        };
        if (options.rule) {
            mod.create.gcRule = family_1.Family.formatRule_(options.rule);
        }
        const reqOpts = {
            name: this.name,
            modifications: [mod],
        };
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'modifyColumnFamilies',
            reqOpts,
            gaxOpts: options.gaxOptions,
        }, (err, resp) => {
            if (err) {
                callback(err, null, resp);
                return;
            }
            const family = this.family(id);
            family.metadata = resp;
            callback(null, family, resp);
        });
    }
    /**
     * Delete the table.
     *
     * @param {object} [gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} [callback] The callback function.
     * @param {?error} callback.err An error returned while making this
     *     request.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_del_table
     */
    delete(optionsOrCallback, cb) {
        const gaxOptions = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'deleteTable',
            reqOpts: {
                name: this.name,
            },
            gaxOpts: gaxOptions,
        }, callback);
    }
    /**
     * Delete all rows in the table, optionally corresponding to a particular
     * prefix.
     *
     * @throws {error} If a prefix is not provided.
     *
     * @param {string} prefix Row key prefix.
     * @param {object} [gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this request.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_del_rows
     */
    deleteRows(prefix, optionsOrCallback, cb) {
        const gaxOptions = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        if (!prefix || is.fn(prefix)) {
            throw new Error('A prefix is required for deleteRows.');
        }
        const reqOpts = {
            name: this.name,
            rowKeyPrefix: mutation_1.Mutation.convertToBytes(prefix),
        };
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'dropRowRange',
            reqOpts,
            gaxOpts: gaxOptions,
        }, callback);
    }
    /**
     * Check if a table exists.
     *
     * @param {object} [gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this
     *     request.
     * @param {boolean} callback.exists Whether the table exists or not.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_exists_table
     */
    exists(optionsOrCallback, cb) {
        const gaxOptions = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        const reqOpts = {
            view: 'name',
            gaxOptions,
        };
        this.getMetadata(reqOpts, err => {
            if (err) {
                if (err.code === 5) {
                    callback(null, false);
                    return;
                }
                callback(err);
                return;
            }
            callback(null, true);
        });
    }
    /**
     * Get a reference to a Table Family.
     *
     * @throws {error} If a name is not provided.
     *
     * @param {string} id The family unique identifier.
     * @returns {Family}
     *
     * @example
     * ```
     * const family = table.family('my-family');
     * ```
     */
    family(id) {
        if (!id) {
            throw new Error('A family id must be provided.');
        }
        return new family_1.Family(this, id);
    }
    /**
     * Get a table if it exists.
     *
     * You may optionally use this to "get or create" an object by providing an
     * object with `autoCreate` set to `true`. Any extra configuration that is
     * normally required for the `create` method must be contained within this
     * object as well.
     *
     * @param {object} [options] Configuration object.
     * @param {boolean} [options.autoCreate=false] Automatically create the
     *     instance if it does not already exist.
     * @param {object} [options.gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {?error} callback.error An error returned while making this request.
     * @param {Table} callback.table The Table object.
     * @param {object} callback.apiResponse The resource as it exists in the API.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_get_table
     */
    get(optionsOrCallback, cb) {
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        const options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const autoCreate = !!options.autoCreate;
        const gaxOptions = options.gaxOptions;
        this.getMetadata({ gaxOptions }, (err, metadata) => {
            if (err) {
                if (err.code === 5 && autoCreate) {
                    this.create({ gaxOptions }, callback);
                    return;
                }
                callback(err);
                return;
            }
            callback(null, this, metadata);
        });
    }
    /**
     * @param {object} [options] Configuration object.
     * @param {object} [options.gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {number} [options.requestedPolicyVersion] The policy format version
     *     to be returned. Valid values are 0, 1, and 3. Requests specifying an
     *     invalid value will be rejected. Requests for policies with any
     *     conditional bindings must specify version 3. Policies without any
     *     conditional bindings may specify any valid value or leave the field unset.
     * @param {function} [callback] The callback function.
     * @param {?error} callback.error An error returned while making this request.
     * @param {Policy} policy The policy.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/instance.js</caption>
     * region_tag:bigtable_api_get_table_Iam_policy
     */
    getIamPolicy(optionsOrCallback, callback) {
        const options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        callback =
            typeof optionsOrCallback === 'function' ? optionsOrCallback : callback;
        const reqOpts = {
            resource: this.name,
        };
        if (options.requestedPolicyVersion !== null &&
            options.requestedPolicyVersion !== undefined) {
            reqOpts.options = {
                requestedPolicyVersion: options.requestedPolicyVersion,
            };
        }
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'getIamPolicy',
            reqOpts,
            gaxOpts: options.gaxOptions,
        }, (err, resp) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, Table.decodePolicyEtag(resp));
        });
    }
    /**
     * Get Family objects for all the column families in your table.
     *
     * @param {object} [gaxOptions] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this request.
     * @param {Family[]} callback.families The list of families.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_get_families
     */
    getFamilies(optionsOrCallback, cb) {
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        const gaxOptions = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        this.getMetadata({ gaxOptions }, (err, metadata) => {
            if (err) {
                callback(err);
                return;
            }
            const families = Object.keys(metadata.columnFamilies).map(familyId => {
                const family = this.family(familyId);
                family.metadata = metadata.columnFamilies[familyId];
                return family;
            });
            callback(null, families, metadata.columnFamilies);
        });
    }
    /**
     * Get replication states of the clusters for this table.
     *
     * @param {object} [gaxOptions] Request configuration options, outlined here:
     *     https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this request.
     * @param {Family[]} callback.clusterStates The map of clusterId and its replication state.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example
     * ```
     * const {Bigtable} = require('@google-cloud/bigtable');
     * const bigtable = new Bigtable();
     * const instance = bigtable.instance('my-instance');
     * const table = instance.table('prezzy');
     *
     * table.getReplicationStates(function(err, clusterStates, apiResponse) {
     *   // `clusterStates` is an map of clusterId and its replication state.
     * });
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * table.getReplicationStates().then(function(data) {
     *   const clusterStates = data[0];
     *   const apiResponse = data[1];
     * });
     * ```
     */
    getReplicationStates(optionsOrCallback, cb) {
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        const gaxOptions = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const reqOpts = {
            view: 'replication',
            gaxOptions,
        };
        this.getMetadata(reqOpts, (err, metadata) => {
            if (err) {
                callback(err);
                return;
            }
            const clusterStates = new Map();
            Object.keys(metadata.clusterStates).map(clusterId => clusterStates.set(clusterId, metadata.clusterStates[clusterId]));
            callback(null, clusterStates, metadata);
        });
    }
    /**
     * Get the table's metadata.
     *
     * @param {object} [options] Table request options.
     * @param {object} [options.gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {string} [options.view] The view to be applied to the table fields.
     * @param {function} [callback] The callback function.
     * @param {?error} callback.err An error returned while making this
     *     request.
     * @param {object} callback.metadata The table's metadata.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/table.js</caption>
     * region_tag:bigtable_api_get_table_meta
     */
    getMetadata(optionsOrCallback, cb) {
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        const options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const reqOpts = {
            name: this.name,
            view: Table.VIEWS[options.view || 'unspecified'],
        };
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'getTable',
            reqOpts,
            gaxOpts: options.gaxOptions,
        }, (...args) => {
            if (args[1]) {
                this.metadata = args[1];
            }
            callback(...args);
        });
    }
    /**
     * @param {object} [gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} [callback] The callback function.
     * @param {?error} callback.error An error returned while making this request.
     * @param {Policy} policy The policy.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/instance.js</caption>
     * region_tag:bigtable_api_set_table_Iam_policy
     */
    setIamPolicy(policy, gaxOptionsOrCallback, callback) {
        const gaxOptions = typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
        callback =
            typeof gaxOptionsOrCallback === 'function'
                ? gaxOptionsOrCallback
                : callback;
        if (policy.etag !== null && policy.etag !== undefined) {
            policy.etag = Buffer.from(policy.etag);
        }
        const reqOpts = {
            resource: this.name,
            policy,
        };
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'setIamPolicy',
            reqOpts,
            gaxOpts: gaxOptions,
        }, (err, resp) => {
            if (err) {
                callback(err);
            }
            callback(null, Table.decodePolicyEtag(resp));
        });
    }
    /**
     *
     * @param {string | string[]} permissions The permission(s) to test for.
     * @param {object} [gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} [callback] The callback function.
     * @param {?error} callback.error An error returned while making this request.
     * @param {string[]} permissions A subset of permissions that the caller is
     *     allowed.
     *
     * @example <caption>include:samples/api-reference-doc-snippets/instance.js</caption>
     * region_tag:bigtable_api_test_table_Iam_permissions
     */
    testIamPermissions(permissions, gaxOptionsOrCallback, callback) {
        const gaxOptions = typeof gaxOptionsOrCallback === 'object' ? gaxOptionsOrCallback : {};
        callback =
            typeof gaxOptionsOrCallback === 'function'
                ? gaxOptionsOrCallback
                : callback;
        const reqOpts = {
            resource: this.name,
            permissions: arrify(permissions),
        };
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'testIamPermissions',
            reqOpts,
            gaxOpts: gaxOptions,
        }, (err, resp) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, resp.permissions);
        });
    }
    /**
     * Truncate the table.
     *
     * @param {object} [gaxOptions] Request configuration options, outlined
     *     here: https://googleapis.github.io/gax-nodejs/CallSettings.html.
     * @param {function} callback The callback function.
     * @param {?error} callback.err An error returned while making this request.
     * @param {object} callback.apiResponse The full API response.
     *
     * @example
     * ```
     * table.truncate(function(err, apiResponse) {});
     *
     * //-
     * // If the callback is omitted, we'll return a Promise.
     * //-
     * table.truncate().then(function(data) {
     *   const apiResponse = data[0];
     * });
     * ```
     */
    truncate(optionsOrCallback, cb) {
        const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : cb;
        const gaxOptions = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
        const reqOpts = {
            name: this.name,
            deleteAllDataFromTable: true,
        };
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'dropRowRange',
            reqOpts,
            gaxOpts: gaxOptions,
        }, callback);
    }
    /**
     * Generates Consistency-Token and check consistency for generated token
     * In-case consistency check returns false, retrial is done in interval
     * of 5 seconds till 10 minutes, after that it returns false.
     *
     * @param {function(?error, ?boolean)} callback The callback function.
     * @param {?Error} callback.err An error returned while making this request.
     * @param {?Boolean} callback.resp Boolean value.
     */
    waitForReplication(callback) {
        // handler for generated consistency-token
        const tokenHandler = (err, token) => {
            if (err) {
                return callback(err);
            }
            // set timeout for 10 minutes
            const timeoutAfterTenMinutes = setTimeout(() => {
                callback(null, false);
            }, 10 * 60 * 1000);
            // method checks if retrial is required & init retrial with 5 sec
            // delay
            const retryIfNecessary = (err, res) => {
                if (err) {
                    clearTimeout(timeoutAfterTenMinutes);
                    return callback(err);
                }
                if (res === true) {
                    clearTimeout(timeoutAfterTenMinutes);
                    return callback(null, true);
                }
                setTimeout(launchCheck, 5000);
            };
            // method to launch token consistency check
            const launchCheck = () => {
                this.checkConsistency(token, retryIfNecessary);
            };
            launchCheck();
        };
        // generate consistency-token
        this.generateConsistencyToken(tokenHandler);
    }
    /**
     * Generates Consistency-Token
     * @param {function(?error, ?boolean)} callback The callback function.
     * @param {?Error} callback.err An error returned while making this request.
     * @param {?String} callback.token The generated consistency token.
     */
    generateConsistencyToken(callback) {
        const reqOpts = {
            name: this.name,
        };
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'generateConsistencyToken',
            reqOpts,
        }, (err, res) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, res.consistencyToken);
        });
    }
    /**
     * Checks consistency for given ConsistencyToken
     * @param {string} token consistency token
     * @param {function(?error, ?boolean)} callback The callback function.
     * @param {?Error} callback.err An error returned while making this request.
     * @param {?Boolean} callback.consistent Boolean value.
     */
    checkConsistency(token, callback) {
        const reqOpts = {
            name: this.name,
            consistencyToken: token,
        };
        this.bigtable.request({
            client: 'BigtableTableAdminClient',
            method: 'checkConsistency',
            reqOpts,
        }, (err, res) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, res.consistent);
        });
    }
    /**
     * The view to be applied to the returned table's fields.
     * Defaults to schema if unspecified.
     *
     * @private
     */
    static VIEWS = {
        unspecified: 0,
        name: 1,
        schema: 2,
        replication: 3,
        full: 4,
    };
}
exports.Table = Table;
/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
(0, promisify_1.promisifyAll)(Table, {
    exclude: ['family', 'row'],
});
//# sourceMappingURL=table.js.map