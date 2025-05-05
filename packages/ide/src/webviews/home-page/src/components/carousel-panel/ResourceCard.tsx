/**
 *
 * Copyright (c) 2023-2024 Analog Devices, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import './resource-card.scss';

export type ResourceProps = {
	readonly link: string;
	readonly img: string;
	readonly title: string;
	readonly description: string;
};

export function ResourceCard(props: ResourceProps) {
	return (
		<a className='resource-card' href={props.link}>
			<img src={props.img} />
			<p className='title'>{props.title}</p>
			<p className='description'>{props.description}</p>
		</a>
	);
}
