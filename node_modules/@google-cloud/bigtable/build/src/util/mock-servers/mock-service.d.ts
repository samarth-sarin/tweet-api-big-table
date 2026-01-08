import { grpc } from 'google-gax';
import { MockServer } from './mock-server';
export declare abstract class MockService {
    abstract service: grpc.ServiceDefinition;
    server: MockServer;
    constructor(server: MockServer);
    setService(implementation: grpc.UntypedServiceImplementation): void;
}
