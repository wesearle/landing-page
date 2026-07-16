'use client';

import Script from 'next/script';
import { useState } from 'react';
import styled from 'styled-components';
import { useContactForm } from '@/hooks';
import { isFreeEmail, validateEmail } from '@/functions';

const Card = styled.div`
  padding: 28px;
  background: var(--nd-surface);
`;

const Title = styled.h2`
  margin: 0 0 8px;
  color: var(--nd-text);
  font-size: 26px;
  font-weight: 520;
  line-height: 1.1;
  letter-spacing: -0.035em;
`;

const Subtext = styled.p`
  margin: 0 0 24px;
  color: var(--nd-text-secondary);
  font-size: 13px;
  line-height: 1.45;
`;

const Form = styled.form`
  display: grid;
  gap: 14px;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  color: var(--nd-text-secondary);
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  padding: 0 11px;
  border: 1px solid var(--nd-border);
  border-radius: 4px;
  outline: 0;
  background: var(--nd-page);
  color: var(--nd-text);
  font: inherit;
  font-size: 13px;

  &:focus {
    border-color: var(--nd-accent);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const ErrorText = styled.span`
  color: #b13c6d;
  font-size: 11px;
`;

const Submit = styled.button`
  min-height: 44px;
  margin-top: 5px;
  border: 0;
  border-radius: 999px;
  background: var(--nd-button-bg);
  color: var(--nd-button-text);
  font: inherit;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.55;
  }
`;

const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const HubspotCard = styled(Card)`
  --hsf-background__padding: 0px;
  --hsf-default-background__padding: 0px;
  --hsf-background-color: transparent;

  [data-hsfc-id],
  .hsfc-Renderer,
  .hsfc-FormWrapper,
  .hsfc-Form,
  .hsfc-Step,
  .hsfc-Step__Content {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding: 0 !important;
    background: transparent !important;
  }

  input,
  textarea,
  select {
    width: 100% !important;
    box-sizing: border-box !important;
    border: 1px solid var(--nd-border) !important;
    border-radius: 4px !important;
    background: var(--nd-page) !important;
    color: var(--nd-text) !important;
  }

  button[type='submit'] {
    width: 100% !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: var(--nd-button-bg) !important;
    color: var(--nd-button-text) !important;
  }
`;

const HubspotForm = ({ portalId, formId }: { portalId: string; formId: string }) => (
  <HubspotCard>
    <Script src={`https://js.hsforms.net/forms/embed/developer/${portalId}.js`} strategy='afterInteractive' />
    <Title>Schedule a meeting with us</Title>
    <Subtext>Stop by our booth or reserve time with the Odigos team during the event.</Subtext>
    <div className='hs-form-html' data-region='na1' data-form-id={formId} data-portal-id={portalId} />
  </HubspotCard>
);

export const NewEventRegistration = ({
  eventName,
  hubspotFormId,
  hubspotPortalId,
}: {
  eventName: string;
  hubspotFormId?: string;
  hubspotPortalId?: string;
}) => {
  const {
    formData,
    handleFormDataChange,
    honeypot,
    handleHoneypotChange,
    formErrors,
    handleFormErrorChange,
    resetFormErrors,
    submitToContactService,
  } = useContactForm();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (hubspotFormId && hubspotPortalId) {
    return <HubspotForm formId={hubspotFormId} portalId={hubspotPortalId} />;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const errors: typeof formErrors = {};
    if (!formData.firstName.trim()) errors.firstName = 'Enter your first name';
    if (!formData.lastName.trim()) errors.lastName = 'Enter your last name';
    if (!validateEmail(formData.email) || isFreeEmail(formData.email)) {
      errors.email = 'Enter a valid business email';
    }
    if (Object.keys(errors).length) {
      handleFormErrorChange(undefined, undefined, errors);
      return;
    }

    resetFormErrors();
    setApiError('');
    setIsLoading(true);
    const error = await submitToContactService(eventName);
    setIsLoading(false);

    if (error) {
      setApiError(error);
      return;
    }
    setIsDone(true);
  };

  return (
    <Card>
      <Title>{isDone ? 'We’ll see you there.' : 'Schedule a meeting with us'}</Title>
      <Subtext>
        {isDone ? 'Thanks for reaching out. Our team will follow up shortly.' : 'Reserve time with the Odigos team during the event.'}
      </Subtext>
      {!isDone && (
        <Form onSubmit={onSubmit}>
          <Honeypot name='website' tabIndex={-1} autoComplete='off' value={honeypot} onChange={handleHoneypotChange} />
          <TwoColumns>
            <Field>
              First name
              <Input name='firstName' value={formData.firstName} onChange={handleFormDataChange} disabled={isLoading} />
              {formErrors.firstName && <ErrorText>{formErrors.firstName}</ErrorText>}
            </Field>
            <Field>
              Last name
              <Input name='lastName' value={formData.lastName} onChange={handleFormDataChange} disabled={isLoading} />
              {formErrors.lastName && <ErrorText>{formErrors.lastName}</ErrorText>}
            </Field>
          </TwoColumns>
          <Field>
            Business email
            <Input name='email' type='email' value={formData.email} onChange={handleFormDataChange} disabled={isLoading} />
            {formErrors.email && <ErrorText>{formErrors.email}</ErrorText>}
          </Field>
          <Field>
            Phone
            <Input name='phoneNumber' value={formData.phoneNumber} onChange={handleFormDataChange} disabled={isLoading} />
          </Field>
          <Field>
            Organization
            <Input name='company' value={formData.company} onChange={handleFormDataChange} disabled={isLoading} />
          </Field>
          <Submit type='submit' disabled={isLoading}>
            {isLoading ? 'Submitting…' : 'Request a meeting'}
          </Submit>
          {apiError && <ErrorText>{apiError}</ErrorText>}
        </Form>
      )}
    </Card>
  );
};
