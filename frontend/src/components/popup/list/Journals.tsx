import React from 'react';

export interface Journal {
  journal_id: number;
  transaction_group_id: number;
  transaction_type_type: string;
  description: string;
  group_title?: string;
  amount: number;
  date: string;
  currency_symbol: string;
  currency_decimal_places: number;
  source_account_id?: number;
  source_account_name?: string;
  destination_account_id?: number;
  destination_account_name?: string;
  budget_id?: number;
  budget_name?: string;
  category_id?: number;
  category_name?: string;
}

export interface ListJournalsProps {
  journals: Journal[];
  hideSource?: boolean;
  hideDestination?: boolean;
  hideBudget?: boolean;
  hideCategory?: boolean;
}

const formatAmount = (amount: number, symbol: string, decimals: number) => {
  return `${symbol}${amount.toFixed(decimals)}`;
};

export const ListJournals: React.FC<ListJournalsProps> = ({
  journals,
  hideSource,
  hideDestination,
  hideBudget,
  hideCategory,
}) => {
  let sum = 0;
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b">
          <th className="p-2">&nbsp;</th>
          <th className="p-2 text-left">Description</th>
          <th className="p-2 text-left">Amount</th>
          {!hideSource && <th className="p-2 hidden sm:table-cell">From</th>}
          {!hideDestination && <th className="p-2 hidden sm:table-cell">To</th>}
          {!hideBudget && <th className="p-2 hidden sm:table-cell" title="Budget">Budget</th>}
          {!hideCategory && <th className="p-2 hidden sm:table-cell" title="Category">Category</th>}
        </tr>
      </thead>
      <tbody>
        {journals.map((t) => {
          let amount = t.amount;
          if (t.transaction_type_type === 'Deposit' || t.transaction_type_type === 'Transfer') {
            amount = -amount;
          }
          sum += amount;
          return (
            <tr key={t.journal_id} className="border-b last:border-0">
              <td className="p-2 hidden sm:table-cell">
                {t.transaction_type_type === 'Withdrawal' && <span title="Withdrawal">←</span>}
                {t.transaction_type_type === 'Deposit' && <span title="Deposit">→</span>}
                {t.transaction_type_type === 'Transfer' && <span title="Transfer">⇄</span>}
              </td>
              <td className="p-2">
                <a href={`#${t.transaction_group_id}`} className="text-blue-600 hover:underline">
                  {t.group_title ? `${t.group_title} (${t.description})` : t.description}
                </a>
              </td>
              <td className="p-2">{formatAmount(amount, t.currency_symbol, t.currency_decimal_places)}</td>
              {!hideSource && (
                <td className="p-2 hidden sm:table-cell">
                  {t.source_account_id && (
                    <a href={`#${t.source_account_id}`} className="text-blue-600 hover:underline">{t.source_account_name}</a>
                  )}
                </td>
              )}
              {!hideDestination && (
                <td className="p-2 hidden sm:table-cell">
                  {t.destination_account_id && (
                    <a href={`#${t.destination_account_id}`} className="text-blue-600 hover:underline">{t.destination_account_name}</a>
                  )}
                </td>
              )}
              {!hideBudget && (
                <td className="p-2 hidden sm:table-cell">
                  {t.budget_id && <a href={`#${t.budget_id}`} className="text-blue-600 hover:underline">{t.budget_name}</a>}
                </td>
              )}
              {!hideCategory && (
                <td className="p-2 hidden sm:table-cell">
                  {t.category_id && <a href={`#${t.category_id}`} className="text-blue-600 hover:underline">{t.category_name}</a>}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2} className="p-2 text-right">
            <em>sum:</em>
          </td>
          <td className="p-2">
            {sum !== 0 &&
              formatAmount(sum, journals[0]?.currency_symbol || '', journals[0]?.currency_decimal_places || 2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ListJournals;
