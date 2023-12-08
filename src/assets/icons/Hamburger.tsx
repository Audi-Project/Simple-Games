import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import MenuModal from '../../components/modals/MenuModal';
import useOverlay from '../../hooks/useOverlay';
import IconWrapper from './IconWrapper';

export default function Hamburger() {
  const [open, setOpen] = useState(false);
  const overlay = useOverlay();

  const openMenuModal = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, close }) => {
        setOpen(isOpen);

        return (
          <MenuModal
            open={isOpen}
            onClose={() => {
              resolve(false);
              close();
            }}
          />
        );
      });
    });
  };

  return (
    <IconWrapper
      width="48"
      height="48"
      isButton={true}
      onClick={async () => {
        await openMenuModal();
      }}
    >
      {!open && <HiBars3 />}
    </IconWrapper>
  );
}
