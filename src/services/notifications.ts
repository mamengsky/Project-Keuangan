import { Transaction } from '../types/transaction';
import { DISCORD_CONFIG } from './discord/config';
import { createDiscordEmbed } from './discord/formatters';
import { calculateBalance } from './balance/balanceService';

export const sendDiscordNotification = async (transaction: Omit<Transaction, 'id'>) => {
  try {
    const newBalance = await calculateBalance();
    const embed = createDiscordEmbed(transaction, newBalance);

    const response = await fetch(DISCORD_CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Discord notification');
    }
  } catch (error) {
    console.error('Error sending Discord notification:', error);
    // Don't throw the error to prevent blocking the transaction
  }
};