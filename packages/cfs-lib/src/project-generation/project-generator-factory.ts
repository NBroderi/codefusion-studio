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
import { MsdkProjectGenerator } from "./firmware-platform/msdk/msdk.js";
import { ZephyrProjectGenerator } from "./firmware-platform/zephyr/zephyr.js";
import { ProjectGeneratorTypes } from "./project-generator.js";

export const ProjectGeneratorFactory = {
	getProjectGenerator(
		firmwarePlatform: ProjectGeneratorTypes.FirmwarePlatform
	) {
		switch (firmwarePlatform) {
			case "msdk":
				return new MsdkProjectGenerator();
			case "zephyr-4.0":
				return new ZephyrProjectGenerator();
		}
	}
};
