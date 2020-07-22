<template>
	<div style="display: grid; place-items: center;">
		<img src="../assets/logo.png" alt="bridge Logo" />

		<p>
			Select the location to save your projects to in order to start using
			bridge.
		</p>
		<button @click="selectBridgeFolder">Get Started</button>
	</div>
</template>

<script lang="ts" setup>
import { router } from '../router'
import { bridgeFolder } from '../common/ENV'
declare const chooseFileSystemEntries: (...args: unknown[]) => any

export const selectBridgeFolder = async () => {
	if (bridgeFolder.value !== null) return router.push('/projects')
	bridgeFolder.value = await chooseFileSystemEntries({
		type: 'open-directory',
	})
	router.push('/projects')
}
</script>

<style></style>
