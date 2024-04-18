import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import UserAutoComplete from './user-autocomplete';
import { title } from 'process';

interface Props {
	initialValue?: any;
}

function BasicInformation({initialValue, newUser, setNewUser }: any) {
	const [form] = Form.useForm();
	
	
	function handleChange(e: any) {
		const { value, name } = e.target
		
		setNewUser(function (prev: any) {
			return {
				...prev,
				[name]: value,	
			}
		})
	}
	

	
	return (
		<Form form={form}>
			<Form.Item name="title" label="عنوان" labelCol={{ span: 2 }} >
				<Input value={newUser.title} name='title' onKeyDown={handleChange} />
			</Form.Item>
			<Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
				<Input name="key" value={newUser.key} onKeyDown={handleChange} />
			</Form.Item>
			<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
				<UserAutoComplete />
			</Form.Item>


		</Form>
	);
}
export default BasicInformation