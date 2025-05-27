<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { BarcodeFormat, BrowserBarcodeReader, DecodeHintType } from '@zxing/library';

	let { torch, onscan } = $props();

	const hints = new Map();
	hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_8, BarcodeFormat.EAN_13]);
	/*hints.set(DecodeHintType.TRY_HARDER, true);*/
	const zxing = new BrowserBarcodeReader(500, hints);

	let video: HTMLVideoElement;
	onMount(async () => {
		let stream = null;
		block: {
			// use cached device
			const device = sessionStorage.getItem('device');
			if (device) {
				stream = await navigator.mediaDevices
					.getUserMedia({
						video: {
							deviceId: { exact: device },
							height: window.innerWidth * window.devicePixelRatio,
							width: (window.innerHeight - document.body.clientHeight) * window.devicePixelRatio
						}
					})
					.catch(() => null);
				if (stream) break block;
			}

			// search for device facing the environment and supporting continuous focus mode
			for (const device of await navigator.mediaDevices.enumerateDevices()) {
				if (device.kind !== 'videoinput') continue;

				stream = await navigator.mediaDevices
					.getUserMedia({
						video: {
							deviceId: { exact: device.deviceId },
							height: window.innerWidth * window.devicePixelRatio,
							width: (window.innerHeight - document.body.clientHeight) * window.devicePixelRatio
						}
					})
					.catch(() => null);
				if (!stream) continue;

				const track = stream.getVideoTracks()[0];
				const trackCapabilities = track.getCapabilities();
				if (
					!trackCapabilities.facingMode?.includes('environment') ||
					!trackCapabilities.focusMode?.includes('continuous')
				) {
					stream.getTracks().forEach((track) => track.stop());
					stream = null;
					continue;
				}

				// cache device
				sessionStorage.setItem('device', device.deviceId);
				break;
			}
		}

		video.hidden = false;
		video.srcObject = stream;
		await video.play();

		zxing.decodeContinuously(video, (result) => {
			if (result) onscan(result.getText());
		});
	});
	onDestroy(() => {
		(video.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
		zxing.reset();
	});

	$effect(() => {
		const _torch = torch;
		(video.srcObject as MediaStream)
			?.getVideoTracks()[0]
			.applyConstraints({ advanced: [{ torch: _torch }] });
	});
</script>

<video bind:this={video} autoplay muted playsinline hidden></video>
