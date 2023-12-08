import {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { CreateOverlayElement } from '../types/overlay.type';

interface Props {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}

export interface OverlayControllRef {
  close: () => void;
}

export const OverlayController = forwardRef(
  (
    { overlayElement: OverlayElement, onExit }: Props,
    ref: Ref<OverlayControllRef>,
  ) => {
    const [isOpenOverlay, setIsOpenOverlay] = useState(false);

    const handleOverlayClose = useCallback(() => setIsOpenOverlay(false), []);

    useImperativeHandle(
      ref,
      () => {
        return { close: handleOverlayClose };
      },
      [handleOverlayClose],
    );

    useEffect(() => {
      // NOTE: requestAnimationFrame이 없으면 가끔 Open 애니메이션이 실행되지 않는다.
      requestAnimationFrame(() => {
        setIsOpenOverlay(true);
      });
    }, []);

    return (
      <OverlayElement
        isOpen={isOpenOverlay}
        close={handleOverlayClose}
        exit={onExit}
      />
    );
  },
);
