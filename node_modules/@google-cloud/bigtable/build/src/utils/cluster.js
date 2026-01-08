"use strict";
// Copyright 2022 Google LLC
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
exports.ClusterUtils = void 0;
const cluster_1 = require("../cluster");
const precise_date_1 = require("@google-cloud/precise-date");
class ClusterUtils {
    static noConfigError = 'Must specify either serve_nodes or all of the autoscaling configurations (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).';
    static allConfigError = 'Cannot specify both serve_nodes and autoscaling configurations (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).';
    static incompleteConfigError = 'All of autoscaling configurations must be specified at the same time (min_serve_nodes, max_serve_nodes, and cpu_utilization_percent).';
    static validateClusterMetadata(metadata) {
        if (metadata.nodes) {
            if (metadata.minServeNodes ||
                metadata.maxServeNodes ||
                metadata.cpuUtilizationPercent) {
                throw new Error(this.allConfigError);
            }
        }
        else {
            if (metadata.minServeNodes ||
                metadata.maxServeNodes ||
                metadata.cpuUtilizationPercent) {
                if (!(metadata.minServeNodes &&
                    metadata.maxServeNodes &&
                    metadata.cpuUtilizationPercent)) {
                    throw new Error(this.incompleteConfigError);
                }
            }
            else {
                throw new Error(this.noConfigError);
            }
        }
    }
    static getUpdateMask(metadata) {
        const updateMask = [];
        if (metadata.nodes) {
            updateMask.push('serve_nodes');
            if (!(metadata.minServeNodes ||
                metadata.maxServeNodes ||
                metadata.cpuUtilizationPercent)) {
                updateMask.push('cluster_config.cluster_autoscaling_config');
            }
        }
        if (metadata.minServeNodes) {
            updateMask.push('cluster_config.cluster_autoscaling_config.autoscaling_limits.min_serve_nodes');
        }
        if (metadata.maxServeNodes) {
            updateMask.push('cluster_config.cluster_autoscaling_config.autoscaling_limits.max_serve_nodes');
        }
        if (metadata.cpuUtilizationPercent) {
            updateMask.push('cluster_config.cluster_autoscaling_config.autoscaling_targets.cpu_utilization_percent');
        }
        return updateMask;
    }
    static getClusterBaseConfigWithFullLocation(metadata, projectId, name) {
        const metadataClone = Object.assign({}, metadata);
        if (metadataClone.location) {
            metadataClone.location = cluster_1.Cluster.getLocation_(projectId, metadataClone.location);
        }
        return ClusterUtils.getClusterBaseConfig(metadataClone, name);
    }
    static getClusterBaseConfig(metadata, name) {
        let clusterConfig;
        if (metadata.cpuUtilizationPercent ||
            metadata.minServeNodes ||
            metadata.maxServeNodes) {
            clusterConfig = {
                clusterAutoscalingConfig: {
                    autoscalingTargets: {
                        cpuUtilizationPercent: metadata.cpuUtilizationPercent,
                    },
                    autoscalingLimits: {
                        minServeNodes: metadata.minServeNodes,
                        maxServeNodes: metadata.maxServeNodes,
                    },
                },
            };
        }
        const location = metadata?.location;
        return Object.assign({}, name ? { name } : null, location ? { location } : null, clusterConfig ? { clusterConfig } : null, metadata.nodes ? { serveNodes: metadata.nodes } : null);
    }
    static getClusterFromMetadata(metadata, name) {
        const cluster = Object.assign({}, this.getClusterBaseConfig(metadata, name), metadata);
        delete cluster.nodes;
        delete cluster.minServeNodes;
        delete cluster.maxServeNodes;
        delete cluster.cpuUtilizationPercent;
        return cluster;
    }
    static getRequestFromMetadata(metadata, name) {
        return {
            cluster: this.getClusterFromMetadata(metadata, name),
            updateMask: { paths: this.getUpdateMask(metadata) },
        };
    }
    static formatBackupExpiryTime(backup) {
        if (backup.expireTime instanceof Date) {
            backup.expireTime = new precise_date_1.PreciseDate(backup.expireTime).toStruct();
        }
    }
}
exports.ClusterUtils = ClusterUtils;
//# sourceMappingURL=cluster.js.map