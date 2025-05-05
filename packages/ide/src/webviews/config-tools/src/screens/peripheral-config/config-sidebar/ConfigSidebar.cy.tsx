/* eslint-disable max-nested-callbacks */
/**
 *
 * Copyright (c) 2024-2025 Analog Devices, Inc.
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

import type {ControlCfg, Soc} from '@common/types/soc';
import {configurePreloadedStore} from '../../../state/store';
import ConfigSidebar from './ConfigSidebar';
import {
	setActivePeripheral,
	setActiveSignal,
	setPeripheralAssignment,
	setSignalAssignment,
	setSignalGroupAssignment
} from '../../../state/slices/peripherals/peripherals.reducer';
import {capitalizeWord} from '../../../../../common/utils/string';
import type {CfsConfig} from 'cfs-plugins-api';

const max32690wlp = (await import(
	'../../../../../../../../cli/src/socs/max32690-wlp.json'
).then(module => module.default)) as Soc;

const cm4PreassignedPeripheral = [
	{
		Name: 'CM4 SysTick',
		Signals: [],
		Config: {
			ENABLE: 'FALSE'
		}
	}
];

const GPIO0 = 'GPIO0';
const DMA = 'DMA';
const SPI1 = 'SPI1';
const RV = 'RV';
const CM4 = 'CM4';
const SoC = 'MAX32690';
const zephyr = 'zephyr v4.0';
const pluginVersion = '1.0.0';

const mockedCm4Project = {
	Description: 'ARM Cortex-M4',
	ExternallyManaged: false,
	IsPrimary: true,
	FirmwarePlatform: zephyr,
	Name: 'ARM Cortex-M4',
	PluginId: 'zephyr-plugin',
	PluginVersion: pluginVersion,
	CoreId: CM4,
	ProjectId: CM4 + '-proj'
};

const mockedConfigDict = {
	BoardName: 'AD-APARD32690-SL',
	Package: 'WLP',
	Soc: SoC,
	projects: [
		{...mockedCm4Project},
		{
			Description: 'Risc-V (RV32)',
			ExternallyManaged: false,
			FirmwarePlatform: 'msdk',
			Name: 'RISC-V (RV32)',
			PluginId: '',
			CoreId: RV,
			ProjectId: RV + '-proj'
		}
	]
};

const controlsMock: Record<string, ControlCfg[]> = {
	'CM4 SysTick': [
		{
			Id: 'PARITY',
			Description: 'Parity',
			EnumValues: [
				{
					Id: 'EVEN',
					Description: 'Even Parity',
					Value: 0
				},
				{
					Id: 'ODD',
					Description: 'Odd Parity',
					Value: 1
				},
				{
					Id: 'DISABLED',
					Description: 'Disabled',
					Value: 20
				}
			],
			Type: 'enum'
		},
		{
			Id: 'CHAR_SIZE',
			Description: 'UART Character Size',
			EnumValues: [
				{
					Id: '5',
					Description: '5 Bits',
					Value: 0
				},
				{
					Id: '6',
					Description: '6 Bits',
					Value: 1
				},
				{
					Id: '7',
					Description: '7 Bits',
					Value: 2
				},
				{
					Id: '8',
					Description: '8 Bits',
					Value: 3
				}
			],
			Type: 'enum'
		},
		{
			Id: 'STOP_BITS',
			Description: 'Number of Stop Bits',
			EnumValues: [
				{
					Id: '1',
					Description: '1 Stop Bit',
					Value: 0
				},
				{
					Id: '1.5/2',
					Description: '1.5 Stop Bits or 2 Stop Bits',
					Value: 1
				}
			],
			Type: 'enum'
		},
		{
			Id: 'HW_FLOW_CTRL',
			Description: 'Hardware Flow Control RTS Mode',
			EnumValues: [
				{
					Id: 'DEASSERT_ON_FULL',
					Description: 'Deassert On Full',
					Value: 0
				},
				{
					Id: 'DEASSERT_ON_THRESHOLD',
					Description: 'Deassert On Threshold',
					Value: 1
				},
				{
					Id: 'DISABLED',
					Description: 'Disabled',
					Value: 20
				}
			],
			Type: 'enum'
		},
		{
			Id: 'CHOSEN',
			Description: 'Chosen',
			Type: 'text',
			PluginOption: true
		},
		{
			Id: 'FREQ',
			Description: 'Frequency',
			Hint: '15000000',
			Type: 'integer',
			PluginOption: true
		},
		{
			Id: 'BAUD',
			Description: 'Baud Rate',
			Hint: '115200',
			Type: 'integer',
			PluginOption: true
		}
	]
};

describe('Peripheral Allocation - Config Sidebar', () => {
	beforeEach(() => {
		cy.viewport(262, 688);

		window.localStorage.setItem(
			'Peripherals',
			JSON.stringify(max32690wlp.Peripherals)
		);

		window.localStorage.setItem(
			'Cores',
			JSON.stringify(max32690wlp.Cores)
		);

		window.localStorage.setItem(
			'Package',
			JSON.stringify(max32690wlp.Packages[0])
		);

		window.localStorage.setItem(
			'configDict',
			JSON.stringify(mockedConfigDict)
		);
	});

	it('Renders correctly the allocated core information - Single core allocation', () => {
		cy.window().then(win => {
			win.localStorage.setItem(
				`pluginControls:${CM4}-proj`,
				JSON.stringify(controlsMock)
			);
		});
		const reduxStore = configurePreloadedStore(
			max32690wlp as unknown as Soc,
			{
				Projects: [
					{
						...mockedCm4Project,
						Peripherals: [
							{
								Name: 'CM4 SysTick',
								Signals: [],
								Config: {
									ENABLE: 'FALSE'
								}
							}
						],
						Partitions: [],
						PlatformConfig: {}
					}
				]
			} as unknown as CfsConfig
		);

		reduxStore.dispatch(setActivePeripheral('CM4 SysTick:CM4-proj'));

		cy.mount(<ConfigSidebar isMinimised={false} />, reduxStore);

		// Pre-allocated peripherals should display the peripheral config sidebar variant.
		cy.dataTest('config-sidebar:peripheral-config').should('exist');

		cy.get('h2').first().should('have.text', 'CM4 SYSTICK');

		cy.dataTest(`allocated-core-card:${CM4}-proj`)
			.should('exist')
			.find('p')
			.should('have.text', 'ARM Cortex-M4');

		cy.dataTest(
			`allocated-core-card:${CM4}-proj:primary-badge`
		).should('exist');

		cy.dataTest(`allocated-core-card:${CM4}-proj:lock-icon`).should(
			'exist'
		);

		cy.dataTest('details-section:core-assignment:label').should(
			'exist'
		);

		cy.dataTest('details-section:alias-control-input').should(
			'exist'
		);
	});

	it('Should display "Allocated to multiple cores." label when the peripheral is assigned to multiple cores', () => {
		localStorage.setItem(
			'Peripherals',
			JSON.stringify(max32690wlp.Packages[0])
		);

		const reduxStore = configurePreloadedStore(
			max32690wlp as unknown as Soc
		);

		reduxStore.dispatch(
			setSignalAssignment({
				peripheral: GPIO0,
				signalName: 'P0.1',
				projectId: 'CM4-proj'
			})
		);

		reduxStore.dispatch(
			setSignalAssignment({
				peripheral: GPIO0,
				signalName: 'P0.10',
				projectId: 'RV-proj'
			})
		);

		reduxStore.dispatch(setActivePeripheral(GPIO0));

		cy.mount(<ConfigSidebar isMinimised={false} />, reduxStore);

		cy.dataTest(
			'details-section:core-assignment:multiple-assignments'
		)
			.should('exist')
			.should('have.text', 'Allocated to multiple cores.');

		cy.dataTest('details-section:alias-control-input').should(
			'not.exist'
		);

		cy.dataTest('details-section:core-assignment:label').should(
			'not.exist'
		);
	});

	it('Should display the signal config task sidebar when a the user chooses to configure a signal', () => {
		const reduxStore = configurePreloadedStore(
			max32690wlp as unknown as Soc
		);

		const signalName = 'P0.1';

		reduxStore.dispatch(
			setSignalAssignment({
				peripheral: GPIO0,
				signalName,
				projectId: 'RV-proj'
			})
		);

		reduxStore.dispatch(
			setActiveSignal({peripheral: GPIO0, signal: signalName})
		);

		cy.mount(<ConfigSidebar isMinimised={false} />, reduxStore).then(
			() => {
				cy.spy(reduxStore, 'dispatch').as('dispatch');

				cy.dataTest('config-sidebar:signal-config').should('exist');

				cy.get('h2')
					.first()
					.should('have.text', `${GPIO0} ${signalName}`);

				cy.dataTest(`allocated-core-card:${RV}-proj`)
					.should('exist')
					.find('p')
					.should('have.text', 'RISC-V (RV32)');

				cy.dataTest('details-section:alias-control-input').should(
					'exist'
				);
			}
		);
	});

	it('Should display the peripheral config task sidebar when a the user chooses to configure a peripheral', () => {
		const reduxStore = configurePreloadedStore(
			max32690wlp as unknown as Soc
		);

		reduxStore.dispatch(
			setSignalAssignment({
				peripheral: GPIO0,
				signalName: 'P0.1',
				projectId: RV + '-proj'
			})
		);

		reduxStore.dispatch(setActivePeripheral(GPIO0));

		cy.mount(<ConfigSidebar isMinimised={false} />, reduxStore);

		cy.dataTest('config-sidebar:peripheral-config').should('exist');

		cy.get('h2').first().should('have.text', GPIO0);

		cy.dataTest(`allocated-core-card:${RV}-proj`)
			.should('exist')
			.find('p')
			.should('have.text', 'RISC-V (RV32)');

		cy.dataTest('details-section:alias-control-input').should(
			'exist'
		);
	});

	it('Should dynamically update the sidebar when the user switches between peripheral and signal configuration task', () => {
		const reduxStore = configurePreloadedStore(
			max32690wlp as unknown as Soc
		);

		const targetSignalFromGroup = 'SDIO2';

		reduxStore.dispatch(
			setSignalGroupAssignment({
				peripheral: SPI1,
				projectId: CM4 + '-proj',
				config: {}
			})
		);

		reduxStore.dispatch(
			setPeripheralAssignment({
				peripheral: DMA,
				projectId: RV,
				config: {}
			})
		);

		reduxStore.dispatch(setActivePeripheral(DMA));

		cy.mount(<ConfigSidebar isMinimised={false} />, reduxStore);

		cy.dataTest('config-sidebar:peripheral-config').should('exist');

		cy.get('h2')
			.first()
			.should('have.text', DMA)
			.then(() => {
				cy.wrap(
					reduxStore.dispatch(
						setActiveSignal({
							peripheral: SPI1,
							signal: targetSignalFromGroup
						})
					)
				).then(() => {
					cy.dataTest('config-sidebar:signal-config').should('exist');

					cy.get('h2')
						.first()
						.should('have.text', `${SPI1} ${targetSignalFromGroup}`)
						.then(() => {
							// Dispatching the same active signal should close the sidebar.
							cy.wrap(
								reduxStore.dispatch(
									setActiveSignal({
										peripheral: SPI1,
										signal: targetSignalFromGroup
									})
								)
							).then(() => {
								cy.dataTest('config-sidebar:signal-config').should(
									'not.exist'
								);
								cy.dataTest(
									'config-sidebar:peripheral-config'
								).should('not.exist');
							});
						});
				});
			});
	});

	it('Should restore the configuration forms after collapsing and expanding sections', () => {
		cy.window().then(win => {
			win.localStorage.setItem(
				`pluginControls:${CM4}-proj`,
				JSON.stringify(controlsMock)
			);
		});
		const reduxStore = configurePreloadedStore(
			max32690wlp as unknown as Soc
		);

		reduxStore.dispatch(setActivePeripheral('CM4 SysTick:CM4-proj'));

		cy.mount(<ConfigSidebar isMinimised={false} />, reduxStore).then(
			() => {
				cy.wait(1000);

				cy.dataTest('config-sidebar:peripheral-config').should(
					'exist'
				);
				cy.dataTest('config-panel:plugin-options').should('exist');

				cy.dataTest('plugin-options:plugin-form:container')
					.scrollIntoView()
					.wait(1000)
					.should('be.visible');

				cy.dataTest('plugin-info:firmware').should(
					'have.text',
					`${SoC} ${capitalizeWord(zephyr)}`
				);

				cy.dataTest('plugin-info:version').should(
					'have.text',
					`Version ${pluginVersion}`
				);

				cy.dataTest('config-panel:plugin-options').click();

				cy.dataTest('plugin-options:plugin-form:container').should(
					'not.be.visible'
				);

				cy.dataTest('config-panel:plugin-options').click();

				cy.dataTest('plugin-options:plugin-form:container').should(
					'be.visible'
				);
			}
		);
	});

	it('Should disable closing the plugin options if there are no plugin options', () => {
		const controlMock: Record<string, ControlCfg[]> = {
			'CM4 SysTick': []
		};

		cy.window().then(win => {
			win.localStorage.setItem(
				`pluginControls:${CM4}-proj`,
				JSON.stringify(controlMock)
			);
		});
		const reduxStore = configurePreloadedStore(
			max32690wlp as unknown as Soc
		);

		reduxStore.dispatch(setActivePeripheral('CM4 SysTick:CM4-proj'));

		cy.mount(<ConfigSidebar isMinimised={false} />, reduxStore).then(
			() => {
				cy.wait(1000);

				cy.dataTest('config-sidebar:peripheral-config').should(
					'exist'
				);
				cy.dataTest('config-panel:plugin-options').should('exist');

				cy.dataTest('plugin-options:plugin-form:container')
					.scrollIntoView()
					.wait(1000)
					.should('be.visible');

				cy.dataTest('config-panel:plugin-options').click({
					force: true
				});

				cy.dataTest('plugin-options:plugin-form:container').should(
					'be.visible'
				);
			}
		);
	});
});
