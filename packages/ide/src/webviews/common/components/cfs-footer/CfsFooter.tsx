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
import type {ReactNode} from 'react';
import styles from './CfsFooter.module.scss';

type CfsFooterProps = {
	readonly children: ReactNode;
};

export default function CfsFooter({children}: CfsFooterProps) {
	return <div className={styles.footer}>{children}</div>;
}
