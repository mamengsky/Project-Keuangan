import { Transaction } from '../../types/transaction';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { DISCORD_CONFIG } from './config';

export const getTransactionEmoji = (type: Transaction['type'], amount: number): string => {
  if (type === 'deposit') {
    return amount >= 10000000 ? '💰' : '💵';
  }
  return amount >= 10000000 ? '💸' : '💳';
};

export const formatTransactionTitle = (type: Transaction['type']): string => {
  return type === 'deposit' ? '📥 New Deposit' : '📤 New Withdrawal';
};

export const createDiscordEmbed = (
  transaction: Omit<Transaction, 'id'>,
  newBalance: number
) => {
  const emoji = getTransactionEmoji(transaction.type, transaction.amount);
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate.toISOString());

  return {
    title: formatTransactionTitle(transaction.type),
    description: `${emoji} A new transaction has been recorded`,
    color: transaction.type === 'deposit' 
      ? DISCORD_CONFIG.COLORS.DEPOSIT 
      : DISCORD_CONFIG.COLORS.WITHDRAWAL,
    fields: [
      {
        name: '👤 Recorder',
        value: `\`${transaction.recorderName}\``,
        inline: true
      },
      {
        name: '🏷️ Purpose',
        value: `\`${transaction.purpose}\``,
        inline: true
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: true
      },
      {
        name: '💱 Amount',
        value: `**${formatCurrency(transaction.amount)}**`,
        inline: true
      },
      {
        name: '🏦 Current Balance',
        value: `**${formatCurrency(newBalance)}**`,
        inline: true
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: true
      },
      {
        name: '📅 Date & Time',
        value: `\`${formattedDate}\``,
        inline: false
      }
    ],
    footer: {
      text: transaction.notes ? '📝 ' + transaction.notes : 'No additional notes'
    },
    timestamp: currentDate.toISOString(),
    thumbnail: {
      url: transaction.type === 'deposit' 
        ? DISCORD_CONFIG.THUMBNAILS.DEPOSIT 
        : DISCORD_CONFIG.THUMBNAILS.WITHDRAWAL
    }
  };
};