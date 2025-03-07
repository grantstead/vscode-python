// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

'use strict';

import { IExtensionSingleActivationService } from '../../activation/types';
import { IServiceManager } from '../../ioc/types';
import { AttachRequestArguments, LaunchRequestArguments } from '../types';
import { DebugAdapterActivator } from './adapter/activator';
import { DebugAdapterDescriptorFactory } from './adapter/factory';
import { DebuggerBanner } from './banner';
import { PythonDebugConfigurationService } from './configuration/debugConfigurationService';
import { LaunchJsonCompletionProvider } from './configuration/launch.json/completionProvider';
import { LaunchJsonUpdaterService } from './configuration/launch.json/updaterService';
import { DjangoLaunchDebugConfigurationProvider } from './configuration/providers/djangoLaunch';
import { FileLaunchDebugConfigurationProvider } from './configuration/providers/fileLaunch';
import { FlaskLaunchDebugConfigurationProvider } from './configuration/providers/flaskLaunch';
import { ModuleLaunchDebugConfigurationProvider } from './configuration/providers/moduleLaunch';
import { DebugConfigurationProviderFactory } from './configuration/providers/providerFactory';
import { PyramidLaunchDebugConfigurationProvider } from './configuration/providers/pyramidLaunch';
import { RemoteAttachDebugConfigurationProvider } from './configuration/providers/remoteAttach';
import { AttachConfigurationResolver } from './configuration/resolvers/attach';
import { DebugEnvironmentVariablesHelper, IDebugEnvironmentVariablesService } from './configuration/resolvers/helper';
import { LaunchConfigurationResolver } from './configuration/resolvers/launch';
import { IDebugConfigurationProviderFactory, IDebugConfigurationResolver } from './configuration/types';
import { ChildProcessAttachEventHandler } from './hooks/childProcessAttachHandler';
import { ChildProcessAttachService } from './hooks/childProcessAttachService';
import { IChildProcessAttachService, IDebugSessionEventHandlers } from './hooks/types';
import {
    DebugConfigurationType,
    ExtensionSingleActivationServiceType,
    IDebugAdapterDescriptorFactory,
    IDebugConfigurationProvider,
    IDebugConfigurationService,
    IDebuggerBanner
} from './types';

export function registerTypes(serviceManager: IServiceManager) {
    serviceManager.addSingleton<IExtensionSingleActivationService>(
        IExtensionSingleActivationService,
        LaunchJsonCompletionProvider,
        ExtensionSingleActivationServiceType.jsonCompletionProvider
    );
    serviceManager.addSingleton<IExtensionSingleActivationService>(
        IExtensionSingleActivationService,
        LaunchJsonUpdaterService,
        ExtensionSingleActivationServiceType.jsonUpdaterService
    );
    serviceManager.addSingleton<IDebugConfigurationService>(IDebugConfigurationService, PythonDebugConfigurationService);
    serviceManager.addSingleton<IDebuggerBanner>(IDebuggerBanner, DebuggerBanner);
    serviceManager.addSingleton<IChildProcessAttachService>(IChildProcessAttachService, ChildProcessAttachService);
    serviceManager.addSingleton<IDebugSessionEventHandlers>(IDebugSessionEventHandlers, ChildProcessAttachEventHandler);
    serviceManager.addSingleton<IDebugConfigurationResolver<LaunchRequestArguments>>(IDebugConfigurationResolver, LaunchConfigurationResolver, 'launch');
    serviceManager.addSingleton<IDebugConfigurationResolver<AttachRequestArguments>>(IDebugConfigurationResolver, AttachConfigurationResolver, 'attach');
    serviceManager.addSingleton<IDebugConfigurationProviderFactory>(IDebugConfigurationProviderFactory, DebugConfigurationProviderFactory);
    serviceManager.addSingleton<IDebugConfigurationProvider>(IDebugConfigurationProvider, FileLaunchDebugConfigurationProvider, DebugConfigurationType.launchFile);
    serviceManager.addSingleton<IDebugConfigurationProvider>(IDebugConfigurationProvider, DjangoLaunchDebugConfigurationProvider, DebugConfigurationType.launchDjango);
    serviceManager.addSingleton<IDebugConfigurationProvider>(IDebugConfigurationProvider, FlaskLaunchDebugConfigurationProvider, DebugConfigurationType.launchFlask);
    serviceManager.addSingleton<IDebugConfigurationProvider>(IDebugConfigurationProvider, RemoteAttachDebugConfigurationProvider, DebugConfigurationType.remoteAttach);
    serviceManager.addSingleton<IDebugConfigurationProvider>(IDebugConfigurationProvider, ModuleLaunchDebugConfigurationProvider, DebugConfigurationType.launchModule);
    serviceManager.addSingleton<IDebugConfigurationProvider>(IDebugConfigurationProvider, PyramidLaunchDebugConfigurationProvider, DebugConfigurationType.launchPyramid);
    serviceManager.addSingleton<IDebugEnvironmentVariablesService>(IDebugEnvironmentVariablesService, DebugEnvironmentVariablesHelper);
    serviceManager.addSingleton<IExtensionSingleActivationService>(
        IExtensionSingleActivationService,
        DebugAdapterActivator,
        ExtensionSingleActivationServiceType.debugAdapterActivator
    );
    serviceManager.addSingleton<IDebugAdapterDescriptorFactory>(IDebugAdapterDescriptorFactory, DebugAdapterDescriptorFactory);
}
