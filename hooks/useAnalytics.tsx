import { useState, useEffect } from 'react';
import { LoginResponseType } from '@stoqey/client-graphql'
import AsyncStorageDB, { USER_DB_PATH } from 'lib/AsyncStorageDB';
import { APPEVENTS, AppEvents } from '@/lib/AppEvent';
import { useAppEvent } from './useAppEvent';
import amplitude from "amplitude-js";
import {
  AmplitudeProvider,
  Amplitude,
  LogOnMount,
  useAmplitude
} from "react-amplitude-hooks";

interface AmplitudeAnalytics {
  logEvent: (eventType: string, eventPropertiesIn?: object, callback?: any) => void;
  instrument: <T extends Function>(eventType: string, func: T) => T;
  eventProperties: any;
  amplitudeInstance: import("amplitude-js").AmplitudeClient | undefined;
};

export function useAnalyticsAmplitude(): AmplitudeAnalytics {
  const { instrument, logEvent, eventProperties, amplitudeInstance } = useAmplitude(inheritedProps => ({
    ...inheritedProps,
    scope: "webapp"
  }));

  return !amplitudeInstance ? ({} as any) : { instrument, logEvent, eventProperties, amplitudeInstance };
}

