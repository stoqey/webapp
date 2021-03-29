import {
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

