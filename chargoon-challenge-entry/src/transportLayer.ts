import { createTreeMockData } from "./Components/Tree/mockData"

export async function getAccessList() {
	return [
		{ label: 'افزودن نامه', id: '1' },
		{ label: 'ویرایش نامه', id: '2' },
		{ label: 'مشاهده نامه', id: '3' },
	]
}

export async function getNodes() {
	return createTreeMockData()
}

export async function getUsers() {
	return [
		{ label: 'superadmin', value: 'superadmin', id:1 },
		{ label: 'admin', value: 'admin', id:2 },
		{ label: 'alireza', value: 'alireza', id:3 },
		{ label: 'alirezatest', value: 'alirezatest', id:4 },

	]
}