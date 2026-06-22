'use client';

import { useState } from 'react';
import { usePlausible } from './usePlausible';
import { isFreeEmail, validateEmail } from '@/functions';
import { CONTACT_API_URL, SLACK_CONTACT_API_URL } from '@/constants';

enum ContactFormEvent {
  NewsletterSignup = 'NewsletterSignup',
  ContactFormSubmitted = 'ContactFormSubmitted',
}

interface ContactForm {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  company: string;
  message: string;
}

const INITIAL_FORM_DATA: ContactForm = {
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  company: '',
  message: '',
};

const sendToService = async (url: string, body: unknown): Promise<string> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) return 'Failed to send to service';
    return '';
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};

export const useContactForm = () => {
  const { trackEvent } = usePlausible();

  const [formData, setFormData] = useState<ContactForm>({
    ...INITIAL_FORM_DATA,
  });
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const resetFormData = () => {
    setFormData({ ...INITIAL_FORM_DATA });
  };

  // Hidden anti-spam field. Real users never see or fill it; bots that auto-fill
  // every field will, so a non-empty value flags the submission as spam.
  const [honeypot, setHoneypot] = useState('');
  const handleHoneypotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoneypot(e.target.value);
  };

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const handleFormErrorChange = (key?: keyof ContactForm, error?: string, fullObject?: typeof formErrors) => {
    setFormErrors(
      fullObject || {
        ...formErrors,
        [key as keyof ContactForm]: error as string,
      },
    );
  };
  const resetFormErrors = () => {
    setFormErrors({});
  };

  const submitToContactService = async (eventName?: string): Promise<string> => {
    // Honeypot tripped => almost certainly a bot. Drop it silently and report
    // success so the bot doesn't retry, but never hit the contact APIs.
    if (honeypot.trim()) return '';

    // Centralized guard: this hook is the single source of truth for what may be
    // sent to the contact APIs. Even if a caller (or a bot driving the page)
    // skips its own validation, we never forward a blank/invalid submission that
    // would produce an empty notification.
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const phoneNumber = formData.phoneNumber.trim();
    const company = formData.company.trim();
    const message = (eventName || formData.message).trim();

    if (!firstName || !email || !validateEmail(email) || isFreeEmail(email)) {
      return 'Please enter your name and a valid business email address.';
    }

    const fullName = `${firstName} ${lastName}`.trim();

    trackEvent(ContactFormEvent.ContactFormSubmitted, {
      props: {
        name: fullName,
        email,
        phone: phoneNumber,
        organization: company,
        message,
      },
    });

    window.dataLayer?.push({
      event: 'contact_form_submitted',
      form_type: eventName ? 'event_registration' : 'contact_us',
      source_page: window.location.pathname,
    });

    const contactError = await sendToService(CONTACT_API_URL, {
      fullName,
      businessEmail: email,
      phoneNumber,
      organizationName: company,
      message,
    });
    if (contactError) return contactError;

    const slackError = await sendToService(SLACK_CONTACT_API_URL, {
      name: fullName,
      email,
      phone: phoneNumber,
      organization: company,
      message,
    });
    if (slackError) return slackError;

    return '';
  };

  return {
    formData,
    handleFormDataChange,
    resetFormData,
    honeypot,
    handleHoneypotChange,
    formErrors,
    handleFormErrorChange,
    resetFormErrors,
    submitToContactService,
  };
};
