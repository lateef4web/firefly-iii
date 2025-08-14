import React from "react";

interface Props {
  target: number;
  current: number;
}

export default function PiggyBankGoal({ target, current }: Props) {
  const percent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  return (
    <div className="w-full">
      <div className="bg-gray-300 rounded">
        <div
          className="bg-green-500 text-white text-xs rounded px-2 py-1"
          style={{ width: `${percent}%` }}
        >
          {percent}%
        </div>
      </div>
    </div>
  );
}
