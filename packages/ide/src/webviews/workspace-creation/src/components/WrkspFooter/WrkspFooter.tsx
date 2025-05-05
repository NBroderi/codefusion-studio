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

import {Button} from 'cfs-react-library';

import CfsFooter from '@common/components/cfs-footer/CfsFooter';
import useScreenNavigation from '../../hooks/useScreenNavigation';

import styles from './WrkspFooter.module.scss';

export default function WrkspFooter() {
	const {navigationSpecs} = useScreenNavigation();
	const {forwardAction, backAction, forwardLabel, backLabel} =
		navigationSpecs;

	return (
		<CfsFooter>
			<div
				className={styles['wrksp-footer']}
				data-test='wrksp-footer:container'
			>
				<Button
					className={backAction ? '' : styles.hide}
					type='button'
					appearance='secondary'
					dataTest='wrksp-footer:back-btn'
					onClick={() => {
						backAction?.();
					}}
				>
					{backLabel ?? 'Back'}
				</Button>

				<Button
					type='button'
					dataTest='wrksp-footer:continue-btn'
					onClick={forwardAction}
				>
					{forwardLabel}
				</Button>
			</div>
		</CfsFooter>
	);
}
