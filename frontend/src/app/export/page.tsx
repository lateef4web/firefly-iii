'use client';

import LayoutDefault from '../../components/LayoutDefault';

export default function ExportPage() {
    const handleExport = async () => {
        const now = new Date();
        const start = new Date();
        start.setFullYear(now.getFullYear() - 1);
        const params = new URLSearchParams({
            start: start.toISOString().slice(0, 10),
            end: now.toISOString().slice(0, 10),
        });
        const response = await fetch(`/api/v1/data/export/transactions?${params.toString()}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            console.error('Export failed');
            return;
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    };

    return (
        <LayoutDefault title="Export data from Firefly III">
            <div className="p-4">
                <h1 className="text-2xl mb-4">Export data from Firefly III</h1>
                <p className="mb-4">
                    This link allows you to export all transactions + meta data from Firefly III. Please refer to the help
                    (top right (?)-icon) for more information about the process.
                </p>
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={handleExport}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Export all transactions
                    </button>
                </div>
                <p>
                    If you need a more advanced or specific type of export, read the help on how to use the console command
                    <code>php artisan help firefly-iii:export-data</code>.
                </p>
            </div>
        </LayoutDefault>
    );
}

