// Utilitário de rastreamento oficial Meta Pixel e Meta Conversions API (CAPI)

export const PIXEL_ID = "771478598893049";
export const META_API_TOKEN =
  "EAAU5w6HhyrkBQW37EkS6QNiq4H2zRZB3ZCxo2ssnXy7pU4ZCX9fNX0Va9u9sqIn5gFtDl2qEZAPOyE3tPwveDIlOpnSdYRsRZCWBKKYrCMLXTL3m4Nbh3BGC7dbWv6bsqsjhp1nZCzCBFHtAJ3ay4MZA2fuPt5rszXPq01dWNs8fMDZC4ZC7BITxjAMdSbslZAePpJZCQZDZD";

// Função para gerar hash SHA-256 no browser (necessário para CAPI user_data)
async function sha256(message: string): Promise<string> {
  try {
    const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return '';
  }
}

// Normalização de telefone para Moçambique (+258...)
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('258')) return digits;
  if (digits.length === 9) return `258${digits}`;
  return digits;
}

export interface TrackingUserData {
  name?: string;
  phone?: string;
  email?: string;
}

// Dispara evento para o Meta Pixel no navegador
export function trackBrowserPixel(
  eventName: 'InitiateCheckout' | 'Purchase' | 'Lead' | 'Contact',
  data: { value?: number; currency?: string; content_name?: string },
  eventId?: string
) {
  if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
    try {
      const fbq = (window as unknown as { fbq: (...args: unknown[]) => void }).fbq;
      if (eventId) {
        fbq('track', eventName, data, { eventID: eventId });
      } else {
        fbq('track', eventName, data);
      }
    } catch {
      // Ignora silenciosamente
    }
  }
}

// Dispara evento via Meta Conversions API (CAPI)
export async function trackMetaCAPI(
  eventName: 'InitiateCheckout' | 'Purchase' | 'Lead' | 'Contact',
  userData: TrackingUserData,
  data: { value: number; currency: string; content_name: string },
  eventId: string
) {
  try {
    const hashedUserData: Record<string, unknown> = {
      client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };

    if (userData.phone) {
      const cleanPhone = normalizePhone(userData.phone);
      const hashedPhone = await sha256(cleanPhone);
      if (hashedPhone) hashedUserData.ph = [hashedPhone];
    }

    if (userData.name) {
      const firstName = userData.name.trim().split(' ')[0] || '';
      const lastName = userData.name.trim().split(' ').slice(1).join(' ') || '';
      if (firstName) {
        const hfn = await sha256(firstName);
        if (hfn) hashedUserData.fn = [hfn];
      }
      if (lastName) {
        const hln = await sha256(lastName);
        if (hln) hashedUserData.ln = [hln];
      }
    }

    if (userData.email) {
      const hEmail = await sha256(userData.email);
      if (hEmail) hashedUserData.em = [hEmail];
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: typeof window !== 'undefined' ? window.location.href : '',
          action_source: 'website',
          user_data: hashedUserData,
          custom_data: {
            currency: data.currency || 'MZN',
            value: data.value || 350,
            content_name: data.content_name || 'Minicurso Cartão Virtual',
          },
        },
      ],
    };

    // Chamada à API de Conversões do Meta (Graph API v21.0)
    await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(
        META_API_TOKEN
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
  } catch {
    // Falha silenciosa para não travar a experiência do usuário
  }
}

// Disparo unificado (Browser Pixel + CAPI com deduplicação pelo event_id)
export async function trackDualMetaEvent(
  eventName: 'InitiateCheckout' | 'Purchase',
  userData: TrackingUserData = {},
  customData: { value?: number; currency?: string; content_name?: string } = {
    value: 350,
    currency: 'MZN',
    content_name: 'Minicurso Cartão Virtual',
  }
) {
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // 1. Pixel do Navegador (Instantâneo)
  trackBrowserPixel(
    eventName,
    {
      value: customData.value ?? 350,
      currency: customData.currency ?? 'MZN',
      content_name: customData.content_name ?? 'Minicurso Cartão Virtual',
    },
    eventId
  );

  // 2. Meta Conversions API (Garante rastreio mesmo com AdBlock ou iOS)
  trackMetaCAPI(
    eventName,
    userData,
    {
      value: customData.value ?? 350,
      currency: customData.currency ?? 'MZN',
      content_name: customData.content_name ?? 'Minicurso Cartão Virtual',
    },
    eventId
  ).catch(() => {});
}
