/**
 *
 * Copyright (c) 2025 Analog Devices, Inc.
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
import {use} from 'cfs-react-library';
import type {ControlCfg} from '../../../../../common/types/soc';

function ResolvedProjectControl({
	projectId,
	controlPromise,
	onResolve
}: Readonly<{
	projectId: string;
	controlPromise: Promise<Record<string, ControlCfg[]>>;
	onResolve: (
		projectId: string,
		controls: Record<string, ControlCfg[]>
	) => void;
}>) {
	const controls = use(controlPromise);
	onResolve(projectId, controls);

	return null;
}

export default ResolvedProjectControl;
