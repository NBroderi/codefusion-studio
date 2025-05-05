/**
 *
 * Copyright (c) 2024 Analog Devices, Inc.
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

import {Suspense, useMemo} from 'react';
import CoreConfigContainer from './CoreConfigContainer';
import WorkspaceCreationLayout from '../../common/components/WorkspaceCreationLayout';
import {ProgressRing} from 'cfs-react-library';
import {fetchPlugins} from '../../utils/api';

export default function CoreConfig() {
	const pluginsPromise = useMemo(async () => fetchPlugins(), []);

	return (
		<WorkspaceCreationLayout
			title='Core Configuration'
			description='Please select your platform and the associated options.'
		>
			<Suspense fallback={<ProgressRing />}>
				<CoreConfigContainer pluginsPromise={pluginsPromise} />
			</Suspense>
		</WorkspaceCreationLayout>
	);
}
