---
description: Uninstall CodeFusion Studio
author: Analog Devices
date: 2025-01-27
---

# Uninstall CodeFusion Studio

## Uninstall the extension from VS Code

1. Select the **Extensions** icon from the activity bar.
2. Find the **CodeFusion Studio** extension in the **INSTALLED** list.
3. Click on the **Manage** (cog) icon on the right hand side.
4. Select **Uninstall**.

![CodeFusion Extension Uninstall](images/uninstall-extension-dark.png#only-dark)
![CodeFusion Extension Uninstall](images/uninstall-extension-light.png#only-light)

!!! note
    Keyboard shortcut to extensions is **Control** + **SHIFT** + **X** (Windows/Linux) or **Command** + **SHIFT** + **X** (Mac).

## Uninstall from file system

You can uninstall CodeFusion Studio using the Maintenance Tool.

1. Navigate to the directory where **CodeFusion Studio** is installed.
    - The Windows default location is `C:\analog\cfs\`
    - The macOS or Linux default location is `~/analog/cfs/`
2. Open the folder for the version you want to uninstall.
3. Launch the Maintenance Tool:
    - On Windows, double click **MaintenanceTool.exe**
    - On macOS, double click **MaintenanceTool.app**
    - On Ubuntu, double click **MaintenanceTool**
4. Select **Remove all components** and follow the prompt to continue![Installer Setup](images/uninstaller-setup.png)
5. Check that the correct directory is being removed and click **Uninstall**.![Ready to Uninstall](images/ready-to-uninstall.png)
6. CodeFusion Studio will now be uninstalled.![Uninstall In Progress](images/uninstalling-progress.png)
7. When the process completes, close the uninstaller ![Completed Uninstallation](images/uninstallation-complete.png)

## Command line uninstall

Use the following command to uninstall CodeFusion Studio from the default location:

- Windows: `C:\analog\CFS\1.1.0\MaintenanceTool.exe purge`
- Linux: `~/analog/cfs/1.1.0/MaintenanceTool purge`
- macOS: `~/analog/cfs/1.1.0/MaintenanceTool.app/Contents/MacOS/MaintenanceTool purge`
