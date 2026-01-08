import type * as gax from 'google-gax';
import type { Callback, CallOptions, Descriptors, ClientOptions, LROperation, PaginationCallback } from 'google-gax';
import { Transform } from 'stream';
import * as protos from '../../protos/protos';
/**
 *  Service for creating, configuring, and deleting Cloud Bigtable Instances and
 *  Clusters. Provides access to the Instance and Cluster schemas only, not the
 *  tables' metadata or data stored in those tables.
 * @class
 * @memberof v2
 */
export declare class BigtableInstanceAdminClient {
    private _terminated;
    private _opts;
    private _providedCustomServicePath;
    private _gaxModule;
    private _gaxGrpc;
    private _protos;
    private _defaults;
    private _universeDomain;
    private _servicePath;
    private _log;
    auth: gax.GoogleAuth;
    descriptors: Descriptors;
    warn: (code: string, message: string, warnType?: string) => void;
    innerApiCalls: {
        [name: string]: Function;
    };
    pathTemplates: {
        [name: string]: gax.PathTemplate;
    };
    operationsClient: gax.OperationsClient;
    bigtableInstanceAdminStub?: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of BigtableInstanceAdminClient.
     *
     * @param {object} [options] - The configuration object.
     * The options accepted by the constructor are described in detail
     * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
     * The common options are:
     * @param {object} [options.credentials] - Credentials object.
     * @param {string} [options.credentials.client_email]
     * @param {string} [options.credentials.private_key]
     * @param {string} [options.email] - Account email address. Required when
     *     using a .pem or .p12 keyFilename.
     * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
     *     .p12 key downloaded from the Google Developers Console. If you provide
     *     a path to a JSON file, the projectId option below is not necessary.
     *     NOTE: .pem and .p12 require you to specify options.email as well.
     * @param {number} [options.port] - The port on which to connect to
     *     the remote host.
     * @param {string} [options.projectId] - The project ID from the Google
     *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
     *     the environment variable GCLOUD_PROJECT for your project ID. If your
     *     app is running in an environment which supports
     *     {@link https://cloud.google.com/docs/authentication/application-default-credentials Application Default Credentials},
     *     your project ID will be detected automatically.
     * @param {string} [options.apiEndpoint] - The domain name of the
     *     API remote host.
     * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
     *     Follows the structure of {@link gapicConfig}.
     * @param {boolean} [options.fallback] - Use HTTP/1.1 REST mode.
     *     For more information, please check the
     *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
     * @param {gax} [gaxInstance]: loaded instance of `google-gax`. Useful if you
     *     need to avoid loading the default gRPC version and want to use the fallback
     *     HTTP implementation. Load only fallback version and pass it to the constructor:
     *     ```
     *     const gax = require('google-gax/build/src/fallback'); // avoids loading google-gax with gRPC
     *     const client = new BigtableInstanceAdminClient({fallback: true}, gax);
     *     ```
     */
    constructor(opts?: ClientOptions, gaxInstance?: typeof gax | typeof gax.fallback);
    /**
     * Initialize the client.
     * Performs asynchronous operations (such as authentication) and prepares the client.
     * This function will be called automatically when any class method is called for the
     * first time, but if you need to initialize it before calling an actual method,
     * feel free to call initialize() directly.
     *
     * You can await on this method if you want to make sure the client is initialized.
     *
     * @returns {Promise} A promise that resolves to an authenticated service stub.
     */
    initialize(): Promise<{
        [name: string]: Function;
    }>;
    /**
     * The DNS address for this API service.
     * @deprecated Use the apiEndpoint method of the client instance.
     * @returns {string} The DNS address for this service.
     */
    static get servicePath(): string;
    /**
     * The DNS address for this API service - same as servicePath.
     * @deprecated Use the apiEndpoint method of the client instance.
     * @returns {string} The DNS address for this service.
     */
    static get apiEndpoint(): string;
    /**
     * The DNS address for this API service.
     * @returns {string} The DNS address for this service.
     */
    get apiEndpoint(): string;
    get universeDomain(): string;
    /**
     * The port for this API service.
     * @returns {number} The default port for this service.
     */
    static get port(): number;
    /**
     * The scopes needed to make gRPC calls for every method defined
     * in this service.
     * @returns {string[]} List of default scopes.
     */
    static get scopes(): string[];
    getProjectId(): Promise<string>;
    getProjectId(callback: Callback<string, undefined, undefined>): void;
    /**
     * Gets information about an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the requested instance. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.Instance|Instance}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.get_instance.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_GetInstance_async
     */
    getInstance(request?: protos.google.bigtable.admin.v2.IGetInstanceRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IInstance,
        protos.google.bigtable.admin.v2.IGetInstanceRequest | undefined,
        {} | undefined
    ]>;
    getInstance(request: protos.google.bigtable.admin.v2.IGetInstanceRequest, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.IGetInstanceRequest | null | undefined, {} | null | undefined>): void;
    getInstance(request: protos.google.bigtable.admin.v2.IGetInstanceRequest, callback: Callback<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.IGetInstanceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Lists information about instances in a project.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the project for which a list of instances is
     *   requested. Values are of the form `projects/{project}`.
     * @param {string} request.pageToken
     *   DEPRECATED: This field is unused and ignored.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.ListInstancesResponse|ListInstancesResponse}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.list_instances.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_ListInstances_async
     */
    listInstances(request?: protos.google.bigtable.admin.v2.IListInstancesRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IListInstancesResponse,
        protos.google.bigtable.admin.v2.IListInstancesRequest | undefined,
        {} | undefined
    ]>;
    listInstances(request: protos.google.bigtable.admin.v2.IListInstancesRequest, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.IListInstancesResponse, protos.google.bigtable.admin.v2.IListInstancesRequest | null | undefined, {} | null | undefined>): void;
    listInstances(request: protos.google.bigtable.admin.v2.IListInstancesRequest, callback: Callback<protos.google.bigtable.admin.v2.IListInstancesResponse, protos.google.bigtable.admin.v2.IListInstancesRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Updates an instance within a project. This method updates only the display
     * name and type for an Instance. To update other Instance properties, such as
     * labels, use PartialUpdateInstance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   The unique name of the instance. Values are of the form
     *   `projects/{project}/instances/{@link protos.a-z0-9\\-|a-z}+[a-z0-9]`.
     * @param {string} request.displayName
     *   Required. The descriptive name for this instance as it appears in UIs.
     *   Can be changed at any time, but should be kept globally unique
     *   to avoid confusion.
     * @param {google.bigtable.admin.v2.Instance.State} request.state
     *   Output only. The current state of the instance.
     * @param {google.bigtable.admin.v2.Instance.Type} request.type
     *   The type of the instance. Defaults to `PRODUCTION`.
     * @param {number[]} request.labels
     *   Labels are a flexible and lightweight mechanism for organizing cloud
     *   resources into groups that reflect a customer's organizational needs and
     *   deployment strategies. They can be used to filter resources and aggregate
     *   metrics.
     *
     *   * Label keys must be between 1 and 63 characters long and must conform to
     *     the regular expression: `{@link protos.\p{Ll}\p{Lo}\p{N}_-|\p{Ll}\p{Lo}}{0,62}`.
     *   * Label values must be between 0 and 63 characters long and must conform to
     *     the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`.
     *   * No more than 64 labels can be associated with a given resource.
     *   * Keys and values must both be under 128 bytes.
     * @param {google.protobuf.Timestamp} request.createTime
     *   Output only. A commit timestamp representing when this Instance was
     *   created. For instances created before this field was added (August 2021),
     *   this value is `seconds: 0, nanos: 1`.
     * @param {boolean} request.satisfiesPzs
     *   Output only. Reserved for future use.
     * @param {boolean} request.satisfiesPzi
     *   Output only. Reserved for future use.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.Instance|Instance}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_instance.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateInstance_async
     */
    updateInstance(request?: protos.google.bigtable.admin.v2.IInstance, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IInstance,
        protos.google.bigtable.admin.v2.IInstance | undefined,
        {} | undefined
    ]>;
    updateInstance(request: protos.google.bigtable.admin.v2.IInstance, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.IInstance | null | undefined, {} | null | undefined>): void;
    updateInstance(request: protos.google.bigtable.admin.v2.IInstance, callback: Callback<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.IInstance | null | undefined, {} | null | undefined>): void;
    /**
     * Delete an instance from a project.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the instance to be deleted.
     *   Values are of the form `projects/{project}/instances/{instance}`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.protobuf.Empty|Empty}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.delete_instance.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_DeleteInstance_async
     */
    deleteInstance(request?: protos.google.bigtable.admin.v2.IDeleteInstanceRequest, options?: CallOptions): Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.bigtable.admin.v2.IDeleteInstanceRequest | undefined,
        {} | undefined
    ]>;
    deleteInstance(request: protos.google.bigtable.admin.v2.IDeleteInstanceRequest, options: CallOptions, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteInstanceRequest | null | undefined, {} | null | undefined>): void;
    deleteInstance(request: protos.google.bigtable.admin.v2.IDeleteInstanceRequest, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteInstanceRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets information about a cluster.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the requested cluster. Values are of the form
     *   `projects/{project}/instances/{instance}/clusters/{cluster}`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.Cluster|Cluster}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.get_cluster.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_GetCluster_async
     */
    getCluster(request?: protos.google.bigtable.admin.v2.IGetClusterRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.ICluster,
        protos.google.bigtable.admin.v2.IGetClusterRequest | undefined,
        {} | undefined
    ]>;
    getCluster(request: protos.google.bigtable.admin.v2.IGetClusterRequest, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.IGetClusterRequest | null | undefined, {} | null | undefined>): void;
    getCluster(request: protos.google.bigtable.admin.v2.IGetClusterRequest, callback: Callback<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.IGetClusterRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Lists information about clusters in an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which a list of clusters is
     *   requested. Values are of the form
     *   `projects/{project}/instances/{instance}`. Use `{instance} = '-'` to list
     *   Clusters for all Instances in a project, e.g.,
     *   `projects/myproject/instances/-`.
     * @param {string} request.pageToken
     *   DEPRECATED: This field is unused and ignored.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.ListClustersResponse|ListClustersResponse}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.list_clusters.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_ListClusters_async
     */
    listClusters(request?: protos.google.bigtable.admin.v2.IListClustersRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IListClustersResponse,
        protos.google.bigtable.admin.v2.IListClustersRequest | undefined,
        {} | undefined
    ]>;
    listClusters(request: protos.google.bigtable.admin.v2.IListClustersRequest, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.IListClustersResponse, protos.google.bigtable.admin.v2.IListClustersRequest | null | undefined, {} | null | undefined>): void;
    listClusters(request: protos.google.bigtable.admin.v2.IListClustersRequest, callback: Callback<protos.google.bigtable.admin.v2.IListClustersResponse, protos.google.bigtable.admin.v2.IListClustersRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes a cluster from an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the cluster to be deleted. Values are of the
     *   form `projects/{project}/instances/{instance}/clusters/{cluster}`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.protobuf.Empty|Empty}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.delete_cluster.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_DeleteCluster_async
     */
    deleteCluster(request?: protos.google.bigtable.admin.v2.IDeleteClusterRequest, options?: CallOptions): Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.bigtable.admin.v2.IDeleteClusterRequest | undefined,
        {} | undefined
    ]>;
    deleteCluster(request: protos.google.bigtable.admin.v2.IDeleteClusterRequest, options: CallOptions, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteClusterRequest | null | undefined, {} | null | undefined>): void;
    deleteCluster(request: protos.google.bigtable.admin.v2.IDeleteClusterRequest, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteClusterRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Creates an app profile within an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance in which to create the new app
     *   profile. Values are of the form `projects/{project}/instances/{instance}`.
     * @param {string} request.appProfileId
     *   Required. The ID to be used when referring to the new app profile within
     *   its instance, e.g., just `myprofile` rather than
     *   `projects/myproject/instances/myinstance/appProfiles/myprofile`.
     * @param {google.bigtable.admin.v2.AppProfile} request.appProfile
     *   Required. The app profile to be created.
     *   Fields marked `OutputOnly` will be ignored.
     * @param {boolean} request.ignoreWarnings
     *   If true, ignore safety checks when creating the app profile.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.AppProfile|AppProfile}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_app_profile.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateAppProfile_async
     */
    createAppProfile(request?: protos.google.bigtable.admin.v2.ICreateAppProfileRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IAppProfile,
        protos.google.bigtable.admin.v2.ICreateAppProfileRequest | undefined,
        {} | undefined
    ]>;
    createAppProfile(request: protos.google.bigtable.admin.v2.ICreateAppProfileRequest, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.IAppProfile, protos.google.bigtable.admin.v2.ICreateAppProfileRequest | null | undefined, {} | null | undefined>): void;
    createAppProfile(request: protos.google.bigtable.admin.v2.ICreateAppProfileRequest, callback: Callback<protos.google.bigtable.admin.v2.IAppProfile, protos.google.bigtable.admin.v2.ICreateAppProfileRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets information about an app profile.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the requested app profile. Values are of the
     *   form `projects/{project}/instances/{instance}/appProfiles/{app_profile}`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.AppProfile|AppProfile}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.get_app_profile.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_GetAppProfile_async
     */
    getAppProfile(request?: protos.google.bigtable.admin.v2.IGetAppProfileRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IAppProfile,
        protos.google.bigtable.admin.v2.IGetAppProfileRequest | undefined,
        {} | undefined
    ]>;
    getAppProfile(request: protos.google.bigtable.admin.v2.IGetAppProfileRequest, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.IAppProfile, protos.google.bigtable.admin.v2.IGetAppProfileRequest | null | undefined, {} | null | undefined>): void;
    getAppProfile(request: protos.google.bigtable.admin.v2.IGetAppProfileRequest, callback: Callback<protos.google.bigtable.admin.v2.IAppProfile, protos.google.bigtable.admin.v2.IGetAppProfileRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes an app profile from an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the app profile to be deleted. Values are of
     *   the form
     *   `projects/{project}/instances/{instance}/appProfiles/{app_profile}`.
     * @param {boolean} request.ignoreWarnings
     *   Required. If true, ignore safety checks when deleting the app profile.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.protobuf.Empty|Empty}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.delete_app_profile.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_DeleteAppProfile_async
     */
    deleteAppProfile(request?: protos.google.bigtable.admin.v2.IDeleteAppProfileRequest, options?: CallOptions): Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.bigtable.admin.v2.IDeleteAppProfileRequest | undefined,
        {} | undefined
    ]>;
    deleteAppProfile(request: protos.google.bigtable.admin.v2.IDeleteAppProfileRequest, options: CallOptions, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteAppProfileRequest | null | undefined, {} | null | undefined>): void;
    deleteAppProfile(request: protos.google.bigtable.admin.v2.IDeleteAppProfileRequest, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteAppProfileRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets the access control policy for an instance resource. Returns an empty
     * policy if an instance exists but does not have a policy set.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.resource
     *   REQUIRED: The resource for which the policy is being requested.
     *   See the operation documentation for the appropriate value for this field.
     * @param {google.iam.v1.GetPolicyOptions} request.options
     *   OPTIONAL: A `GetPolicyOptions` object for specifying options to
     *   `GetIamPolicy`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.iam.v1.Policy|Policy}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.get_iam_policy.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_GetIamPolicy_async
     */
    getIamPolicy(request?: protos.google.iam.v1.IGetIamPolicyRequest, options?: CallOptions): Promise<[
        protos.google.iam.v1.IPolicy,
        protos.google.iam.v1.IGetIamPolicyRequest | undefined,
        {} | undefined
    ]>;
    getIamPolicy(request: protos.google.iam.v1.IGetIamPolicyRequest, options: CallOptions, callback: Callback<protos.google.iam.v1.IPolicy, protos.google.iam.v1.IGetIamPolicyRequest | null | undefined, {} | null | undefined>): void;
    getIamPolicy(request: protos.google.iam.v1.IGetIamPolicyRequest, callback: Callback<protos.google.iam.v1.IPolicy, protos.google.iam.v1.IGetIamPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Sets the access control policy on an instance resource. Replaces any
     * existing policy.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.resource
     *   REQUIRED: The resource for which the policy is being specified.
     *   See the operation documentation for the appropriate value for this field.
     * @param {google.iam.v1.Policy} request.policy
     *   REQUIRED: The complete policy to be applied to the `resource`. The size of
     *   the policy is limited to a few 10s of KB. An empty policy is a
     *   valid policy but certain Cloud Platform services (such as Projects)
     *   might reject them.
     * @param {google.protobuf.FieldMask} request.updateMask
     *   OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only
     *   the fields in the mask will be modified. If no mask is provided, the
     *   following default mask is used:
     *
     *   `paths: "bindings, etag"`
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.iam.v1.Policy|Policy}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.set_iam_policy.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_SetIamPolicy_async
     */
    setIamPolicy(request?: protos.google.iam.v1.ISetIamPolicyRequest, options?: CallOptions): Promise<[
        protos.google.iam.v1.IPolicy,
        protos.google.iam.v1.ISetIamPolicyRequest | undefined,
        {} | undefined
    ]>;
    setIamPolicy(request: protos.google.iam.v1.ISetIamPolicyRequest, options: CallOptions, callback: Callback<protos.google.iam.v1.IPolicy, protos.google.iam.v1.ISetIamPolicyRequest | null | undefined, {} | null | undefined>): void;
    setIamPolicy(request: protos.google.iam.v1.ISetIamPolicyRequest, callback: Callback<protos.google.iam.v1.IPolicy, protos.google.iam.v1.ISetIamPolicyRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Returns permissions that the caller has on the specified instance resource.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.resource
     *   REQUIRED: The resource for which the policy detail is being requested.
     *   See the operation documentation for the appropriate value for this field.
     * @param {string[]} request.permissions
     *   The set of permissions to check for the `resource`. Permissions with
     *   wildcards (such as '*' or 'storage.*') are not allowed. For more
     *   information see
     *   [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions).
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.iam.v1.TestIamPermissionsResponse|TestIamPermissionsResponse}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.test_iam_permissions.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_TestIamPermissions_async
     */
    testIamPermissions(request?: protos.google.iam.v1.ITestIamPermissionsRequest, options?: CallOptions): Promise<[
        protos.google.iam.v1.ITestIamPermissionsResponse,
        protos.google.iam.v1.ITestIamPermissionsRequest | undefined,
        {} | undefined
    ]>;
    testIamPermissions(request: protos.google.iam.v1.ITestIamPermissionsRequest, options: CallOptions, callback: Callback<protos.google.iam.v1.ITestIamPermissionsResponse, protos.google.iam.v1.ITestIamPermissionsRequest | null | undefined, {} | null | undefined>): void;
    testIamPermissions(request: protos.google.iam.v1.ITestIamPermissionsRequest, callback: Callback<protos.google.iam.v1.ITestIamPermissionsResponse, protos.google.iam.v1.ITestIamPermissionsRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets information about a logical view.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the requested logical view. Values are of the
     *   form `projects/{project}/instances/{instance}/logicalViews/{logical_view}`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.LogicalView|LogicalView}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.get_logical_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_GetLogicalView_async
     */
    getLogicalView(request?: protos.google.bigtable.admin.v2.IGetLogicalViewRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.ILogicalView,
        protos.google.bigtable.admin.v2.IGetLogicalViewRequest | undefined,
        {} | undefined
    ]>;
    getLogicalView(request: protos.google.bigtable.admin.v2.IGetLogicalViewRequest, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.ILogicalView, protos.google.bigtable.admin.v2.IGetLogicalViewRequest | null | undefined, {} | null | undefined>): void;
    getLogicalView(request: protos.google.bigtable.admin.v2.IGetLogicalViewRequest, callback: Callback<protos.google.bigtable.admin.v2.ILogicalView, protos.google.bigtable.admin.v2.IGetLogicalViewRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes a logical view from an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the logical view to be deleted.
     *   Format:
     *   `projects/{project}/instances/{instance}/logicalViews/{logical_view}`.
     * @param {string} [request.etag]
     *   Optional. The current etag of the logical view.
     *   If an etag is provided and does not match the current etag of the
     *   logical view, deletion will be blocked and an ABORTED error will be
     *   returned.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.protobuf.Empty|Empty}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.delete_logical_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_DeleteLogicalView_async
     */
    deleteLogicalView(request?: protos.google.bigtable.admin.v2.IDeleteLogicalViewRequest, options?: CallOptions): Promise<[
        protos.google.protobuf.IEmpty,
        protos.google.bigtable.admin.v2.IDeleteLogicalViewRequest | undefined,
        {} | undefined
    ]>;
    deleteLogicalView(request: protos.google.bigtable.admin.v2.IDeleteLogicalViewRequest, options: CallOptions, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteLogicalViewRequest | null | undefined, {} | null | undefined>): void;
    deleteLogicalView(request: protos.google.bigtable.admin.v2.IDeleteLogicalViewRequest, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteLogicalViewRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Gets information about a materialized view.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the requested materialized view. Values are of
     *   the form
     *   `projects/{project}/instances/{instance}/materializedViews/{materialized_view}`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.bigtable.admin.v2.MaterializedView|MaterializedView}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.get_materialized_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_GetMaterializedView_async
     */
    getMaterializedView(request?: protos.google.bigtable.admin.v2.IGetMaterializedViewRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IMaterializedView,
        protos.google.bigtable.admin.v2.IGetMaterializedViewRequest | undefined,
        {} | undefined
    ]>;
    getMaterializedView(request: protos.google.bigtable.admin.v2.IGetMaterializedViewRequest, options: CallOptions, callback: Callback<protos.google.bigtable.admin.v2.IMaterializedView, protos.google.bigtable.admin.v2.IGetMaterializedViewRequest | null | undefined, {} | null | undefined>): void;
    getMaterializedView(request: protos.google.bigtable.admin.v2.IGetMaterializedViewRequest, callback: Callback<protos.google.bigtable.admin.v2.IMaterializedView, protos.google.bigtable.admin.v2.IGetMaterializedViewRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Deletes a materialized view from an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   Required. The unique name of the materialized view to be deleted.
     *   Format:
     *   `projects/{project}/instances/{instance}/materializedViews/{materialized_view}`.
     * @param {string} [request.etag]
     *   Optional. The current etag of the materialized view.
     *   If an etag is provided and does not match the current etag of the
     *   materialized view, deletion will be blocked and an ABORTED error will be
     *   returned.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing {@link protos.google.protobuf.Empty|Empty}.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.delete_materialized_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_DeleteMaterializedView_async
     */
    deleteMaterializedView(request?: protos.google.bigtable.admin.v2.IDeleteMaterializedViewRequest, options?: CallOptions): Promise<[
        protos.google.protobuf.IEmpty,
        (protos.google.bigtable.admin.v2.IDeleteMaterializedViewRequest | undefined),
        {} | undefined
    ]>;
    deleteMaterializedView(request: protos.google.bigtable.admin.v2.IDeleteMaterializedViewRequest, options: CallOptions, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteMaterializedViewRequest | null | undefined, {} | null | undefined>): void;
    deleteMaterializedView(request: protos.google.bigtable.admin.v2.IDeleteMaterializedViewRequest, callback: Callback<protos.google.protobuf.IEmpty, protos.google.bigtable.admin.v2.IDeleteMaterializedViewRequest | null | undefined, {} | null | undefined>): void;
    /**
     * Create an instance within a project.
     *
     * Note that exactly one of Cluster.serve_nodes and
     * Cluster.cluster_config.cluster_autoscaling_config can be set. If
     * serve_nodes is set to non-zero, then the cluster is manually scaled. If
     * cluster_config.cluster_autoscaling_config is non-empty, then autoscaling is
     * enabled.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the project in which to create the new
     *   instance. Values are of the form `projects/{project}`.
     * @param {string} request.instanceId
     *   Required. The ID to be used when referring to the new instance within its
     *   project, e.g., just `myinstance` rather than
     *   `projects/myproject/instances/myinstance`.
     * @param {google.bigtable.admin.v2.Instance} request.instance
     *   Required. The instance to create.
     *   Fields marked `OutputOnly` must be left blank.
     * @param {number[]} request.clusters
     *   Required. The clusters to be created within the instance, mapped by desired
     *   cluster ID, e.g., just `mycluster` rather than
     *   `projects/myproject/instances/myinstance/clusters/mycluster`.
     *   Fields marked `OutputOnly` must be left blank.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_instance.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateInstance_async
     */
    createInstance(request?: protos.google.bigtable.admin.v2.ICreateInstanceRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.ICreateInstanceMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    createInstance(request: protos.google.bigtable.admin.v2.ICreateInstanceRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.ICreateInstanceMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    createInstance(request: protos.google.bigtable.admin.v2.ICreateInstanceRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.ICreateInstanceMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `createInstance()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_instance.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateInstance_async
     */
    checkCreateInstanceProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.Instance, protos.google.bigtable.admin.v2.CreateInstanceMetadata>>;
    /**
     * Partially updates an instance within a project. This method can modify all
     * fields of an Instance and is the preferred way to update an Instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.bigtable.admin.v2.Instance} request.instance
     *   Required. The Instance which will (partially) replace the current value.
     * @param {google.protobuf.FieldMask} request.updateMask
     *   Required. The subset of Instance fields which should be replaced.
     *   Must be explicitly set.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.partial_update_instance.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_PartialUpdateInstance_async
     */
    partialUpdateInstance(request?: protos.google.bigtable.admin.v2.IPartialUpdateInstanceRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.IUpdateInstanceMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    partialUpdateInstance(request: protos.google.bigtable.admin.v2.IPartialUpdateInstanceRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.IUpdateInstanceMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    partialUpdateInstance(request: protos.google.bigtable.admin.v2.IPartialUpdateInstanceRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IInstance, protos.google.bigtable.admin.v2.IUpdateInstanceMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `partialUpdateInstance()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.partial_update_instance.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_PartialUpdateInstance_async
     */
    checkPartialUpdateInstanceProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.Instance, protos.google.bigtable.admin.v2.UpdateInstanceMetadata>>;
    /**
     * Creates a cluster within an instance.
     *
     * Note that exactly one of Cluster.serve_nodes and
     * Cluster.cluster_config.cluster_autoscaling_config can be set. If
     * serve_nodes is set to non-zero, then the cluster is manually scaled. If
     * cluster_config.cluster_autoscaling_config is non-empty, then autoscaling is
     * enabled.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance in which to create the new
     *   cluster. Values are of the form `projects/{project}/instances/{instance}`.
     * @param {string} request.clusterId
     *   Required. The ID to be used when referring to the new cluster within its
     *   instance, e.g., just `mycluster` rather than
     *   `projects/myproject/instances/myinstance/clusters/mycluster`.
     * @param {google.bigtable.admin.v2.Cluster} request.cluster
     *   Required. The cluster to be created.
     *   Fields marked `OutputOnly` must be left blank.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_cluster.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateCluster_async
     */
    createCluster(request?: protos.google.bigtable.admin.v2.ICreateClusterRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.ICreateClusterMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    createCluster(request: protos.google.bigtable.admin.v2.ICreateClusterRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.ICreateClusterMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    createCluster(request: protos.google.bigtable.admin.v2.ICreateClusterRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.ICreateClusterMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `createCluster()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_cluster.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateCluster_async
     */
    checkCreateClusterProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.Cluster, protos.google.bigtable.admin.v2.CreateClusterMetadata>>;
    /**
     * Updates a cluster within an instance.
     *
     * Note that UpdateCluster does not support updating
     * cluster_config.cluster_autoscaling_config. In order to update it, you
     * must use PartialUpdateCluster.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.name
     *   The unique name of the cluster. Values are of the form
     *   `projects/{project}/instances/{instance}/clusters/{@link protos.-a-z0-9|a-z}*`.
     * @param {string} request.location
     *   Immutable. The location where this cluster's nodes and storage reside. For
     *   best performance, clients should be located as close as possible to this
     *   cluster. Currently only zones are supported, so values should be of the
     *   form `projects/{project}/locations/{zone}`.
     * @param {google.bigtable.admin.v2.Cluster.State} request.state
     *   Output only. The current state of the cluster.
     * @param {number} request.serveNodes
     *   The number of nodes in the cluster. If no value is set,
     *   Cloud Bigtable automatically allocates nodes based on your data footprint
     *   and optimized for 50% storage utilization.
     * @param {google.bigtable.admin.v2.Cluster.NodeScalingFactor} request.nodeScalingFactor
     *   Immutable. The node scaling factor of this cluster.
     * @param {google.bigtable.admin.v2.Cluster.ClusterConfig} request.clusterConfig
     *   Configuration for this cluster.
     * @param {google.bigtable.admin.v2.StorageType} request.defaultStorageType
     *   Immutable. The type of storage used by this cluster to serve its
     *   parent instance's tables, unless explicitly overridden.
     * @param {google.bigtable.admin.v2.Cluster.EncryptionConfig} request.encryptionConfig
     *   Immutable. The encryption configuration for CMEK-protected clusters.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_cluster.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateCluster_async
     */
    updateCluster(request?: protos.google.bigtable.admin.v2.ICluster, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.IUpdateClusterMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    updateCluster(request: protos.google.bigtable.admin.v2.ICluster, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.IUpdateClusterMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    updateCluster(request: protos.google.bigtable.admin.v2.ICluster, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.IUpdateClusterMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `updateCluster()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_cluster.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateCluster_async
     */
    checkUpdateClusterProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.Cluster, protos.google.bigtable.admin.v2.UpdateClusterMetadata>>;
    /**
     * Partially updates a cluster within a project. This method is the preferred
     * way to update a Cluster.
     *
     * To enable and update autoscaling, set
     * cluster_config.cluster_autoscaling_config. When autoscaling is enabled,
     * serve_nodes is treated as an OUTPUT_ONLY field, meaning that updates to it
     * are ignored. Note that an update cannot simultaneously set serve_nodes to
     * non-zero and cluster_config.cluster_autoscaling_config to non-empty, and
     * also specify both in the update_mask.
     *
     * To disable autoscaling, clear cluster_config.cluster_autoscaling_config,
     * and explicitly set a serve_node count via the update_mask.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.bigtable.admin.v2.Cluster} request.cluster
     *   Required. The Cluster which contains the partial updates to be applied,
     *   subject to the update_mask.
     * @param {google.protobuf.FieldMask} request.updateMask
     *   Required. The subset of Cluster fields which should be replaced.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.partial_update_cluster.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_PartialUpdateCluster_async
     */
    partialUpdateCluster(request?: protos.google.bigtable.admin.v2.IPartialUpdateClusterRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.IPartialUpdateClusterMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    partialUpdateCluster(request: protos.google.bigtable.admin.v2.IPartialUpdateClusterRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.IPartialUpdateClusterMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    partialUpdateCluster(request: protos.google.bigtable.admin.v2.IPartialUpdateClusterRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ICluster, protos.google.bigtable.admin.v2.IPartialUpdateClusterMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `partialUpdateCluster()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.partial_update_cluster.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_PartialUpdateCluster_async
     */
    checkPartialUpdateClusterProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.Cluster, protos.google.bigtable.admin.v2.PartialUpdateClusterMetadata>>;
    /**
     * Updates an app profile within an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.bigtable.admin.v2.AppProfile} request.appProfile
     *   Required. The app profile which will (partially) replace the current value.
     * @param {google.protobuf.FieldMask} request.updateMask
     *   Required. The subset of app profile fields which should be replaced.
     *   If unset, all fields will be replaced.
     * @param {boolean} request.ignoreWarnings
     *   If true, ignore safety checks when updating the app profile.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_app_profile.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateAppProfile_async
     */
    updateAppProfile(request?: protos.google.bigtable.admin.v2.IUpdateAppProfileRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.IAppProfile, protos.google.bigtable.admin.v2.IUpdateAppProfileMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    updateAppProfile(request: protos.google.bigtable.admin.v2.IUpdateAppProfileRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IAppProfile, protos.google.bigtable.admin.v2.IUpdateAppProfileMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    updateAppProfile(request: protos.google.bigtable.admin.v2.IUpdateAppProfileRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IAppProfile, protos.google.bigtable.admin.v2.IUpdateAppProfileMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `updateAppProfile()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_app_profile.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateAppProfile_async
     */
    checkUpdateAppProfileProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.AppProfile, protos.google.bigtable.admin.v2.UpdateAppProfileMetadata>>;
    /**
     * Creates a logical view within an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent instance where this logical view will be created.
     *   Format: `projects/{project}/instances/{instance}`.
     * @param {string} request.logicalViewId
     *   Required. The ID to use for the logical view, which will become the final
     *   component of the logical view's resource name.
     * @param {google.bigtable.admin.v2.LogicalView} request.logicalView
     *   Required. The logical view to create.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_logical_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateLogicalView_async
     */
    createLogicalView(request?: protos.google.bigtable.admin.v2.ICreateLogicalViewRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.ILogicalView, protos.google.bigtable.admin.v2.ICreateLogicalViewMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    createLogicalView(request: protos.google.bigtable.admin.v2.ICreateLogicalViewRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ILogicalView, protos.google.bigtable.admin.v2.ICreateLogicalViewMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    createLogicalView(request: protos.google.bigtable.admin.v2.ICreateLogicalViewRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ILogicalView, protos.google.bigtable.admin.v2.ICreateLogicalViewMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `createLogicalView()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_logical_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateLogicalView_async
     */
    checkCreateLogicalViewProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.LogicalView, protos.google.bigtable.admin.v2.CreateLogicalViewMetadata>>;
    /**
     * Updates a logical view within an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.bigtable.admin.v2.LogicalView} request.logicalView
     *   Required. The logical view to update.
     *
     *   The logical view's `name` field is used to identify the view to update.
     *   Format:
     *   `projects/{project}/instances/{instance}/logicalViews/{logical_view}`.
     * @param {google.protobuf.FieldMask} [request.updateMask]
     *   Optional. The list of fields to update.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_logical_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateLogicalView_async
     */
    updateLogicalView(request?: protos.google.bigtable.admin.v2.IUpdateLogicalViewRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.ILogicalView, protos.google.bigtable.admin.v2.IUpdateLogicalViewMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    updateLogicalView(request: protos.google.bigtable.admin.v2.IUpdateLogicalViewRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ILogicalView, protos.google.bigtable.admin.v2.IUpdateLogicalViewMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    updateLogicalView(request: protos.google.bigtable.admin.v2.IUpdateLogicalViewRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.ILogicalView, protos.google.bigtable.admin.v2.IUpdateLogicalViewMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `updateLogicalView()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_logical_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateLogicalView_async
     */
    checkUpdateLogicalViewProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.LogicalView, protos.google.bigtable.admin.v2.UpdateLogicalViewMetadata>>;
    /**
     * Creates a materialized view within an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent instance where this materialized view will be created.
     *   Format: `projects/{project}/instances/{instance}`.
     * @param {string} request.materializedViewId
     *   Required. The ID to use for the materialized view, which will become the
     *   final component of the materialized view's resource name.
     * @param {google.bigtable.admin.v2.MaterializedView} request.materializedView
     *   Required. The materialized view to create.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_materialized_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateMaterializedView_async
     */
    createMaterializedView(request?: protos.google.bigtable.admin.v2.ICreateMaterializedViewRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.IMaterializedView, protos.google.bigtable.admin.v2.ICreateMaterializedViewMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    createMaterializedView(request: protos.google.bigtable.admin.v2.ICreateMaterializedViewRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IMaterializedView, protos.google.bigtable.admin.v2.ICreateMaterializedViewMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    createMaterializedView(request: protos.google.bigtable.admin.v2.ICreateMaterializedViewRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IMaterializedView, protos.google.bigtable.admin.v2.ICreateMaterializedViewMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `createMaterializedView()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.create_materialized_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_CreateMaterializedView_async
     */
    checkCreateMaterializedViewProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.MaterializedView, protos.google.bigtable.admin.v2.CreateMaterializedViewMetadata>>;
    /**
     * Updates a materialized view within an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {google.bigtable.admin.v2.MaterializedView} request.materializedView
     *   Required. The materialized view to update.
     *
     *   The materialized view's `name` field is used to identify the view to
     *   update. Format:
     *   `projects/{project}/instances/{instance}/materializedViews/{materialized_view}`.
     * @param {google.protobuf.FieldMask} [request.updateMask]
     *   Optional. The list of fields to update.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is an object representing
     *   a long running operation. Its `promise()` method returns a promise
     *   you can `await` for.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_materialized_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateMaterializedView_async
     */
    updateMaterializedView(request?: protos.google.bigtable.admin.v2.IUpdateMaterializedViewRequest, options?: CallOptions): Promise<[
        LROperation<protos.google.bigtable.admin.v2.IMaterializedView, protos.google.bigtable.admin.v2.IUpdateMaterializedViewMetadata>,
        protos.google.longrunning.IOperation | undefined,
        {} | undefined
    ]>;
    updateMaterializedView(request: protos.google.bigtable.admin.v2.IUpdateMaterializedViewRequest, options: CallOptions, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IMaterializedView, protos.google.bigtable.admin.v2.IUpdateMaterializedViewMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    updateMaterializedView(request: protos.google.bigtable.admin.v2.IUpdateMaterializedViewRequest, callback: Callback<LROperation<protos.google.bigtable.admin.v2.IMaterializedView, protos.google.bigtable.admin.v2.IUpdateMaterializedViewMetadata>, protos.google.longrunning.IOperation | null | undefined, {} | null | undefined>): void;
    /**
     * Check the status of the long running operation returned by `updateMaterializedView()`.
     * @param {String} name
     *   The operation name that will be passed.
     * @returns {Promise} - The promise which resolves to an object.
     *   The decoded operation object has result and metadata field to get information from.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#long-running-operations | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.update_materialized_view.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_UpdateMaterializedView_async
     */
    checkUpdateMaterializedViewProgress(name: string): Promise<LROperation<protos.google.bigtable.admin.v2.MaterializedView, protos.google.bigtable.admin.v2.UpdateMaterializedViewMetadata>>;
    /**
     * Lists information about app profiles in an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which a list of app profiles
     *   is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     *   Use `{instance} = '-'` to list AppProfiles for all Instances in a project,
     *   e.g., `projects/myproject/instances/-`.
     * @param {number} request.pageSize
     *   Maximum number of results per page.
     *
     *   A page_size of zero lets the server choose the number of items to return.
     *   A page_size which is strictly positive will return at most that many items.
     *   A negative page_size will cause an error.
     *
     *   Following the first request, subsequent paginated calls are not required
     *   to pass a page_size. If a page_size is set in subsequent calls, it must
     *   match the page_size given in the first request.
     * @param {string} request.pageToken
     *   The value of `next_page_token` returned by a previous call.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link protos.google.bigtable.admin.v2.AppProfile|AppProfile}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listAppProfilesAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     */
    listAppProfiles(request?: protos.google.bigtable.admin.v2.IListAppProfilesRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IAppProfile[],
        protos.google.bigtable.admin.v2.IListAppProfilesRequest | null,
        protos.google.bigtable.admin.v2.IListAppProfilesResponse
    ]>;
    listAppProfiles(request: protos.google.bigtable.admin.v2.IListAppProfilesRequest, options: CallOptions, callback: PaginationCallback<protos.google.bigtable.admin.v2.IListAppProfilesRequest, protos.google.bigtable.admin.v2.IListAppProfilesResponse | null | undefined, protos.google.bigtable.admin.v2.IAppProfile>): void;
    listAppProfiles(request: protos.google.bigtable.admin.v2.IListAppProfilesRequest, callback: PaginationCallback<protos.google.bigtable.admin.v2.IListAppProfilesRequest, protos.google.bigtable.admin.v2.IListAppProfilesResponse | null | undefined, protos.google.bigtable.admin.v2.IAppProfile>): void;
    /**
     * Equivalent to `listAppProfiles`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which a list of app profiles
     *   is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     *   Use `{instance} = '-'` to list AppProfiles for all Instances in a project,
     *   e.g., `projects/myproject/instances/-`.
     * @param {number} request.pageSize
     *   Maximum number of results per page.
     *
     *   A page_size of zero lets the server choose the number of items to return.
     *   A page_size which is strictly positive will return at most that many items.
     *   A negative page_size will cause an error.
     *
     *   Following the first request, subsequent paginated calls are not required
     *   to pass a page_size. If a page_size is set in subsequent calls, it must
     *   match the page_size given in the first request.
     * @param {string} request.pageToken
     *   The value of `next_page_token` returned by a previous call.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link protos.google.bigtable.admin.v2.AppProfile|AppProfile} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listAppProfilesAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     */
    listAppProfilesStream(request?: protos.google.bigtable.admin.v2.IListAppProfilesRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `listAppProfiles`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which a list of app profiles
     *   is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     *   Use `{instance} = '-'` to list AppProfiles for all Instances in a project,
     *   e.g., `projects/myproject/instances/-`.
     * @param {number} request.pageSize
     *   Maximum number of results per page.
     *
     *   A page_size of zero lets the server choose the number of items to return.
     *   A page_size which is strictly positive will return at most that many items.
     *   A negative page_size will cause an error.
     *
     *   Following the first request, subsequent paginated calls are not required
     *   to pass a page_size. If a page_size is set in subsequent calls, it must
     *   match the page_size given in the first request.
     * @param {string} request.pageToken
     *   The value of `next_page_token` returned by a previous call.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols | async iteration }.
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link protos.google.bigtable.admin.v2.AppProfile|AppProfile}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.list_app_profiles.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_ListAppProfiles_async
     */
    listAppProfilesAsync(request?: protos.google.bigtable.admin.v2.IListAppProfilesRequest, options?: CallOptions): AsyncIterable<protos.google.bigtable.admin.v2.IAppProfile>;
    /**
     * Lists hot tablets in a cluster, within the time range provided. Hot
     * tablets are ordered based on CPU usage.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The cluster name to list hot tablets.
     *   Value is in the following form:
     *   `projects/{project}/instances/{instance}/clusters/{cluster}`.
     * @param {google.protobuf.Timestamp} request.startTime
     *   The start time to list hot tablets. The hot tablets in the response will
     *   have start times between the requested start time and end time. Start time
     *   defaults to Now if it is unset, and end time defaults to Now - 24 hours if
     *   it is unset. The start time should be less than the end time, and the
     *   maximum allowed time range between start time and end time is 48 hours.
     *   Start time and end time should have values between Now and Now - 14 days.
     * @param {google.protobuf.Timestamp} request.endTime
     *   The end time to list hot tablets.
     * @param {number} request.pageSize
     *   Maximum number of results per page.
     *
     *   A page_size that is empty or zero lets the server choose the number of
     *   items to return. A page_size which is strictly positive will return at most
     *   that many items. A negative page_size will cause an error.
     *
     *   Following the first request, subsequent paginated calls do not need a
     *   page_size field. If a page_size is set in subsequent calls, it must match
     *   the page_size given in the first request.
     * @param {string} request.pageToken
     *   The value of `next_page_token` returned by a previous call.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link protos.google.bigtable.admin.v2.HotTablet|HotTablet}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listHotTabletsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     */
    listHotTablets(request?: protos.google.bigtable.admin.v2.IListHotTabletsRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IHotTablet[],
        protos.google.bigtable.admin.v2.IListHotTabletsRequest | null,
        protos.google.bigtable.admin.v2.IListHotTabletsResponse
    ]>;
    listHotTablets(request: protos.google.bigtable.admin.v2.IListHotTabletsRequest, options: CallOptions, callback: PaginationCallback<protos.google.bigtable.admin.v2.IListHotTabletsRequest, protos.google.bigtable.admin.v2.IListHotTabletsResponse | null | undefined, protos.google.bigtable.admin.v2.IHotTablet>): void;
    listHotTablets(request: protos.google.bigtable.admin.v2.IListHotTabletsRequest, callback: PaginationCallback<protos.google.bigtable.admin.v2.IListHotTabletsRequest, protos.google.bigtable.admin.v2.IListHotTabletsResponse | null | undefined, protos.google.bigtable.admin.v2.IHotTablet>): void;
    /**
     * Equivalent to `listHotTablets`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The cluster name to list hot tablets.
     *   Value is in the following form:
     *   `projects/{project}/instances/{instance}/clusters/{cluster}`.
     * @param {google.protobuf.Timestamp} request.startTime
     *   The start time to list hot tablets. The hot tablets in the response will
     *   have start times between the requested start time and end time. Start time
     *   defaults to Now if it is unset, and end time defaults to Now - 24 hours if
     *   it is unset. The start time should be less than the end time, and the
     *   maximum allowed time range between start time and end time is 48 hours.
     *   Start time and end time should have values between Now and Now - 14 days.
     * @param {google.protobuf.Timestamp} request.endTime
     *   The end time to list hot tablets.
     * @param {number} request.pageSize
     *   Maximum number of results per page.
     *
     *   A page_size that is empty or zero lets the server choose the number of
     *   items to return. A page_size which is strictly positive will return at most
     *   that many items. A negative page_size will cause an error.
     *
     *   Following the first request, subsequent paginated calls do not need a
     *   page_size field. If a page_size is set in subsequent calls, it must match
     *   the page_size given in the first request.
     * @param {string} request.pageToken
     *   The value of `next_page_token` returned by a previous call.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link protos.google.bigtable.admin.v2.HotTablet|HotTablet} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listHotTabletsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     */
    listHotTabletsStream(request?: protos.google.bigtable.admin.v2.IListHotTabletsRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `listHotTablets`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The cluster name to list hot tablets.
     *   Value is in the following form:
     *   `projects/{project}/instances/{instance}/clusters/{cluster}`.
     * @param {google.protobuf.Timestamp} request.startTime
     *   The start time to list hot tablets. The hot tablets in the response will
     *   have start times between the requested start time and end time. Start time
     *   defaults to Now if it is unset, and end time defaults to Now - 24 hours if
     *   it is unset. The start time should be less than the end time, and the
     *   maximum allowed time range between start time and end time is 48 hours.
     *   Start time and end time should have values between Now and Now - 14 days.
     * @param {google.protobuf.Timestamp} request.endTime
     *   The end time to list hot tablets.
     * @param {number} request.pageSize
     *   Maximum number of results per page.
     *
     *   A page_size that is empty or zero lets the server choose the number of
     *   items to return. A page_size which is strictly positive will return at most
     *   that many items. A negative page_size will cause an error.
     *
     *   Following the first request, subsequent paginated calls do not need a
     *   page_size field. If a page_size is set in subsequent calls, it must match
     *   the page_size given in the first request.
     * @param {string} request.pageToken
     *   The value of `next_page_token` returned by a previous call.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols | async iteration }.
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link protos.google.bigtable.admin.v2.HotTablet|HotTablet}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.list_hot_tablets.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_ListHotTablets_async
     */
    listHotTabletsAsync(request?: protos.google.bigtable.admin.v2.IListHotTabletsRequest, options?: CallOptions): AsyncIterable<protos.google.bigtable.admin.v2.IHotTablet>;
    /**
     * Lists information about logical views in an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which the list of logical
     *   views is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of logical views to return. The service may
     *   return fewer than this value
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListLogicalViews` call.
     *   Provide this to retrieve the subsequent page.
     *
     *   When paginating, all other parameters provided to `ListLogicalViews` must
     *   match the call that provided the page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link protos.google.bigtable.admin.v2.LogicalView|LogicalView}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listLogicalViewsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     */
    listLogicalViews(request?: protos.google.bigtable.admin.v2.IListLogicalViewsRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.ILogicalView[],
        protos.google.bigtable.admin.v2.IListLogicalViewsRequest | null,
        protos.google.bigtable.admin.v2.IListLogicalViewsResponse
    ]>;
    listLogicalViews(request: protos.google.bigtable.admin.v2.IListLogicalViewsRequest, options: CallOptions, callback: PaginationCallback<protos.google.bigtable.admin.v2.IListLogicalViewsRequest, protos.google.bigtable.admin.v2.IListLogicalViewsResponse | null | undefined, protos.google.bigtable.admin.v2.ILogicalView>): void;
    listLogicalViews(request: protos.google.bigtable.admin.v2.IListLogicalViewsRequest, callback: PaginationCallback<protos.google.bigtable.admin.v2.IListLogicalViewsRequest, protos.google.bigtable.admin.v2.IListLogicalViewsResponse | null | undefined, protos.google.bigtable.admin.v2.ILogicalView>): void;
    /**
     * Equivalent to `listLogicalViews`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which the list of logical
     *   views is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of logical views to return. The service may
     *   return fewer than this value
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListLogicalViews` call.
     *   Provide this to retrieve the subsequent page.
     *
     *   When paginating, all other parameters provided to `ListLogicalViews` must
     *   match the call that provided the page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link protos.google.bigtable.admin.v2.LogicalView|LogicalView} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listLogicalViewsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     */
    listLogicalViewsStream(request?: protos.google.bigtable.admin.v2.IListLogicalViewsRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `listLogicalViews`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which the list of logical
     *   views is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of logical views to return. The service may
     *   return fewer than this value
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListLogicalViews` call.
     *   Provide this to retrieve the subsequent page.
     *
     *   When paginating, all other parameters provided to `ListLogicalViews` must
     *   match the call that provided the page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols | async iteration }.
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link protos.google.bigtable.admin.v2.LogicalView|LogicalView}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.list_logical_views.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_ListLogicalViews_async
     */
    listLogicalViewsAsync(request?: protos.google.bigtable.admin.v2.IListLogicalViewsRequest, options?: CallOptions): AsyncIterable<protos.google.bigtable.admin.v2.ILogicalView>;
    /**
     * Lists information about materialized views in an instance.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which the list of
     *   materialized views is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of materialized views to return. The service
     *   may return fewer than this value
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListMaterializedViews`
     *   call. Provide this to retrieve the subsequent page.
     *
     *   When paginating, all other parameters provided to `ListMaterializedViews`
     *   must match the call that provided the page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Promise} - The promise which resolves to an array.
     *   The first element of the array is Array of {@link protos.google.bigtable.admin.v2.MaterializedView|MaterializedView}.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed and will merge results from all the pages into this array.
     *   Note that it can affect your quota.
     *   We recommend using `listMaterializedViewsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     */
    listMaterializedViews(request?: protos.google.bigtable.admin.v2.IListMaterializedViewsRequest, options?: CallOptions): Promise<[
        protos.google.bigtable.admin.v2.IMaterializedView[],
        protos.google.bigtable.admin.v2.IListMaterializedViewsRequest | null,
        protos.google.bigtable.admin.v2.IListMaterializedViewsResponse
    ]>;
    listMaterializedViews(request: protos.google.bigtable.admin.v2.IListMaterializedViewsRequest, options: CallOptions, callback: PaginationCallback<protos.google.bigtable.admin.v2.IListMaterializedViewsRequest, protos.google.bigtable.admin.v2.IListMaterializedViewsResponse | null | undefined, protos.google.bigtable.admin.v2.IMaterializedView>): void;
    listMaterializedViews(request: protos.google.bigtable.admin.v2.IListMaterializedViewsRequest, callback: PaginationCallback<protos.google.bigtable.admin.v2.IListMaterializedViewsRequest, protos.google.bigtable.admin.v2.IListMaterializedViewsResponse | null | undefined, protos.google.bigtable.admin.v2.IMaterializedView>): void;
    /**
     * Equivalent to `listMaterializedViews`, but returns a NodeJS Stream object.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which the list of
     *   materialized views is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of materialized views to return. The service
     *   may return fewer than this value
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListMaterializedViews`
     *   call. Provide this to retrieve the subsequent page.
     *
     *   When paginating, all other parameters provided to `ListMaterializedViews`
     *   must match the call that provided the page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing {@link protos.google.bigtable.admin.v2.MaterializedView|MaterializedView} on 'data' event.
     *   The client library will perform auto-pagination by default: it will call the API as many
     *   times as needed. Note that it can affect your quota.
     *   We recommend using `listMaterializedViewsAsync()`
     *   method described below for async iteration which you can stop as needed.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     */
    listMaterializedViewsStream(request?: protos.google.bigtable.admin.v2.IListMaterializedViewsRequest, options?: CallOptions): Transform;
    /**
     * Equivalent to `listMaterializedViews`, but returns an iterable object.
     *
     * `for`-`await`-`of` syntax is used with the iterable to get response elements on-demand.
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The unique name of the instance for which the list of
     *   materialized views is requested. Values are of the form
     *   `projects/{project}/instances/{instance}`.
     * @param {number} [request.pageSize]
     *   Optional. The maximum number of materialized views to return. The service
     *   may return fewer than this value
     * @param {string} [request.pageToken]
     *   Optional. A page token, received from a previous `ListMaterializedViews`
     *   call. Provide this to retrieve the subsequent page.
     *
     *   When paginating, all other parameters provided to `ListMaterializedViews`
     *   must match the call that provided the page token.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Object}
     *   An iterable Object that allows {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols | async iteration }.
     *   When you iterate the returned iterable, each element will be an object representing
     *   {@link protos.google.bigtable.admin.v2.MaterializedView|MaterializedView}. The API will be called under the hood as needed, once per the page,
     *   so you can stop the iteration when you don't need more results.
     *   Please see the {@link https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#auto-pagination | documentation }
     *   for more details and examples.
     * @example <caption>include:samples/generated/v2/bigtable_instance_admin.list_materialized_views.js</caption>
     * region_tag:bigtableadmin_v2_generated_BigtableInstanceAdmin_ListMaterializedViews_async
     */
    listMaterializedViewsAsync(request?: protos.google.bigtable.admin.v2.IListMaterializedViewsRequest, options?: CallOptions): AsyncIterable<protos.google.bigtable.admin.v2.IMaterializedView>;
    /**
     * Return a fully-qualified appProfile resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} app_profile
     * @returns {string} Resource name string.
     */
    appProfilePath(project: string, instance: string, appProfile: string): string;
    /**
     * Parse the project from AppProfile resource.
     *
     * @param {string} appProfileName
     *   A fully-qualified path representing AppProfile resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromAppProfileName(appProfileName: string): string | number;
    /**
     * Parse the instance from AppProfile resource.
     *
     * @param {string} appProfileName
     *   A fully-qualified path representing AppProfile resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromAppProfileName(appProfileName: string): string | number;
    /**
     * Parse the app_profile from AppProfile resource.
     *
     * @param {string} appProfileName
     *   A fully-qualified path representing AppProfile resource.
     * @returns {string} A string representing the app_profile.
     */
    matchAppProfileFromAppProfileName(appProfileName: string): string | number;
    /**
     * Return a fully-qualified authorizedView resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} table
     * @param {string} authorized_view
     * @returns {string} Resource name string.
     */
    authorizedViewPath(project: string, instance: string, table: string, authorizedView: string): string;
    /**
     * Parse the project from AuthorizedView resource.
     *
     * @param {string} authorizedViewName
     *   A fully-qualified path representing AuthorizedView resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromAuthorizedViewName(authorizedViewName: string): string | number;
    /**
     * Parse the instance from AuthorizedView resource.
     *
     * @param {string} authorizedViewName
     *   A fully-qualified path representing AuthorizedView resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromAuthorizedViewName(authorizedViewName: string): string | number;
    /**
     * Parse the table from AuthorizedView resource.
     *
     * @param {string} authorizedViewName
     *   A fully-qualified path representing AuthorizedView resource.
     * @returns {string} A string representing the table.
     */
    matchTableFromAuthorizedViewName(authorizedViewName: string): string | number;
    /**
     * Parse the authorized_view from AuthorizedView resource.
     *
     * @param {string} authorizedViewName
     *   A fully-qualified path representing AuthorizedView resource.
     * @returns {string} A string representing the authorized_view.
     */
    matchAuthorizedViewFromAuthorizedViewName(authorizedViewName: string): string | number;
    /**
     * Return a fully-qualified backup resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} cluster
     * @param {string} backup
     * @returns {string} Resource name string.
     */
    backupPath(project: string, instance: string, cluster: string, backup: string): string;
    /**
     * Parse the project from Backup resource.
     *
     * @param {string} backupName
     *   A fully-qualified path representing Backup resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromBackupName(backupName: string): string | number;
    /**
     * Parse the instance from Backup resource.
     *
     * @param {string} backupName
     *   A fully-qualified path representing Backup resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromBackupName(backupName: string): string | number;
    /**
     * Parse the cluster from Backup resource.
     *
     * @param {string} backupName
     *   A fully-qualified path representing Backup resource.
     * @returns {string} A string representing the cluster.
     */
    matchClusterFromBackupName(backupName: string): string | number;
    /**
     * Parse the backup from Backup resource.
     *
     * @param {string} backupName
     *   A fully-qualified path representing Backup resource.
     * @returns {string} A string representing the backup.
     */
    matchBackupFromBackupName(backupName: string): string | number;
    /**
     * Return a fully-qualified cluster resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} cluster
     * @returns {string} Resource name string.
     */
    clusterPath(project: string, instance: string, cluster: string): string;
    /**
     * Parse the project from Cluster resource.
     *
     * @param {string} clusterName
     *   A fully-qualified path representing Cluster resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromClusterName(clusterName: string): string | number;
    /**
     * Parse the instance from Cluster resource.
     *
     * @param {string} clusterName
     *   A fully-qualified path representing Cluster resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromClusterName(clusterName: string): string | number;
    /**
     * Parse the cluster from Cluster resource.
     *
     * @param {string} clusterName
     *   A fully-qualified path representing Cluster resource.
     * @returns {string} A string representing the cluster.
     */
    matchClusterFromClusterName(clusterName: string): string | number;
    /**
     * Return a fully-qualified hotTablet resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} cluster
     * @param {string} hot_tablet
     * @returns {string} Resource name string.
     */
    hotTabletPath(project: string, instance: string, cluster: string, hotTablet: string): string;
    /**
     * Parse the project from HotTablet resource.
     *
     * @param {string} hotTabletName
     *   A fully-qualified path representing HotTablet resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromHotTabletName(hotTabletName: string): string | number;
    /**
     * Parse the instance from HotTablet resource.
     *
     * @param {string} hotTabletName
     *   A fully-qualified path representing HotTablet resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromHotTabletName(hotTabletName: string): string | number;
    /**
     * Parse the cluster from HotTablet resource.
     *
     * @param {string} hotTabletName
     *   A fully-qualified path representing HotTablet resource.
     * @returns {string} A string representing the cluster.
     */
    matchClusterFromHotTabletName(hotTabletName: string): string | number;
    /**
     * Parse the hot_tablet from HotTablet resource.
     *
     * @param {string} hotTabletName
     *   A fully-qualified path representing HotTablet resource.
     * @returns {string} A string representing the hot_tablet.
     */
    matchHotTabletFromHotTabletName(hotTabletName: string): string | number;
    /**
     * Return a fully-qualified instance resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @returns {string} Resource name string.
     */
    instancePath(project: string, instance: string): string;
    /**
     * Parse the project from Instance resource.
     *
     * @param {string} instanceName
     *   A fully-qualified path representing Instance resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromInstanceName(instanceName: string): string | number;
    /**
     * Parse the instance from Instance resource.
     *
     * @param {string} instanceName
     *   A fully-qualified path representing Instance resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromInstanceName(instanceName: string): string | number;
    /**
     * Return a fully-qualified logicalView resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} logical_view
     * @returns {string} Resource name string.
     */
    logicalViewPath(project: string, instance: string, logicalView: string): string;
    /**
     * Parse the project from LogicalView resource.
     *
     * @param {string} logicalViewName
     *   A fully-qualified path representing LogicalView resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromLogicalViewName(logicalViewName: string): string | number;
    /**
     * Parse the instance from LogicalView resource.
     *
     * @param {string} logicalViewName
     *   A fully-qualified path representing LogicalView resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromLogicalViewName(logicalViewName: string): string | number;
    /**
     * Parse the logical_view from LogicalView resource.
     *
     * @param {string} logicalViewName
     *   A fully-qualified path representing LogicalView resource.
     * @returns {string} A string representing the logical_view.
     */
    matchLogicalViewFromLogicalViewName(logicalViewName: string): string | number;
    /**
     * Return a fully-qualified materializedView resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} materialized_view
     * @returns {string} Resource name string.
     */
    materializedViewPath(project: string, instance: string, materializedView: string): string;
    /**
     * Parse the project from MaterializedView resource.
     *
     * @param {string} materializedViewName
     *   A fully-qualified path representing MaterializedView resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromMaterializedViewName(materializedViewName: string): string | number;
    /**
     * Parse the instance from MaterializedView resource.
     *
     * @param {string} materializedViewName
     *   A fully-qualified path representing MaterializedView resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromMaterializedViewName(materializedViewName: string): string | number;
    /**
     * Parse the materialized_view from MaterializedView resource.
     *
     * @param {string} materializedViewName
     *   A fully-qualified path representing MaterializedView resource.
     * @returns {string} A string representing the materialized_view.
     */
    matchMaterializedViewFromMaterializedViewName(materializedViewName: string): string | number;
    /**
     * Return a fully-qualified project resource name string.
     *
     * @param {string} project
     * @returns {string} Resource name string.
     */
    projectPath(project: string): string;
    /**
     * Parse the project from Project resource.
     *
     * @param {string} projectName
     *   A fully-qualified path representing Project resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromProjectName(projectName: string): string | number;
    /**
     * Return a fully-qualified snapshot resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} cluster
     * @param {string} snapshot
     * @returns {string} Resource name string.
     */
    snapshotPath(project: string, instance: string, cluster: string, snapshot: string): string;
    /**
     * Parse the project from Snapshot resource.
     *
     * @param {string} snapshotName
     *   A fully-qualified path representing Snapshot resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromSnapshotName(snapshotName: string): string | number;
    /**
     * Parse the instance from Snapshot resource.
     *
     * @param {string} snapshotName
     *   A fully-qualified path representing Snapshot resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromSnapshotName(snapshotName: string): string | number;
    /**
     * Parse the cluster from Snapshot resource.
     *
     * @param {string} snapshotName
     *   A fully-qualified path representing Snapshot resource.
     * @returns {string} A string representing the cluster.
     */
    matchClusterFromSnapshotName(snapshotName: string): string | number;
    /**
     * Parse the snapshot from Snapshot resource.
     *
     * @param {string} snapshotName
     *   A fully-qualified path representing Snapshot resource.
     * @returns {string} A string representing the snapshot.
     */
    matchSnapshotFromSnapshotName(snapshotName: string): string | number;
    /**
     * Return a fully-qualified table resource name string.
     *
     * @param {string} project
     * @param {string} instance
     * @param {string} table
     * @returns {string} Resource name string.
     */
    tablePath(project: string, instance: string, table: string): string;
    /**
     * Parse the project from Table resource.
     *
     * @param {string} tableName
     *   A fully-qualified path representing Table resource.
     * @returns {string} A string representing the project.
     */
    matchProjectFromTableName(tableName: string): string | number;
    /**
     * Parse the instance from Table resource.
     *
     * @param {string} tableName
     *   A fully-qualified path representing Table resource.
     * @returns {string} A string representing the instance.
     */
    matchInstanceFromTableName(tableName: string): string | number;
    /**
     * Parse the table from Table resource.
     *
     * @param {string} tableName
     *   A fully-qualified path representing Table resource.
     * @returns {string} A string representing the table.
     */
    matchTableFromTableName(tableName: string): string | number;
    /**
     * Terminate the gRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     * @returns {Promise} A promise that resolves when the client is closed.
     */
    close(): Promise<void>;
}
