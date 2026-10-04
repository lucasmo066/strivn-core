const token = process.env.CALENDLY_PERSONAL_ACCESS_TOKEN;
const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
const callbackUrl = process.env.CALENDLY_WEBHOOK_URL;

if (!token || !signingKey || !callbackUrl) {
  console.error(
    'Set CALENDLY_PERSONAL_ACCESS_TOKEN, CALENDLY_WEBHOOK_SIGNING_KEY, and CALENDLY_WEBHOOK_URL before running this script.',
  );
  process.exitCode = 1;
} else {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const meResponse = await fetch('https://api.calendly.com/users/me', { headers });
  if (!meResponse.ok) {
    console.error(`Calendly user lookup failed (${meResponse.status}).`);
    process.exitCode = 1;
  } else {
    const { resource } = await meResponse.json();
    const response = await fetch('https://api.calendly.com/webhook_subscriptions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        url: callbackUrl,
        events: ['invitee.created', 'invitee.canceled'],
        organization: resource.current_organization,
        user: resource.uri,
        scope: 'user',
        signing_key: signingKey,
      }),
    });

    if (!response.ok) {
      console.error(`Calendly webhook creation failed (${response.status}).`);
      process.exitCode = 1;
    } else {
      const { resource: subscription } = await response.json();
      console.log(`Calendly webhook active: ${subscription.uri}`);
      console.log(`Callback: ${subscription.callback_url}`);
    }
  }
}
