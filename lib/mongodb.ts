import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URL) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URL"');
}

const uri: string = process.env.MONGODB_URL;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
	let globalWithMongoClientPromise = global as typeof globalThis & {
		_mongoClientPromise: Promise<MongoClient>;
	};

	if (!globalWithMongoClientPromise._mongoClientPromise) {
		client = new MongoClient(uri);
		globalWithMongoClientPromise._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri);
	clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;