import * as protos from '../protos/protos';
declare enum RuleType {
    union = "union",
    intersection = "intersection"
}
export interface GcRule {
    maxAge?: protos.google.protobuf.IDuration | number;
    maxVersions?: number;
    rule?: GcRule;
    ruleType?: RuleType;
}
export declare class GCRuleMaker {
    static makeRule(gcRule: GcRule): protos.google.bigtable.admin.v2.IGcRule;
}
export {};
