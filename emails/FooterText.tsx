import React from 'react';
import { Text } from '@react-email/components';

export interface FooterTextProps {
  closing: string;
  signature: string;
  footerPs?: string;
}

export const FooterText = ({ closing, signature, footerPs }: FooterTextProps) => (
  <>
    <Text>{closing}</Text>
    <Text>{signature}</Text>
    {footerPs && <Text>{footerPs}</Text>}
  </>
);

export default FooterText;
