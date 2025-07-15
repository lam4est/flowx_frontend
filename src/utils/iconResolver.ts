export function resolveNodeIcon(type: string): string {
  const iconMap: { [key: string]: string } = {
    'n8n-nodes-base.webhook': '/images/icon_webhook.png',
    'n8n-nodes-base.httpRequest': '/images/icon_httprequest.png',
    'n8n-nodes-base.function': '/images/icon_function.png',
    'n8n-nodes-base.if': '/images/icon_if.png',
    'n8n-nodes-base.merge': '/images/icon_merge.png',
    'n8n-nodes-base.set': '/images/icon_set.png',
    'n8n-nodes-base.wait': '/images/icon_wait.png',
    'n8n-nodes-base.cron': '/images/icon_cron.png',
    'n8n-nodes-base.slack': '/images/icon_slack.png',
    'n8n-nodes-base.gmail': '/images/icon_gmail.png',
    'n8n-nodes-base.trigger': '/images/icon_trigger.png',
  }

  return iconMap[type] || '/images/icon_default.png'
} 