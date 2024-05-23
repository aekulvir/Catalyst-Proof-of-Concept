import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'p'> {
  storeName: string;
}

export const Copyright = ({ storeName, ...rest }: Props) => {
  return (
    <p className="text-white sm:order-first" {...rest}>
      © {new Date().getFullYear()} {storeName}
    </p>
  );
};
