import Layout from '../../../components/Layout';

export default function GeneralSettings() {
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' },
    ];

    const locales = [
        { code: 'en_US', name: 'English (US)' },
        { code: 'de_DE', name: 'Deutsch (DE)' },
    ];

    return (
        <Layout title="General settings">
            <h1 className="text-2xl mb-4">General settings</h1>
            <form className="space-y-6">
                <div>
                    <label htmlFor="language" className="block mb-1 font-medium">
                        Language
                    </label>
                    <select id="language" name="language" className="p-2 border rounded w-full">
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="locale" className="block mb-1 font-medium">
                        Locale
                    </label>
                    <select id="locale" name="locale" className="p-2 border rounded w-full">
                        {locales.map((loc) => (
                            <option key={loc.code} value={loc.code}>
                                {loc.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </Layout>
    );
}

