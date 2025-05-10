function sha256(input: string): string {
	const hasher = new Bun.CryptoHasher('sha256');
	hasher.update(input);
	return hasher.digest('hex');
}

function hmac(key: string | Buffer, input: string): Buffer {
	const hasher = new Bun.CryptoHasher('sha256', key);
	hasher.update(input);
	return hasher.digest();
}

function hmacFinal(key: string | Buffer, input: string): string {
	const hasher = new Bun.CryptoHasher('sha256', key);
	hasher.update(input);
	return hasher.digest('hex');
}

export function presign(key: string): string {
	const url = new URL(process.env.S3_ENDPOINT);
	const bucket = process.env.S3_BUCKET;
	const accessKeyId = process.env.S3_ACCESS_KEY_ID;
	const accessKey = process.env.S3_SECRET_ACCESS_KEY;

	const now = new Date();
	now.setMinutes(0);
	now.setSeconds(0);
	now.setMilliseconds(0);
	const date = now.toISOString().replace(/[:-]|\.\d{3}/g, '');

	const day = date.slice(0, 8);
	const region = 'auto';
	const service = 's3';
	const signatureKey = hmac(
		hmac(hmac(hmac(`AWS4${accessKey}`, day), region), service),
		'aws4_request'
	);

	const scope = `${day}/${region}/${service}/aws4_request`;
	url.pathname = `/${bucket}/${key}`;
	url.searchParams.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
	url.searchParams.set('X-Amz-Credential', `${accessKeyId}/${scope}`);
	url.searchParams.set('X-Amz-Date', date);
	url.searchParams.set('X-Amz-Expires', (60 * 60).toString());
	url.searchParams.set('X-Amz-SignedHeaders', 'host');
	const request = `GET\n${url.pathname}\n${url.searchParams}\nhost:${url.host}\n\nhost\nUNSIGNED-PAYLOAD`;

	const signature = hmacFinal(
		signatureKey,
		`AWS4-HMAC-SHA256\n${date}\n${scope}\n${sha256(request)}`
	);
	url.searchParams.set('X-Amz-Signature', signature);
	return url.toString();
}
