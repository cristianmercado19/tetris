export = P2PT;
declare class P2PT {
		constructor(announceURLs: Array<String>, identifierString: string);
		on(eventName: string, action: (tracker: any, stats: any) => void): void;
		start(): void;
		send(peer: any, msg: any): void;
}
