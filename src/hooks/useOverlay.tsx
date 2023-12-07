import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  OverlayControllRef,
  OverlayController,
} from '../contexts/OverlayController';
import { OverlayContext } from '../contexts/OverlayProvider';
import { CreateOverlayElement } from '../types/overlay.type';

let elementId = 1;

interface Options {
  exitOnUnmount?: boolean;
}

export default function useOverlay({ exitOnUnmount = true }: Options = {}) {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error('useOverlay is only available within OverlayProvider.');
  }

  const { mount, unmount } = context;
  const [id] = useState(() => String(elementId++));
  console.log(id);

  const overlayRef = useRef<OverlayControllRef>(null);

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        unmount(id);
      }
    };
  }, [exitOnUnmount, id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => {
              unmount(id);
            }}
          />,
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
      exit: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount],
  );
}
