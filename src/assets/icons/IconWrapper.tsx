import styled from '@emotion/styled';

type IconWrapperProps = {
  width?: string;
  height?: string;
  isButton?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

const IconWrapperContainer = styled.div<IconWrapperProps>`
  & > a {
    display: inline-block;
    cursor: pointer;
  }

  svg {
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};
    cursor: ${(props) => (props.isButton ? 'pointer' : 'default')};
  }
`;

export default function IconWrapper({
  width = '24',
  height = '24',
  isButton = false,
  children,
  onClick,
}: IconWrapperProps) {
  return (
    <IconWrapperContainer
      width={width}
      height={height}
      isButton={isButton}
      onClick={onClick}
    >
      {children}
    </IconWrapperContainer>
  );
}
