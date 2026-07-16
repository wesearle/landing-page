'use client';

import { CONTACT_SALES_LINK } from '@/constants';
import { Button, type ButtonProps } from '..';

interface ContactUsButtonProps extends ButtonProps {
  label?: string;
}

export const ContactUsButton = ({ label = 'Request a Demo', ...props }: ContactUsButtonProps) => {
  return (
    <Button href={CONTACT_SALES_LINK} {...props}>
      {label}
    </Button>
  );
};
