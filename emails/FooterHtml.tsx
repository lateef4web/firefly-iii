import React from 'react';
import { Text } from '@react-email/components';

export interface FooterHtmlProps {
  closing: string;
  signature: string;
  footerPs?: string;
}

export const FooterHtml = ({ closing, signature, footerPs }: FooterHtmlProps) => (
  <>
    <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
      {closing}
    </Text>
    <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '13px' }}>
      {signature}
    </Text>
    {footerPs && (
      <Text style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '11px', color: '#aaa' }}>
        {footerPs}
      </Text>
    )}
  </>
);

export default FooterHtml;
