'use client';

import React from 'react';

interface HoneypotProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Anti-spam honeypot. The field is hidden from real users (off-screen + aria-hidden
// + not tabbable), so a human never fills it in. Spam bots that blindly populate
// every field will fill it, which lets us silently drop their (usually blank)
// submissions before they ever reach the contact API.
const wrapperStyle: React.CSSProperties = {
  position: 'absolute',
  left: '-9999px',
  top: 0,
  width: 1,
  height: 1,
  overflow: 'hidden',
};

export const Honeypot = ({ value, onChange }: HoneypotProps) => (
  <div aria-hidden='true' style={wrapperStyle}>
    <label>
      Company website
      <input type='text' name='companyWebsite' tabIndex={-1} autoComplete='off' value={value} onChange={onChange} />
    </label>
  </div>
);
