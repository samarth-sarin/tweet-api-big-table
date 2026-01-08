import { grpc } from 'google-gax';
export declare class MockServer {
    port: string;
    services: Set<grpc.ServiceDefinition>;
    server: grpc.Server;
    constructor(callback?: (port: string) => void, port?: string | number | undefined);
    setService(service: grpc.ServiceDefinition, implementation: grpc.UntypedServiceImplementation): void;
    shutdown(callback: (err?: Error) => void): void;
}
