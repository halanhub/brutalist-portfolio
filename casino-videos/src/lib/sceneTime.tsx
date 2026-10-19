import React, { createContext, useContext } from "react";
import { useCurrentFrame } from "remotion";

// Scenes are choreographed against a base length. When the narration makes a
// scene longer, its animation timeline is stretched by the same factor so the
// visual beats stay roughly in step with what is being said.
const StretchContext = createContext(1);

export const SceneTime: React.FC<{ stretch: number; children: React.ReactNode }> = ({
  stretch,
  children,
}) => <StretchContext.Provider value={stretch}>{children}</StretchContext.Provider>;

/** Frame on the scene's base timeline. Use instead of useCurrentFrame() in choreography. */
export const useSceneFrame = () => useCurrentFrame() / useContext(StretchContext);

/** How much the current scene is stretched to fit its narration. */
export const useStretch = () => useContext(StretchContext);
