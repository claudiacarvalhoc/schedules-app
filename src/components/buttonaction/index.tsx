import { FC } from 'react';
import Button from '@material-ui/core/Button';

export interface ButtonActionProps {
    text: string;
    size?: 'large' | 'medium' | 'small';
    variant?: 'contained' | 'outlined' | 'text';
    type?: 'default' | 'inherit' | 'primary' | 'secondary';
    onClick: (e) => void;
}

const ButtonAction: FC<ButtonActionProps> = ({
    size = 'small',
    variant = 'outlined',
    type = 'secondary',
    onClick,
    text
}) => (
<Button
    size={size}
    variant={variant}
    color={type}
    onClick={(e) => onClick(e)}>
    {text}
</Button>);

export default ButtonAction;