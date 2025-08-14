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
    <table className="table table-hover table-condensed">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Description</th>
          <th>Amount</th>
          {!hideSource && <th className="hidden-xs">From</th>}
          {!hideDestination && <th className="hidden-xs">To</th>}
          {!hideBudget && (
            <th className="hidden-xs">
              <span className="fa fa-pie-chart fa-fw" title="Budget"></span>
            </th>
          )}
          {!hideCategory && (
            <th className="hidden-xs">
              <span className="fa fa-bookmark fa-fw" title="Category"></span>
            </th>
          )}
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
            <tr key={t.journal_id}>
              <td className="hidden-xs">
                {t.transaction_type_type === 'Withdrawal' && (
                  <span className="fa fa-long-arrow-left fa-fw" title="Withdrawal"></span>
                )}
                {t.transaction_type_type === 'Deposit' && (
                  <span className="fa fa-long-arrow-right fa-fw" title="Deposit"></span>
                )}
                {t.transaction_type_type === 'Transfer' && (
                  <span className="fa fa-exchange fa-fw" title="Transfer"></span>
                )}
              </td>
              <td>
                <a href={`#${t.transaction_group_id}`}>
                  {t.group_title ? `${t.group_title} (${t.description})` : t.description}
                </a>
              </td>
              <td>{formatAmount(amount, t.currency_symbol, t.currency_decimal_places)}</td>
              {!hideSource && (
                <td className="hidden-xs">
                  {t.source_account_id && (
                    <a href={`#${t.source_account_id}`}>{t.source_account_name}</a>
                  )}
                </td>
              )}
              {!hideDestination && (
                <td className="hidden-xs">
                  {t.destination_account_id && (
                    <a href={`#${t.destination_account_id}`}>{t.destination_account_name}</a>
                  )}
                </td>
              )}
              {!hideBudget && (
                <td className="hidden-xs">
                  {t.budget_id && <a href={`#${t.budget_id}`}>{t.budget_name}</a>}
                </td>
              )}
              {!hideCategory && (
                <td className="hidden-xs">
                  {t.category_id && <a href={`#${t.category_id}`}>{t.category_name}</a>}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2} style={{ textAlign: 'right' }}>
            <em>sum:</em>
          </td>
          <td>
            {sum !== 0 &&
              formatAmount(sum, journals[0]?.currency_symbol || '', journals[0]?.currency_decimal_places || 2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ListJournals;
